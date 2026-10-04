import React, { useCallback, useEffect, useRef, useState } from 'react';

type LightboxImage = {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
};

type ZoomState = {
  scale: number;
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-6 w-6">
    <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-6 w-6">
    <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-6 w-6">
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ZoomIcon = ({ zoomed }: { zoomed: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-5 w-5">
    {zoomed ? (
      <path d="M11 4.75a6.25 6.25 0 015.01 10.68L19.25 19l-1.06 1.06-3.24-3.24A6.25 6.25 0 1111 4.75zm0 2.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm-1.25 2.5h2.5v2.5h-2.5z" fill="currentColor" />
    ) : (
      <path d="M10.75 3.75a7 7 0 015.56 11.95l3.44 3.45 1.06-1.06-3.45-3.44A7 7 0 1110.75 3.75zm0 2a5 5 0 100 10 5 5 0 000-10zm2 2.25h-4v2h4v4h2v-4h4v-2h-4v-4h-2v4z" fill="currentColor" />
    )}
  </svg>
);

export const Lightbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState<ZoomState>({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [didMove, setDidMove] = useState(false);
  const [isMobilePinching, setIsMobilePinching] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef(0);

  const resetZoom = useCallback(() => {
    setZoom({ scale: 1, x: 0, y: 0 });
  }, []);

  const clampPan = useCallback((nextScale: number, nextX: number, nextY: number) => {
    const stage = stageRef.current;
    if (!stage) return { x: nextX, y: nextY };

    const maxX = (stage.clientWidth * (nextScale - 1)) / 2;
    const maxY = (stage.clientHeight * (nextScale - 1)) / 2;
    return {
      x: clamp(nextX, -maxX, maxX),
      y: clamp(nextY, -maxY, maxY),
    };
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setItems([]);
    resetZoom();
    setIsDragging(false);
    setDidMove(false);
    setIsMobilePinching(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, [resetZoom]);

  const updateZoom = useCallback(
    (nextScale: number, originX?: number, originY?: number) => {
      const constrained = clamp(nextScale, 1, 4);
      setZoom((prev) => {
        const base = { scale: constrained, x: prev.x, y: prev.y };
        if (constrained <= 1 || typeof originX !== 'number' || typeof originY !== 'number') {
          return { ...base, x: 0, y: 0 };
        }

        const stage = stageRef.current;
        if (!stage) {
          return base;
        }

        const xRatio = clamp((originX - stage.getBoundingClientRect().left) / stage.clientWidth, 0, 1);
        const yRatio = clamp((originY - stage.getBoundingClientRect().top) / stage.clientHeight, 0, 1);
        const nextX = (0.5 - xRatio) * stage.clientWidth * (constrained - 1);
        const nextY = (0.5 - yRatio) * stage.clientHeight * (constrained - 1);
        return { scale: constrained, ...clampPan(constrained, nextX, nextY) };
      });
    },
    [clampPan]
  );

  const openLightbox = useCallback((trigger: HTMLImageElement) => {
    const groupName = trigger.getAttribute('data-lightbox-group') || 'default';
    const matched = Array.from(document.querySelectorAll<HTMLImageElement>('[data-lightbox]')).filter((img) => {
      const itemGroup = img.getAttribute('data-lightbox-group') || 'default';
      return itemGroup === groupName;
    });

    if (!matched.length) return;

    const collection = matched.map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      title: img.getAttribute('data-lightbox-title') || img.alt || '',
      caption: img.getAttribute('data-lightbox-caption') || '',
    }));

    const index = matched.indexOf(trigger);
    lastFocusedElementRef.current = trigger;
    setItems(collection);
    setCurrentIndex(index >= 0 ? index : 0);
    setZoom({ scale: 1, x: 0, y: 0 });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest('[data-lightbox]') as HTMLImageElement | null;
      if (!trigger) return;
      event.preventDefault();
      openLightbox(trigger);
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [openLightbox]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrentIndex((prev) => {
          const next = prev === 0 ? items.length - 1 : prev - 1;
          resetZoom();
          return next;
        });
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setCurrentIndex((prev) => {
          const next = prev === items.length - 1 ? 0 : prev + 1;
          resetZoom();
          return next;
        });
      }

      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        setZoom((prev) => ({ ...clampPan(Math.min(4, prev.scale + 0.25), prev.x, prev.y), scale: clamp(prev.scale + 0.25, 1, 4), x: prev.x, y: prev.y }));
      }

      if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        setZoom((prev) => {
          const nextScale = clamp(prev.scale - 0.25, 1, 4);
          return { scale: nextScale, ...clampPan(nextScale, prev.x, prev.y) };
        });
      }

      if (event.key === 'Tab' && overlayRef.current) {
        const focusable = Array.from(
          overlayRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        ).filter((element) => !element.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeLightbox, items.length, isOpen, resetZoom, clampPan]);

  useEffect(() => {
    if (!isOpen) return;
    const firstButton = overlayRef.current?.querySelector<HTMLButtonElement>('button');
    firstButton?.focus();
  }, [isOpen]);

  const currentImage = items[currentIndex] ?? null;

  const moveToIndex = useCallback(
    (nextIndex: number) => {
      if (!items.length) return;
      setCurrentIndex((nextIndex + items.length) % items.length);
      resetZoom();
    },
    [items.length, resetZoom]
  );

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  };

  const handleZoomToggle = useCallback(
    (clientX?: number, clientY?: number) => {
      const nextState = zoom.scale > 1 ? 1 : 2.5;
      setZoom((prev) => {
        if (prev.scale > 1) {
          return { scale: 1, x: 0, y: 0 };
        }

        const stage = stageRef.current;
        if (!stage || typeof clientX !== 'number' || typeof clientY !== 'number') {
          return { scale: nextState, x: 0, y: 0 };
        }

        const rect = stage.getBoundingClientRect();
        const xRatio = clamp((clientX - rect.left) / rect.width, 0, 1);
        const yRatio = clamp((clientY - rect.top) / rect.height, 0, 1);
        const nextX = (0.5 - xRatio) * rect.width * (nextState - 1);
        const nextY = (0.5 - yRatio) * rect.height * (nextState - 1);
        return { scale: nextState, ...clampPan(nextState, nextX, nextY) };
      });
    },
    [clampPan, zoom.scale]
  );

  const handleWheelZoom = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();
      const direction = event.deltaY < 0 ? 0.25 : -0.25;
      setZoom((prev) => {
        const next = clamp(prev.scale + direction, 1, 4);
        if (next <= 1) return { scale: 1, x: 0, y: 0 };
        return { scale: next, ...clampPan(next, prev.x, prev.y) };
      });
    },
    [clampPan]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (zoom.scale <= 1) return;
      event.preventDefault();
      setIsDragging(true);
      setDidMove(false);
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        originX: zoom.x,
        originY: zoom.y,
      };
    },
    [zoom.scale, zoom.x, zoom.y]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || zoom.scale <= 1) return;
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setDidMove(true);
      }
      setZoom((prev) => ({
        scale: prev.scale,
        ...clampPan(prev.scale, dragRef.current.originX + dx, dragRef.current.originY + dy),
      }));
    },
    [clampPan, isDragging, zoom.scale]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleImageClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (didMove) {
        setDidMove(false);
        return;
      }
      event.preventDefault();
      handleZoomToggle(event.clientX, event.clientY);
    },
    [didMove, handleZoomToggle]
  );

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const [a, b] = Array.from(event.touches);
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinchRef.current = { distance, scale: zoom.scale };
      setIsMobilePinching(true);
      return;
    }

    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };

    if (event.touches.length === 1 && zoom.scale > 1) {
      setIsDragging(true);
      dragRef.current = { startX: touch.clientX, startY: touch.clientY, originX: zoom.x, originY: zoom.y };
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 260) {
        event.preventDefault();
        handleZoomToggle(touch.clientX, touch.clientY);
      }
      lastTapRef.current = now;
    }
  }, [handleZoomToggle, zoom.scale, zoom.x, zoom.y]);

  const handleTouchMove = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchRef.current) {
      const [a, b] = Array.from(event.touches);
      const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const nextScale = clamp((pinchRef.current.scale * distance) / pinchRef.current.distance, 1, 4);
      setZoom((prev) => ({ scale: nextScale, ...clampPan(nextScale, prev.x, prev.y) }));
      setIsMobilePinching(true);
      return;
    }

    if (event.touches.length === 1 && isDragging && zoom.scale > 1) {
      const touch = event.touches[0];
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;
      setZoom((prev) => ({
        scale: prev.scale,
        ...clampPan(prev.scale, dragRef.current.originX + dx, dragRef.current.originY + dy),
      }));
    }
  }, [clampPan, isDragging, zoom.scale]);

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    if (event.changedTouches.length === 1 && !isMobilePinching && !isDragging) {
      const touch = event.changedTouches[0];
      const start = swipeStartRef.current;
      if (start && zoom.scale <= 1) {
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
          moveToIndex(deltaX < 0 ? 1 : -1);
        }
      }
    }
    setIsDragging(false);
    setIsMobilePinching(false);
    swipeStartRef.current = null;
    pinchRef.current = null;
  }, [isDragging, isMobilePinching, moveToIndex, zoom.scale]);

  if (!isOpen || !currentImage) {
    return null;
  }

  return (
    <>
      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(180deg, rgba(230, 230, 230, 0.92), rgba(242, 242, 242, 0.96));
          animation: lightbox-fade 0.2s ease-out;
        }

        .lightbox-panel {
          position: relative;
          width: min(90vw, 1200px);
          height: min(85vh, 840px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-stage {
          position: relative;
          width: min(100%, 1100px);
          height: min(85vh, 780px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.42);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.18);
          user-select: none;
          cursor: grab;
        }

        .lightbox-stage.dragging {
          cursor: grabbing;
        }

        .lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          transition: transform 0.2s ease;
          will-change: transform;
          transform-origin: center center;
        }

        .lightbox-toolbar {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
        }

        .lightbox-button {
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          color: rgba(17, 17, 17, 0.8);
          box-shadow: 0 12px 36px rgba(17, 17, 17, 0.14);
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
        }

        .lightbox-button:hover,
        .lightbox-button:focus-visible {
          transform: scale(1.08);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 15px 42px rgba(17, 17, 17, 0.18);
          outline: none;
        }

        .lightbox-close {
          position: absolute;
          top: 24px;
          right: 24px;
        }

        .lightbox-arrow-left,
        .lightbox-arrow-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
        }

        .lightbox-arrow-left {
          left: 24px;
        }

        .lightbox-arrow-right {
          right: 24px;
        }

        .lightbox-zoom {
          position: absolute;
          left: 24px;
          bottom: 24px;
        }

        .lightbox-index {
          position: absolute;
          top: 24px;
          left: 24px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          color: rgba(17, 17, 17, 0.8);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          box-shadow: 0 10px 24px rgba(17, 17, 17, 0.12);
        }

        .lightbox-caption {
          position: absolute;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          max-width: min(70vw, 640px);
          text-align: center;
          color: rgba(17, 17, 17, 0.74);
          font-size: 0.86rem;
          line-height: 1.4;
          background: rgba(255, 255, 255, 0.45);
          border-radius: 999px;
          padding: 10px 16px;
          backdrop-filter: blur(8px);
        }

        .lightbox-hidden {
          display: none;
        }

        @keyframes lightbox-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .lightbox-overlay {
            padding: 18px;
          }
          .lightbox-panel {
            width: min(94vw, 1200px);
            height: min(88vh, 720px);
          }
          .lightbox-stage {
            height: min(82vh, 620px);
            border-radius: 18px;
          }
          .lightbox-button {
            width: 44px;
            height: 44px;
          }
          .lightbox-close {
            top: 16px;
            right: 16px;
          }
          .lightbox-arrow-left {
            left: 16px;
          }
          .lightbox-arrow-right {
            right: 16px;
          }
          .lightbox-zoom {
            left: 16px;
            bottom: 16px;
          }
          .lightbox-index {
            top: 16px;
            left: 16px;
            padding: 7px 10px;
            letter-spacing: 0.08em;
          }
          .lightbox-caption {
            font-size: 0.72rem;
            max-width: 78vw;
            bottom: 10px;
           }
        }

        @media (prefers-reduced-motion: reduce) {
          .lightbox-overlay,
          .lightbox-button,
          .lightbox-image {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <div
        ref={overlayRef}
        className="lightbox-overlay"
        onClick={handleBackgroundClick}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <div className="lightbox-panel">
          <div className="lightbox-toolbar">
            <div className="lightbox-index" aria-live="polite">
              {currentIndex + 1} / {items.length}
            </div>

            <button
              type="button"
              className="lightbox-button lightbox-close"
              onClick={(event) => {
                event.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close image viewer"
            >
              <CloseIcon />
            </button>

            <button
              type="button"
              className="lightbox-button lightbox-arrow-left"
              onClick={() => moveToIndex(currentIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>

            <button
              type="button"
              className="lightbox-button lightbox-arrow-right"
              onClick={() => moveToIndex(currentIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>

            <button
              type="button"
              className="lightbox-button lightbox-zoom"
              onClick={() => handleZoomToggle()}
              aria-label={zoom.scale > 1 ? 'Zoom out' : 'Zoom in'}
            >
              <ZoomIcon zoomed={zoom.scale > 1} />
            </button>
          </div>

          <div
            ref={stageRef}
            className={`lightbox-stage ${isDragging ? 'dragging' : ''}`}
            onClick={handleImageClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onWheel={handleWheelZoom}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-label={currentImage.alt || 'Selected project image'}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt || 'Selected project image'}
              className="lightbox-image"
              style={{
                transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
                cursor: zoom.scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
            />
          </div>

          {currentImage.caption && <div className="lightbox-caption">{currentImage.caption}</div>}
        </div>
      </div>
    </>
  );
};
