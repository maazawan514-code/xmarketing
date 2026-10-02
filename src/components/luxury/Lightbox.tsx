import React, { useEffect } from 'react';
import { GalleryImage } from '../../data/brandConfig';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [currentIndex, images, onClose, onSelectIndex]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1d1503]/95 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-300"
    >
      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
        <div className="pointer-events-auto text-[11px] font-mono tracking-widest uppercase text-[#b8955a]">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto w-11 h-11 rounded-full bg-[#3b2c06]/80 hover:bg-[#b8955a] text-[#f5efe3] hover:text-[#231a04] border border-[#b8955a]/30 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="Close Lightbox (ESC)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#3b2c06]/80 hover:bg-[#b8955a] text-[#f5efe3] hover:text-[#231a04] border border-[#b8955a]/30 flex items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-xl"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#3b2c06]/80 hover:bg-[#b8955a] text-[#f5efe3] hover:text-[#231a04] border border-[#b8955a]/30 flex items-center justify-center transition-all duration-300 cursor-pointer z-30 shadow-xl"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full max-h-[85vh] flex flex-col items-center select-none"
      >
        <div className="relative w-full aspect-[16/10] max-h-[72vh] rounded-sm overflow-hidden bg-[#231a04] shadow-2xl flex items-center justify-center border border-[#b8955a]/25">
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Caption Bar */}
        <div className="w-full mt-4 text-center px-4">
          <h4 className="text-xl sm:text-2xl font-serif text-[#f5efe3] font-normal tracking-wide">
            {currentImage.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#b8955a] font-sans font-light mt-1 max-w-2xl mx-auto">
            {currentImage.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
