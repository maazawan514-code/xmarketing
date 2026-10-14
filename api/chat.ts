import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

const KNOWLEDGE_BASE = readFileSync(
  resolve(process.cwd(), 'data/knowledge/projects.md'),
  'utf8'
);
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_REQUEST_BYTES = 12_000;
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 500;
const MAX_OUTPUT_TOKENS = 400;
const RATE_LIMIT_REQUESTS = 15;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimits = new Map<string, { startedAt: number; count: number }>();

// Gemini fallback models (use the exact model IDs from AI Studio "Get code").
const GEMINI_DEFAULT_MODEL = 'gemini-3.8-flash';
const GEMINI_FALLBACK_MODELS = ['gemini-3.6-flash', 'gemini-3.1-flash-lite'];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = IncomingMessage & { body?: unknown };

type ChatResponse = {
  text: string;
  whatsappUrl: string;
  redirectToWhatsApp: boolean;
};

const GENERAL_PROJECT_INFORMATION = KNOWLEDGE_BASE
  .split(/^## (?:INDIGO WALK|MADINA MALL & RESIDENCY)\s*$/im)[0]
  .trim();

const getProjectKnowledgeBlock = (projectName: 'INDIGO WALK' | 'MADINA MALL & RESIDENCY') => {
  const heading = `## ${projectName}`;
  const start = KNOWLEDGE_BASE.indexOf(heading);
  if (start < 0) throw new Error(`Project knowledge block is missing: ${projectName}`);
  const contentStart = start + heading.length;
  const nextHeading = KNOWLEDGE_BASE.indexOf('\n## ', contentStart);
  return KNOWLEDGE_BASE.slice(contentStart, nextHeading < 0 ? undefined : nextHeading).trim();
};

const INDIGO_WALK_KNOWLEDGE = getProjectKnowledgeBlock('INDIGO WALK');
const MADINA_MALL_KNOWLEDGE = getProjectKnowledgeBlock('MADINA MALL & RESIDENCY');

const SYSTEM_PROMPT = `You are "X AI Assistant" for X Marketing, a real estate marketing company in Lahore, Pakistan.

RULES:

1. Answer project questions using ONLY the project information supplied below. Never invent missing details.
2. Give full helpful details for project overviews, including location, type, developer, size range, price range, key features, and payment-plan summary when supplied.
3. For a specific shop/apartment, provide the table's size, rate per sq ft, total price, booking, confirmation (or On Ground Breaking), monthly installment, half-yearly payment, and possession amount. Preserve full payment advance-only terms where listed.
4. If the user asks about a Madina Mall shop number without specifying its floor (for example, "9A" or "shop 5"), ask which floor they mean (ground, first, or second) before giving any price. Never guess the floor.
5. Prices are in PKR. Convert large values to readable lakh/crore amounts without changing the values.
6. Always state that prices and plans are subject to change.
7. For booking, negotiation, site visits, or requested facts not in the supplied information, direct the user to the team on WhatsApp. Do not say WhatsApp is needed just to answer prices or installment questions present in the tables.
8. Reply in the same language as the user (English or Roman Urdu). Keep answers clear and concise.

ALWAYS-INCLUDED PROJECT SUMMARIES AND GENERAL RULES:
${GENERAL_PROJECT_INFORMATION}

Company WhatsApp: {{WHATSAPP_URL}}`;

const JSON_HEADERS = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

const sendJson = (response: ServerResponse, statusCode: number, body: unknown) => {
  response.writeHead(statusCode, JSON_HEADERS);
  response.end(JSON.stringify(body));
};

const getWhatsAppNumber = () => {
  const number = process.env.WHATSAPP_NUMBER?.trim() || '923219959990';
  if (!/^\d+$/.test(number)) {
    throw new Error('Invalid WhatsApp configuration');
  }
  return number;
};

const buildWhatsAppUrl = (message = '') => {
  const baseUrl = `https://wa.me/${getWhatsAppNumber()}`;
  return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
};

const getLeadBudgetBand = (message: string) => {
  const answer = message
    .toLocaleLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
  if (/^(?:under|below|less than)\s+15\s+lakh(?:s)?$/.test(answer) || /^15\s*lakh(?:s)?\s+se\s+kam$/.test(answer)) {
    return 'under 15 lakh';
  }
  if (/^15\s*(?:-|to|se)\s*30\s*lakh(?:s)?$/.test(answer)) return '15-30 lakh';
  if (/^30\s*lakh(?:s)?\s*(?:-|to|se)\s*1\s*crore$/.test(answer)) return '30 lakh-1 crore';
  if (/^(?:above|over|more than)\s+1\s*crore$/.test(answer) || /^1\s*crore\s+se\s+(?:zyada|upar)$/.test(answer)) {
    return 'above 1 crore';
  }
  return '';
};

const isLeadSummary = (text: string) => /\bLEAD SUMMARY:/i.test(text);

const getAnswerToQuestion = (messages: ChatMessage[], question: RegExp) => {
  for (let index = messages.length - 2; index >= 0; index -= 1) {
    if (messages[index].role === 'assistant' && question.test(messages[index].content) && messages[index + 1].role === 'user') {
      return messages[index + 1].content.trim();
    }
  }
  return '';
};

const cleanLeadField = (value: string, maxLength: number) =>
  value.replace(/[\r\n|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);

const getLeadInterest = (messages: ChatMessage[]) => {
  const answer = getAnswerToQuestion(messages, /interest|which (?:unit|type)|what (?:unit|type)/i);
  const customerMessages = messages.filter((message) => message.role === 'user').map((message) => message.content);
  const searchText = [answer, ...customerMessages].join(' ').toLocaleLowerCase();
  if (/\bfood court\b/.test(searchText)) return 'food court';
  if (/\b(apartment|studio|[1-3][ -]?(?:bed|bedroom))\b/.test(searchText)) return 'apartment';
  if (/\b(shop|retail)\b/.test(searchText)) return 'shop';
  if (/\bindigo walk\b/.test(searchText)) return 'Indigo Walk commercial unit';
  return '';
};

const getCompletedLeadSummary = (messages: ChatMessage[]) => {
  const name = cleanLeadField(getAnswerToQuestion(messages, /\bname\b|نام/i), 100);
  const city = cleanLeadField(getAnswerToQuestion(messages, /\b(city|country|where are you based)\b|شہر|ملک/i), 100);
  const interest = getLeadInterest(messages);
  const budgetAnswer = getAnswerToQuestion(messages, /\bupfront budget\b|\bbudget\b|بجٹ/i);
  const budget = getLeadBudgetBand(budgetAnswer);
  const role = cleanLeadField(getAnswerToQuestion(messages, /\binvestor\b|\bend user\b|\bproperty dealer\b|سرمایہ کار|صارف|ڈیلر/i), 80);
  const timeline = cleanLeadField(getAnswerToQuestion(messages, /\bwhen do you plan\b|\binvestment timeline\b|\btimeline\b|کب سرمایہ کاری/i), 80);
  const phone = getAnswerToQuestion(messages, /\b(phone|whatsapp number|number.*follow up)\b|فون|واٹس ایپ نمبر/i);
  const normalizedPhone = phone.replace(/[^\d+]/g, '').slice(0, 25);

  if (!name || !city || !interest || !budget || !role || !timeline || normalizedPhone.replace(/\D/g, '').length < 7) {
    return '';
  }

  return `LEAD SUMMARY: Name: ${name} | City/Country: ${city} | Interest: ${interest} | Upfront budget: ${budget} | Role: ${role} | Timeline: ${timeline} | Phone: ${normalizedPhone}`;
};

const findProjectName = (messages: ChatMessage[]) => {
  const conversation = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content)
    .join(' ')
    .toLocaleLowerCase();
  if (/\bmadina(?:\s+mall(?:\s*(?:&|and)\s*residency)?)?\b/i.test(conversation)) {
    return 'Madina Mall & Residency';
  }
  if (/\bindigo(?:\s+walk)?\b/i.test(conversation)) return 'Indigo Walk';
  return undefined;
};

const isBookingVisitOrNegotiationIntent = (message: string) =>
  /\b(?:book(?:\s+(?:it|this|the|a)\b)?|reserve|reservation|negotiate|negotiation|site visit|visit (?:the )?(?:site|project))\b/i.test(message)
  || /\b(?:booking|book|reserve|visit|negotiate)\s+(?:karna|karni|chah(?:ta|ti))\b/i.test(message);

const createSystemPrompt = (messages: ChatMessage[]) => {
  const history = messages
    .filter((message) => message.role === 'user')
    .map((message) => message.content)
    .join('\n')
    .toLocaleLowerCase();
  const projectDetails = [
    /\bindigo(?:\s+walk)?\b/i.test(history) ? `## INDIGO WALK\n${INDIGO_WALK_KNOWLEDGE}` : '',
    /\bmadina(?:\s+mall(?:\s*(?:&|and)\s*residency)?)?\b/i.test(history)
      ? `## MADINA MALL & RESIDENCY\n${MADINA_MALL_KNOWLEDGE}`
      : '',
  ].filter(Boolean).join('\n\n');
  return SYSTEM_PROMPT
    .replace('{{WHATSAPP_URL}}', buildWhatsAppUrl())
    + (projectDetails ? `\n\nREQUESTED PROJECT DETAILS:\n${projectDetails}` : '');
};

const parseRequestBody = async (request: ChatRequest): Promise<unknown> => {
  if (request.body !== undefined) {
    if (typeof request.body === 'string') return JSON.parse(request.body);
    return request.body;
  }

  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_REQUEST_BYTES) throw new Error('Request too large');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const validateMessages = (value: unknown): ChatMessage[] | null => {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (
      !isRecord(item)
      || (item.role !== 'user' && item.role !== 'assistant')
      || typeof item.content !== 'string'
      || item.content.trim().length === 0
      || item.content.length > MAX_MESSAGE_LENGTH
    ) {
      return null;
    }
    messages.push({ role: item.role, content: item.content.trim() });
  }
  return messages;
};

const getClientIp = (request: IncomingMessage) => {
  const forwardedFor = request.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',').map((ip) => ip.trim()).filter(Boolean).at(-1) || 'unknown';
  }
  if (Array.isArray(forwardedFor)) {
    return forwardedFor.join(',').split(',').map((ip) => ip.trim()).filter(Boolean).at(-1) || 'unknown';
  }
  return request.socket.remoteAddress || 'unknown';
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  for (const [key, entry] of rateLimits) {
    if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) rateLimits.delete(key);
  }

  const entry = rateLimits.get(ip);
  if (!entry || now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimits.set(ip, { startedAt: now, count: 1 });
    return false;
  }
  if (entry.count >= RATE_LIMIT_REQUESTS) return true;
  entry.count += 1;
  return false;
};

const extractAnthropicText = (data: unknown) => {
  if (!isRecord(data) || !Array.isArray(data.content)) return '';
  return data.content
    .filter((block): block is Record<string, unknown> => isRecord(block) && block.type === 'text' && typeof block.text === 'string')
    .map((block) => block.text as string)
    .join('\n')
    .trim();
};

const extractOpenAIText = (data: unknown) => {
  if (!isRecord(data) || !Array.isArray(data.choices)) return '';
  const choice = data.choices[0];
  if (!isRecord(choice) || !isRecord(choice.message) || typeof choice.message.content !== 'string') return '';
  return choice.message.content.trim();
};

const extractGeminiText = (data: unknown) => {
  if (isRecord(data) && Array.isArray(data.steps)) {
    return data.steps
      .filter((step): step is Record<string, unknown> => isRecord(step) && step.type === 'model_output' && Array.isArray(step.content))
      .flatMap((step) => step.content as unknown[])
      .filter((part): part is Record<string, unknown> => isRecord(part) && typeof part.text === 'string')
      .map((part) => String(part.text))
      .join('\n')
      .trim();
  }
  if (!isRecord(data) || !Array.isArray(data.candidates)) return '';
  const candidate = data.candidates[0];
  if (!isRecord(candidate)) return '';
  const content = candidate.content as Record<string, unknown> | undefined;
  const parts = Array.isArray(content?.parts) ? content.parts : [];
  return parts
    .filter((part: unknown): part is Record<string, unknown> => isRecord(part) && typeof part.text === 'string')
    .map((part) => String(part.text))
    .join('\n')
    .trim();
};

const getLlmConfig = () => {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const llmKey = process.env.LLM_API_KEY?.trim();
  const provider = (
    process.env.LLM_PROVIDER?.trim() || (geminiKey ? 'google' : 'anthropic')
  ).toLocaleLowerCase();
  const apiKey = llmKey || geminiKey;
  const isGoogle = provider === 'google' || provider === 'gemini';
  const model = process.env.LLM_MODEL?.trim()
    || (isGoogle ? GEMINI_DEFAULT_MODEL : 'claude-sonnet-4-20250514');
  return { provider, apiKey, model };
};

const isRetryableGeminiFailure = (failure: unknown) =>
  failure instanceof Error
  && (failure.name === 'AbortError'
    || /status (404|429|500|502|503|504)\b/.test(failure.message)
    || failure.message.includes('Gemini interaction did not complete'));

const getGeminiFailureStatus = (failure: unknown) => {
  if (!(failure instanceof Error)) return undefined;
  const status = failure.message.match(/\bstatus (\d{3})\b/);
  return status ? Number(status[1]) : undefined;
};

const callLanguageModel = async (messages: ChatMessage[]) => {
  const { provider, apiKey, model } = getLlmConfig();
  if (!apiKey) throw new Error('Language model is not configured (missing LLM_API_KEY)');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const system = createSystemPrompt(messages);
    const isAnthropic = provider === 'anthropic';
    const isGoogle = provider === 'google' || provider === 'gemini';
    const isOpenAI = provider === 'openai';
    if (!isAnthropic && !isOpenAI && !isGoogle) throw new Error('Unsupported language model provider');

    let response: Response | undefined;

    const requestGemini = async (geminiModel: string, timeoutMs: number) => {
      const geminiController = new AbortController();
      const geminiTimeout = setTimeout(() => geminiController.abort(), timeoutMs);
      try {
        const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            model: geminiModel,
            system_instruction: system,
            input: messages
              .map((message) => `${message.role === 'assistant' ? 'Assistant' : 'User'}: ${message.content}`)
              .join('\n\n'),
            generation_config: {
              max_output_tokens: 2048,
              thinking_level: 'low',
            },
          }),
          signal: geminiController.signal,
        });
        if (!geminiResponse.ok) {
          const details = await geminiResponse.text();
          if (geminiResponse.status === 429) {
            let errorBody: unknown = details;
            try {
              errorBody = JSON.parse(details);
            } catch {
              errorBody = details;
            }
            const nestedError = isRecord(errorBody) && isRecord(errorBody.error)
              ? errorBody.error
              : errorBody;
            console.error('Gemini API rate-limit error:', JSON.stringify(nestedError));
          }
          throw new Error(`Gemini model request failed with status ${geminiResponse.status} (model: ${geminiModel}): ${details.slice(0, 500)}`);
        }
        const interaction: unknown = await geminiResponse.clone().json();
        if (isRecord(interaction) && isRecord(interaction.usage)
          && typeof interaction.usage.total_input_tokens === 'number') {
          console.info(`Gemini request usage (model: ${geminiModel}): total_input_tokens=${interaction.usage.total_input_tokens}`);
        }
        if (isRecord(interaction) && interaction.status === 'incomplete' && extractGeminiText(interaction)) {
          return geminiResponse;
        }
        if (isRecord(interaction) && interaction.status !== 'completed') {
          throw new Error(`Gemini interaction did not complete for model ${geminiModel} (status: ${String(interaction.status)})`);
        }
        return geminiResponse;
      } finally {
        clearTimeout(geminiTimeout);
      }
    };

    if (isAnthropic) {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          model,
          max_tokens: MAX_OUTPUT_TOKENS,
          system,
          messages,
        }),
        signal: controller.signal,
      });
    } else if (isOpenAI) {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: MAX_OUTPUT_TOKENS,
          messages: [{ role: 'system', content: system }, ...messages],
        }),
        signal: controller.signal,
      });
    } else {
      const geminiModel = model.replace(/^models\//, '');
      const geminiModels = [geminiModel, ...GEMINI_FALLBACK_MODELS.filter((fallbackModel) => fallbackModel !== geminiModel)];
      let lastError: unknown;
      for (const [modelIndex, geminiModelToTry] of geminiModels.entries()) {
        for (let attempt = 0; attempt < 2; attempt += 1) {
          try {
            response = await requestGemini(geminiModelToTry, modelIndex === 0 ? 10_000 : 12_000);
            break;
          } catch (error) {
            lastError = error;
            console.error(error instanceof Error ? error.message : String(error));
            const status = getGeminiFailureStatus(error);
            if (!isRetryableGeminiFailure(error)) throw error;
            if (status === 503 && attempt === 0) {
              await new Promise((resolveDelay) => setTimeout(resolveDelay, 1_500));
              continue;
            }
            break;
          }
        }
        if (response) break;
        if (modelIndex + 1 < geminiModels.length) {
          console.warn(`Gemini model unavailable; retrying with ${geminiModels[modelIndex + 1]}.`);
        }
      }
      if (!response && lastError) throw lastError;
    }

    if (!response) throw new Error('Language model did not return a response');
    if (!response.ok) {
      const details = (await response.text()).slice(0, 500);
      throw new Error(`Language model request failed with status ${response.status}: ${details}`);
    }
    const data: unknown = await response.json();
    const answer = isAnthropic ? extractAnthropicText(data) : isOpenAI ? extractOpenAIText(data) : extractGeminiText(data);
    if (!answer) throw new Error('Language model returned no answer');
    return answer;
  } finally {
    clearTimeout(timeout);
  }
};

const errorResponse = (): ChatResponse => ({
  text: 'The assistant is temporarily unavailable. Please contact our team directly on WhatsApp.',
  whatsappUrl: buildWhatsAppUrl('Hi, I would like help with an X Marketing project.'),
  redirectToWhatsApp: true,
});

export default async function handler(request: ChatRequest, response: ServerResponse) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');

  try {
    if (request.method === 'GET') {
      sendJson(response, 200, { whatsappUrl: buildWhatsAppUrl() });
      return;
    }
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'GET, POST');
      sendJson(response, 405, { error: 'Method not allowed.' });
      return;
    }

    const contentLength = Number(request.headers['content-length'] || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      sendJson(response, 413, { error: 'Request is too large.' });
      return;
    }
    const contentType = request.headers['content-type'] || '';
    if (!contentType.toLocaleLowerCase().startsWith('application/json')) {
      sendJson(response, 415, { error: 'Unsupported request format.' });
      return;
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      sendJson(response, 429, errorResponse());
      return;
    }

    const body = await parseRequestBody(request);
    if (!isRecord(body)) {
      sendJson(response, 400, { error: 'Invalid request.' });
      return;
    }
    const messages = validateMessages(body.messages);
    if (!messages || messages[messages.length - 1].role !== 'user') {
      sendJson(response, 400, { error: 'Please send a valid message.' });
      return;
    }
    const latestMessage = messages[messages.length - 1].content;

    if (isBookingVisitOrNegotiationIntent(latestMessage)) {
      const projectName = findProjectName(messages);
      const projectSuffix = projectName ? ` for ${projectName}` : '';
      const isRomanUrdu = /\b(?:mera|meri|main|mein|mujhe|chahiye|kya|hai|hain|aap|karna|se)\b/i.test(latestMessage);
      const redirectText = isRomanUrdu
        ? `Booking, site visit, ya negotiation${projectSuffix} ke liye hamari team se WhatsApp par rabta karein.`
        : `For booking, a site visit, or negotiation${projectSuffix}, please contact our team on WhatsApp.`;
      sendJson(response, 200, {
        text: redirectText,
        whatsappUrl: buildWhatsAppUrl(`Hi, I would like to discuss booking, a site visit, or negotiation${projectSuffix}.`),
        redirectToWhatsApp: true,
      } satisfies ChatResponse);
      return;
    }

    const leadSummary = getCompletedLeadSummary(messages);
    if (leadSummary) {
      const customerMessages = messages.filter((message) => message.role === 'user').map((message) => message.content).join(' ');
      const thankYou = /[\u0600-\u06ff]/.test(customerMessages)
        ? 'شکریہ۔ اس خلاصے کو سیلز ٹیم کے ساتھ شیئر کرنے کے لیے واٹس ایپ بٹن دبائیں۔'
        : /\b(mera|meri|main|mein|mujhe|chahiye|kya|hai|hain|aap|karna|se)\b/i.test(customerMessages)
          ? 'Shukriya. Sales team ke saath yeh summary share karne ke liye WhatsApp button dabayein.'
          : 'Thank you. Please use the WhatsApp button to share this summary with the sales team.';
      sendJson(response, 200, {
        text: `${thankYou}\n\n${leadSummary}`,
        whatsappUrl: buildWhatsAppUrl(leadSummary),
        redirectToWhatsApp: true,
      } satisfies ChatResponse);
      return;
    }

    try {
      const answer = await callLanguageModel(messages);
      sendJson(response, 200, {
        text: answer,
        whatsappUrl: isLeadSummary(answer) ? buildWhatsAppUrl(answer) : buildWhatsAppUrl(),
        redirectToWhatsApp: isLeadSummary(answer),
      } satisfies ChatResponse);
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      sendJson(response, 503, errorResponse());
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    sendJson(response, 400, { error: 'Unable to process this request.' });
  }
}