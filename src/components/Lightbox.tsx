import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

type LightboxImage = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

type ZoomState = {
  scale: number;
  x: number;
  y: number;
};

type Point = {
  x: number;
  y: number;
};

type PinchState = {
  distance: number;
  scale: number;
  x: number;
  y: number;
  center: Point;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const PreviousIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="m15 5-7 7 7 7" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="m9 5 7 7-7 7" />
  </svg>
);

const ZoomIcon = ({ zoomed }: { zoomed: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="10.8" cy="10.8" r="6.8" />
    <path d="m16 16 5 5M7.8 10.8h6" />
    {!zoomed && <path d="M10.8 7.8v6" />}
  </svg>
);

export const Lightbox: React.FC = () => {
  const [items, setItems] = useState<LightboxImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState<ZoomState>({ scale: MIN_ZOOM, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, startY: 0, originX: 0, originY: 0 });
  const pointersRef = useRef(new Map<number, Point>());
  const pinchRef = useRef<PinchState | null>(null);
  const swipeRef = useRef<{ pointerId: number; start: Point; moved: boolean } | null>(null);
  const didDragRef = useRef(false);
  const lastTapRef = useRef(0);
  const lastTouchRef = useRef(0);

  const isOpen = items.length > 0;
  const currentImage = items[currentIndex] ?? null;

  const getPanLimits = useCallback((scale: number) => {
    const stage = stageRef.current;
    const image = stage?.querySelector('img');
    if (!stage || !image || !image.naturalWidth || !image.naturalHeight) {
      return { x: 0, y: 0 };
    }

    const maxImageWidth = Math.min(stage.clientWidth, 1600);
    const maxImageHeight = Math.min(stage.clientHeight * 0.85, 900);
    const fit = Math.min(maxImageWidth / image.naturalWidth, maxImageHeight / image.naturalHeight);
    const width = image.naturalWidth * fit;
    const height = image.naturalHeight * fit;

    return {
      x: Math.max(0, (width * scale - stage.clientWidth) / 2),
      y: Math.max(0, (height * scale - stage.clientHeight) / 2),
    };
  }, []);

  const clampPan = useCallback((scale: number, x: number, y: number) => {
    const limits = getPanLimits(scale);
    return {
      x: clamp(x, -limits.x, limits.x),
      y: clamp(y, -limits.y, limits.y),
    };
  }, [getPanLimits]);

  const closeLightbox = useCallback(() => {
    setItems([]);
    setCurrentIndex(0);
    setZoom({ scale: MIN_ZOOM, x: 0, y: 0 });
    setIsDragging(false);
    setIsPinching(false);
    pointersRef.current.clear();
    pinchRef.current = null;
    swipeRef.current = null;
  }, []);

  const openLightbox = useCallback((trigger: HTMLImageElement) => {
    const group = trigger.getAttribute('data-lightbox-group') || 'default';
    const groupedImages = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-lightbox]'))
      .filter((image) => (image.getAttribute('data-lightbox-group') || 'default') === group);
    const index = groupedImages.indexOf(trigger);

    if (index < 0) return;

    triggerRef.current = trigger;
    setItems(groupedImages.map((image) => ({
      src: image.currentSrc || image.src,
      alt: image.alt || image.getAttribute('data-lightbox-title') || 'Image',
      title: image.getAttribute('data-lightbox-title') || image.alt || 'Image',
      caption: image.getAttribute('data-lightbox-caption') || '',
    })));
    setCurrentIndex(index);
    setZoom({ scale: MIN_ZOOM, x: 0, y: 0 });
  }, []);

  const moveToIndex = useCallback((nextIndex: number) => {
    if (!items.length) return;
    setCurrentIndex((nextIndex + items.length) % items.length);
    setZoom({ scale: MIN_ZOOM, x: 0, y: 0 });
  }, [items.length]);

  const zoomAt = useCallback((nextScale: number, clientX?: number, clientY?: number) => {
    const scale = clamp(nextScale, MIN_ZOOM, MAX_ZOOM);
    if (scale === MIN_ZOOM) {
      setZoom({ scale: MIN_ZOOM, x: 0, y: 0 });
      return;
    }

    const stage = stageRef.current;
    const rect = stage?.getBoundingClientRect();
    setZoom((previous) => {
      const pointX = rect && typeof clientX === 'number' ? clientX - rect.left - rect.width / 2 : 0;
      const pointY = rect && typeof clientY === 'number' ? clientY - rect.top - rect.height / 2 : 0;
      const ratio = scale / previous.scale;
      return {
        scale,
        ...clampPan(
          scale,
          pointX - (pointX - previous.x) * ratio,
          pointY - (pointY - previous.y) * ratio
        ),
      };
    });
  }, [clampPan]);

  const toggleZoom = useCallback((clientX?: number, clientY?: number) => {
    zoomAt(zoom.scale > MIN_ZOOM ? MIN_ZOOM : 2.5, clientX, clientY);
  }, [zoom.scale, zoomAt]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLImageElement>('img[data-lightbox]');
      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();
      openLightbox(trigger);
    };

    const handleTriggerKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest<HTMLImageElement>('img[data-lightbox]');
      if (!trigger) return;

      event.preventDefault();
      event.stopPropagation();
      openLightbox(trigger);
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleTriggerKeyDown, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleTriggerKeyDown, true);
    };
  }, [openLightbox]);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    overlayRef.current?.querySelector<HTMLButtonElement>('[data-lightbox-close]')?.focus();

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === 'ArrowLeft' && items.length > 1) {
        event.preventDefault();
        moveToIndex(currentIndex - 1);
      } else if (event.key === 'ArrowRight' && items.length > 1) {
        event.preventDefault();
        moveToIndex(currentIndex + 1);
      } else if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        zoomAt(zoom.scale + 0.25);
      } else if (event.key === '-' || event.key === '_') {
        event.preventDefault();
        zoomAt(zoom.scale - 0.25);
      } else if (event.key === 'Tab') {
        const buttons = overlayRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, currentIndex, isOpen, items.length, moveToIndex, zoom.scale, zoomAt]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      lastTouchRef.current = Date.now();
      if (pointersRef.current.size === 2) {
        const [first, second] = Array.from(pointersRef.current.values());
        pinchRef.current = {
          distance: Math.hypot(first.x - second.x, first.y - second.y),
          scale: zoom.scale,
          x: zoom.x,
          y: zoom.y,
          center: {
            x: (first.x + second.x) / 2,
            y: (first.y + second.y) / 2,
          },
        };
        swipeRef.current = null;
        setIsDragging(false);
        setIsPinching(true);
      } else if (pointersRef.current.size === 1) {
        swipeRef.current = {
          pointerId: event.pointerId,
          start: { x: event.clientX, y: event.clientY },
          moved: false,
        };
      }
    }

    if (zoom.scale > MIN_ZOOM && pointersRef.current.size < 2) {
      event.preventDefault();
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: zoom.x,
        originY: zoom.y,
      };
      didDragRef.current = false;
      setIsDragging(true);
    }

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' && pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (pinchRef.current && pointersRef.current.size >= 2) {
      const [first, second] = Array.from(pointersRef.current.values());
      const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
      const distance = Math.hypot(first.x - second.x, first.y - second.y);
      const scale = clamp(
        (pinchRef.current.scale * distance) / Math.max(pinchRef.current.distance, 1),
        MIN_ZOOM,
        MAX_ZOOM
      );
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pointX = center.x - rect.left - rect.width / 2;
      const pointY = center.y - rect.top - rect.height / 2;
      const startPointX = pinchRef.current.center.x - rect.left - rect.width / 2;
      const startPointY = pinchRef.current.center.y - rect.top - rect.height / 2;
      const ratio = scale / pinchRef.current.scale;
      setZoom({
        scale,
        ...clampPan(
          scale,
          pointX - (startPointX - pinchRef.current.x) * ratio,
          pointY - (startPointY - pinchRef.current.y) * ratio
        ),
      });
      setIsPinching(true);
      return;
    }

    if (event.pointerId === dragRef.current.pointerId && isDragging) {
      const dx = event.clientX - dragRef.current.startX;
      const dy = event.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDragRef.current = true;
      setZoom((previous) => ({
        scale: previous.scale,
        ...clampPan(previous.scale, dragRef.current.originX + dx, dragRef.current.originY + dy),
      }));
      return;
    }

    if (event.pointerType === 'touch' && swipeRef.current?.pointerId === event.pointerId) {
      const dx = event.clientX - swipeRef.current.start.x;
      const dy = event.clientY - swipeRef.current.start.y;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) swipeRef.current.moved = true;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      pointersRef.current.delete(event.pointerId);
      lastTouchRef.current = Date.now();

      if (pinchRef.current) {
        if (pointersRef.current.size < 2) {
          pinchRef.current = null;
          setIsPinching(false);
        }
        swipeRef.current = null;
      } else if (swipeRef.current?.pointerId === event.pointerId) {
        const swipe = swipeRef.current;
        const dx = event.clientX - swipe.start.x;
        const dy = event.clientY - swipe.start.y;
        if (zoom.scale === MIN_ZOOM && swipe.moved && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
          moveToIndex(dx < 0 ? currentIndex + 1 : currentIndex - 1);
        } else if (!swipe.moved) {
          const now = Date.now();
          if (now - lastTapRef.current < 300) {
            toggleZoom(event.clientX, event.clientY);
            lastTapRef.current = 0;
          } else {
            lastTapRef.current = now;
          }
        }
        swipeRef.current = null;
      }
    }

    if (event.pointerId === dragRef.current.pointerId) setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() - lastTouchRef.current < 500) return;
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    toggleZoom(event.clientX, event.clientY);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    zoomAt(zoom.scale + (event.deltaY < 0 ? 0.25 : -0.25), event.clientX, event.clientY);
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeLightbox();
  };

  if (!isOpen || !currentImage) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="lightbox-overlay"
      onClick={handleBackgroundClick}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen image viewer"
      tabIndex={-1}
    >
      <div className="lightbox-stage-area">
        <div
          ref={stageRef}
          className={`lightbox-stage${zoom.scale > MIN_ZOOM ? ' is-zoomed' : ''}${isDragging || isPinching ? ' is-dragging' : ''}`}
          onClick={handleStageClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          aria-label={currentImage.alt}
        >
          <img
            key={currentImage.src}
            className="lightbox-image"
            src={currentImage.src}
            alt={currentImage.alt}
            draggable={false}
            style={{
              transform: `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`,
            }}
          />
        </div>
        {currentImage.caption && (
          <p className="lightbox-caption" aria-live="polite">
            {currentImage.caption}
          </p>
        )}
      </div>

      <div className="lightbox-counter" aria-live="polite">
        {currentIndex + 1} / {items.length}
      </div>

      <button
        type="button"
        className="lightbox-button lightbox-close"
        data-lightbox-close
        onClick={closeLightbox}
        aria-label="Close image viewer"
      >
        <CloseIcon />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-button lightbox-previous"
            onClick={() => moveToIndex(currentIndex - 1)}
            aria-label="Previous image"
          >
            <PreviousIcon />
          </button>
          <button
            type="button"
            className="lightbox-button lightbox-next"
            onClick={() => moveToIndex(currentIndex + 1)}
            aria-label="Next image"
          >
            <NextIcon />
          </button>
        </>
      )}

      <button
        type="button"
        className="lightbox-button lightbox-zoom"
        onClick={() => toggleZoom()}
        aria-label={zoom.scale > MIN_ZOOM ? 'Zoom out' : 'Zoom in'}
      >
        <ZoomIcon zoomed={zoom.scale > MIN_ZOOM} />
      </button>
    </div>,
    document.body
  );
};
