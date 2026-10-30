import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { XLogo } from './XLogo';

const CHAT_ENDPOINT = '/api/chat';
const MAX_MESSAGE_LENGTH = 500;
const MAX_ASSISTANT_MESSAGE_LENGTH = 2500;
const MAX_CONTEXT_MESSAGES = 24;
const REQUEST_TIMEOUT_MS = 35_000;
const MAX_VISIBLE_MESSAGES = 40;
const QUICK_REPLIES = ['Indigo Walk', 'Madina Mall & Residency', 'Locations', 'Talk on WhatsApp'];
const GREETING = 'Assalam o Alaikum! I am X AI Assistant. Ask me anything about our projects, locations, units and developers.';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  whatsappUrl?: string;
}

interface ChatResponse {
  text?: string;
  whatsappUrl?: string;
  redirectToWhatsApp?: boolean;
}

const renderInlineFormatting = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)]+[^\s).,!?])|(?<![*\w])\*([^*\n]+)\*(?![*\w])/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  const pushLink = (label: string, href: string, key: string) => {
    try {
      const url = new URL(href);
      if (url.protocol === 'https:' || url.protocol === 'http:') {
        parts.push(
          <a
            key={key}
            href={url.href}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-[#FF2A2A] underline underline-offset-2"
          >
            {label}
          </a>
        );
        return;
      }
    } catch {
      // Fall through to plain text for malformed URLs.
    }
    parts.push(label);
  };

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    if (match[1]) {
      parts.push(<strong key={`bold-${match.index}`} className="font-semibold text-white">{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      pushLink(match[2], match[3], `link-${match.index}`);
    } else if (match[4]) {
      pushLink(match[4], match[4], `url-${match.index}`);
    } else if (match[5]) {
      parts.push(<em key={`em-${match.index}`} className="text-neutral-400">{match[5]}</em>);
    }
    cursor = pattern.lastIndex;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
};

const renderMessage = (text: string) => {
  const lines = text.split(/\r?\n/);
  const rendered: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    rendered.push(
      <ul key={`list-${rendered.length}`} className="my-2 list-disc space-y-1 pl-5">
        {bullets.map((item, index) => (
          <li key={`${index}-${item}`}>{renderInlineFormatting(item)}</li>
        ))}
      </ul>
    );
    bullets = [];
  };

  lines.forEach((line, index) => {
    const bullet = line.match(/^\s*(?:[-•*]|\d+[.)])\s+(.+)$/);
    if (bullet) {
      bullets.push(bullet[1]);
      return;
    }
    flushBullets();
    const heading = line.match(/^\s*#{1,6}\s+(.+)$/);
    if (heading) {
      rendered.push(
        <p key={`heading-${index}`} className="pt-1 font-semibold text-white">
          {renderInlineFormatting(heading[1].replace(/^\*\*(.+)\*\*$/, '$1'))}
        </p>
      );
    } else if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      rendered.push(<hr key={`rule-${index}`} className="my-2 border-white/10" />);
    } else if (line.trim()) {
      rendered.push(
        <p key={`line-${index}`} className="min-h-[1em]">
          {renderInlineFormatting(line)}
        </p>
      );
    } else {
      rendered.push(<div key={`space-${index}`} className="h-2" aria-hidden="true" />);
    }
  });
  flushBullets();
  return rendered;
};

export const XAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    fetch(CHAT_ENDPOINT)
      .then(async (response) => {
        if (!response.ok) throw new Error('Unable to load chat contact');
        return response.json() as Promise<{ whatsappUrl?: string }>;
      })
      .then((data) => {
        if (isMounted && typeof data.whatsappUrl === 'string') setWhatsappUrl(data.whatsappUrl);
      })
      .catch(() => {
        if (isMounted) setWhatsappUrl('');
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const closeChat = () => {
    setIsOpen(false);
    launcherRef.current?.focus();
  };

  const sendMessage = async (messageText: string) => {
    const content = messageText.trim();
    if (!content || isLoading || content.length > MAX_MESSAGE_LENGTH) return;

    const nextMessages = [...messages, { role: 'user' as const, content }].slice(-MAX_VISIBLE_MESSAGES);
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(-MAX_CONTEXT_MESSAGES).map(({ role, content: text }) => ({
            role,
            // Keep the end of long assistant replies: follow-up questions are asked last.
            content: role === 'assistant'
              ? text.slice(-MAX_ASSISTANT_MESSAGE_LENGTH)
              : text.slice(0, MAX_MESSAGE_LENGTH),
          })),
        }),
        signal: controller.signal,
      });
      const data: ChatResponse = await response.json();
      if (typeof data.whatsappUrl === 'string') setWhatsappUrl(data.whatsappUrl);
      if (!response.ok && !data.text) throw new Error('Chat request failed');
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.text || 'The assistant is temporarily unavailable. Please contact our team on WhatsApp.',
        ...(data.redirectToWhatsApp && data.whatsappUrl ? { whatsappUrl: data.whatsappUrl } : {}),
      };
      setMessages((current) => [...current, assistantMessage].slice(-MAX_VISIBLE_MESSAGES));
    } catch {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'The assistant is temporarily unavailable. Please contact our team on WhatsApp.',
        ...(whatsappUrl ? { whatsappUrl } : {}),
      };
      setMessages((current) => [...current, assistantMessage].slice(-MAX_VISIBLE_MESSAGES));
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open X AI Assistant chat"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-[4.25rem] z-50 inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-[#FF2A2A]/60 bg-[#111111] px-0 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(225,6,0,0.28)] transition-all hover:scale-105 hover:bg-[#E10600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2A2A] md:bottom-6 md:right-24 md:h-14 md:w-auto md:justify-start md:px-4"
      >
        <MessageCircle className="h-5 w-5 text-[#FF2A2A]" aria-hidden="true" />
        <span className="hidden md:inline">X AI Assistant</span>
      </button>

      {isOpen && (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="x-ai-assistant-title"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden border-t-2 border-[#E10600] bg-[#090909] pb-[env(safe-area-inset-bottom)] shadow-2xl md:inset-auto md:bottom-24 md:right-6 md:h-[min(600px,calc(100dvh-8rem))] md:w-[400px] md:rounded-2xl md:border md:border-white/10 md:border-t-2"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#111111] p-4">
            <div className="flex min-w-0 items-center gap-3">
              <XLogo className="h-10 w-10" glow={false} withCircle />
              <div className="min-w-0">
                <h2 id="x-ai-assistant-title" className="truncate font-heading text-sm font-bold text-white">
                  X AI Assistant
                </h2>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                  Online
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-[#25D366]/40 px-2.5 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[#25D366]/10"
                >
                  Chat on WhatsApp
                </a>
              )}
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close X AI Assistant"
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div
            ref={conversationRef}
            aria-live="polite"
            className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 text-sm leading-relaxed text-neutral-200"
          >
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-3 ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-[#E10600] text-white'
                      : 'rounded-bl-md border border-white/10 bg-[#151515] text-neutral-200'
                  }`}
                >
                  <div className="space-y-1">{renderMessage(message.content)}</div>
                  {message.whatsappUrl && (
                    <a
                      href={message.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex rounded-lg bg-[#25D366] px-3 py-2 text-xs font-bold text-black transition-colors hover:bg-[#42e879]"
                    >
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((reply) => (
                  reply === 'Talk on WhatsApp' && whatsappUrl ? (
                    <a
                      key={reply}
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#25D366]/40 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:border-[#25D366] hover:text-white"
                    >
                      {reply}
                    </a>
                  ) : reply !== 'Talk on WhatsApp' ? (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => void sendMessage(
                        reply === 'Locations' ? 'Where are the projects located?' : `Tell me about ${reply}.`
                      )}
                      disabled={isLoading}
                      className="rounded-full border border-[#E10600]/40 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:border-[#FF2A2A] hover:text-white disabled:opacity-50"
                    >
                      {reply}
                    </button>
                  ) : null
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex items-center gap-1.5 px-2 py-2 text-xs text-neutral-400" role="status">
                <span>Typing</span>
                <span className="animate-pulse">...</span>
              </div>
            )}
          </div>

          <form
            className="flex shrink-0 items-end gap-2 border-t border-white/10 bg-[#111111] p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
          >
            <label className="sr-only" htmlFor="x-ai-assistant-input">Message X AI Assistant</label>
            <textarea
              ref={inputRef}
              id="x-ai-assistant-input"
              value={input}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={1}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder="Ask about our projects..."
              className="max-h-28 min-h-11 flex-1 resize-y rounded-xl border border-white/10 bg-black px-3 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#E10600] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E10600] text-white transition-colors hover:bg-[#FF2A2A] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </>
  );
};
