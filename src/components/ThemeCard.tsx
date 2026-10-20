import React, { useState } from 'react';
import { Eye, Smartphone, Monitor, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ThemeItem, Language } from '../types';

interface ThemeCardProps {
  theme: ThemeItem;
  language: Language;
  onPreview: (theme: ThemeItem, device: 'desktop' | 'mobile') => void;
  onSelectFullView: (theme: ThemeItem) => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  language,
  onPreview,
  onSelectFullView
}) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const t = {
    vi: {
      preview: 'Xem trước',
      useTheme: 'Sử dụng giao diện',
      liveDemo: 'Xem Landing Page thực tế',
      views: 'lượt xem',
      mobilePreview: 'Mobile',
      desktopPreview: 'Desktop'
    },
    en: {
      preview: 'Preview',
      useTheme: 'Use Template',
      liveDemo: 'Open Live Landing Page',
      views: 'views',
      mobilePreview: 'Mobile',
      desktopPreview: 'Desktop'
    },
    tl: {
      preview: 'Silipin (Preview)',
      useTheme: 'Gamitin ang Tema',
      liveDemo: 'Buksan ang Live Landing Page',
      views: 'mga tingin',
      mobilePreview: 'Mobile',
      desktopPreview: 'Desktop'
    }
  }[language];

  const displayName =
    language === 'vi'
      ? theme.name
      : language === 'en'
      ? theme.name_en
      : theme.name_tl || theme.name;

  const displayDesc =
    language === 'vi'
      ? theme.description
      : language === 'en'
      ? theme.description_en || theme.description
      : theme.description_tl || theme.description;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Media Showcase Container */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        {/* Main Thumbnail */}
        {!imgError ? (
          <img
            src={theme.thumbnail}
            alt={displayName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-teal-100 text-[#108B67]">
            <Sparkles className="w-8 h-8 mb-2" />
            <span className="text-xs font-bold text-center">{displayName}</span>
          </div>
        )}

        {/* Category Unboxed Subtle Label on Top Corner */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide bg-white/95 backdrop-blur-xs text-slate-800 rounded-md shadow-xs border border-slate-100">
            {theme.category}
          </span>
        </div>

        {/* Hover Overlay with Action Buttons */}
        <div
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2">
            {/* Desktop Preview Trigger */}
            <button
              onClick={() => onPreview(theme, 'desktop')}
              className="px-3.5 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-[#108B67]" />
              <span>{t.desktopPreview}</span>
            </button>

            {/* Mobile Preview Trigger */}
            <button
              onClick={() => onPreview(theme, 'mobile')}
              className="px-3.5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/20 rounded-lg shadow-sm flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.mobilePreview}</span>
            </button>
          </div>

          {/* Primary View Action */}
          <button
            onClick={() => onSelectFullView(theme)}
            className="w-full max-w-[220px] px-4 py-2.5 text-xs font-bold text-white bg-[#108B67] hover:bg-[#0D7355] rounded-lg shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <span>{t.liveDemo}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
            <span>ID #{theme.id}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Eye className="w-3.5 h-3.5" />
              <span className="tabular-nums">{theme.views}</span> {t.views}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectFullView(theme)}
            className="text-base font-bold text-slate-900 group-hover:text-[#108B67] transition-colors cursor-pointer line-clamp-1"
          >
            {displayName}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
            <span>★</span>
            <span className="text-slate-700 font-bold tabular-nums">{theme.rating}</span>
            <span className="text-slate-400 font-normal">/ 5</span>
          </div>

          <button
            onClick={() => onSelectFullView(theme)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#108B67] hover:text-[#0D7355] group/btn cursor-pointer"
          >
            <span>{t.preview}</span>
            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
