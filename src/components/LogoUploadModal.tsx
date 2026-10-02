import React, { useState, useRef } from 'react';
import { useLogo } from '../context/LogoContext';
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Trash2 } from 'lucide-react';

export const LogoUploadModal: React.FC = () => {
  const { logoUrl, setLogoUrl, isCustom, resetLogo, isModalOpen, closeModal } = useLogo();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const handleFileChange = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewUrl(result);
        setLogoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleReset = () => {
    resetLogo();
    setPreviewUrl(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-white/15 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-neutral-300">
        {/* Subtle red accent line on top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent" />

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-[#E10600] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-[10px] uppercase font-mono font-bold tracking-[0.24em] text-[#FF2A2A] block mb-1">
            BRAND ASSETS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Upload Your Logo
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Upload your official logo file (PNG, SVG, or JPG). It will instantly replace the logo across the entire website.
          </p>
        </div>

        {/* Current / Preview Logo Display */}
        <div className="mb-6 p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-black border border-white/20 p-2 flex items-center justify-center shrink-0 shadow-lg">
            <img
              src={previewUrl || logoUrl}
              alt="Logo Preview"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Current Logo Preview</div>
            <div className="text-[11px] text-neutral-400 mt-0.5">
              {isCustom || previewUrl ? 'Custom logo uploaded' : 'Default placeholder logo'}
            </div>
            {(isCustom || previewUrl) && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#25D366] font-mono mt-1">
                <Check className="w-3 h-3" /> Active on site
              </span>
            )}
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer group ${
            dragActive
              ? 'border-[#E10600] bg-[#E10600]/10 scale-[1.01]'
              : 'border-white/15 bg-white/[0.02] hover:border-[#E10600]/50 hover:bg-white/[0.04]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/svg+xml, image/jpeg, image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          <div className="w-12 h-12 rounded-full bg-[#E10600]/15 text-[#FF2A2A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>

          <div className="text-sm font-bold text-white group-hover:text-[#FF2A2A] transition-colors">
            Click to upload or drag & drop
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            PNG, SVG, JPG, or WEBP (transparent background recommended)
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          {(isCustom || previewUrl) ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 text-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset to Default</span>
            </button>
          ) : (
            <div className="text-[11px] text-neutral-500 font-mono">
              Ready to replace
            </div>
          )}

          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2.5 rounded-xl red-gradient-bg hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#E10600]/30 transition-all cursor-pointer ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
