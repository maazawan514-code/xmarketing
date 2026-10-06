import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const LIVE_VIDEO_URL = '/videos/live-video.mp4';
const LIVE_VIDEO_TITLE = 'X Marketing live video';

type VideoSource =
  | { kind: 'youtube' | 'facebook'; src: string }
  | { kind: 'mp4'; src: string }
  | null;

const getVideoSource = (value: string): VideoSource => {
  if (!value.trim()) return null;

  const url = new URL(value, 'https://xmarketing.local');
  const host = url.hostname.replace(/^www\./, '').toLowerCase();

  if (host === 'youtu.be' || host === 'youtube.com' || host === 'm.youtube.com') {
    const videoId = host === 'youtu.be'
      ? url.pathname.split('/').filter(Boolean)[0]
      : url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|live|shorts)\/([^/?]+)/)?.[1];

    return videoId
      ? { kind: 'youtube', src: `https://www.youtube-nocookie.com/embed/${videoId}` }
      : null;
  }

  if (host === 'facebook.com' || host === 'm.facebook.com' || host === 'fb.watch') {
    return {
      kind: 'facebook',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url.href)}&show_text=false`,
    };
  }

  if (/\.mp4$/i.test(url.pathname)) {
    return { kind: 'mp4', src: value };
  }

  return null;
};

export const LiveVideo: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const videoSource = getVideoSource(LIVE_VIDEO_URL);

  useEffect(() => {
    if (!LIVE_VIDEO_URL.trim()) return;
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  if (!LIVE_VIDEO_URL.trim()) return null;

  return (
    <section ref={sectionRef} className="border-t border-white/10 bg-[#050505] px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#FF2A2A]">
              X Marketing
            </p>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Watch Live
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Watch project updates and insights from our team.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/40 bg-[#E10600]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2A2A]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF2A2A]" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_32px_rgba(225,6,0,0.15)]">
          {!videoSource ? (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              Video URL is not supported.
            </div>
          ) : isVisible && videoSource.kind === 'mp4' && videoUnavailable ? (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400" role="status">
              Video unavailable.
            </div>
          ) : isVisible && videoSource.kind === 'mp4' ? (
            <video
              ref={videoRef}
              src={videoSource.src}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              aria-label={LIVE_VIDEO_TITLE}
              onError={() => setVideoUnavailable(true)}
              className="h-full w-full object-contain"
            />
          ) : isVisible ? (
            <iframe
              src={videoSource.src}
              title={LIVE_VIDEO_TITLE}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              Video will load when you scroll here.
            </div>
          )}
          {isVisible && videoSource?.kind === 'mp4' && !videoUnavailable && (
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isMuted;
                if (videoRef.current) videoRef.current.muted = nextMuted;
                setIsMuted(nextMuted);
              }}
              aria-label={isMuted ? 'Enable video sound' : 'Mute video sound'}
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur transition-colors hover:border-[#FF2A2A] hover:bg-[#E10600]"
            >
              {isMuted ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
              {isMuted ? 'Enable sound' : 'Mute'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
