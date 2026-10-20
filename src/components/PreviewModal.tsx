import React, { useState } from 'react';
import {
  X, Monitor, Smartphone, ExternalLink, Check, ShoppingBag,
  Sparkles, RotateCcw, ArrowRight
} from 'lucide-react';
import { ThemeItem, Language } from '../types';
import { LandingPageLive01 } from './LandingPageLive01';
import { LandingPageLive05 } from './LandingPageLive05';

interface PreviewModalProps {
  theme: ThemeItem | null;
  initialDevice?: 'desktop' | 'mobile';
  language: Language;
  onClose: () => void;
  onOpenFullView: (theme: ThemeItem) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  theme,
  initialDevice = 'desktop',
  language,
  onClose,
  onOpenFullView
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>(initialDevice);
  const [copied, setCopied] = useState(false);

  if (!theme) return null;

  const t = {
    vi: {
      desktop: 'Màn hình máy tính',
      mobile: 'Điện thoại di động',
      useTheme: 'Sử dụng giao diện',
      fullScreen: 'Mở trang đầy đủ',
      copyLink: 'Chia sẻ liên kết',
      views: 'lượt xem'
    },
    en: {
      desktop: 'Desktop view',
      mobile: 'Mobile view',
      useTheme: 'Use this template',
      fullScreen: 'Open full page',
      copyLink: 'Share link',
      views: 'views'
    },
    tl: {
      desktop: 'Desktop view',
      mobile: 'Mobile view',
      useTheme: 'Gamitin ang template',
      fullScreen: 'Buksan nang buo',
      copyLink: 'Ibahagi',
      views: 'tingin'
    }
  }[language];

  const displayName =
    language === 'vi'
      ? theme.name
      : language === 'en'
      ? theme.name_en
      : theme.name_tl || theme.name;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col">
      {/* Top Modal Control Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 text-white">
        {/* Left: Info */}
        <div className="flex items-center gap-3 truncate">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#108B67] shrink-0" />
            <h2 className="text-sm font-bold truncate">{displayName}</h2>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400">·</span>
          <span className="hidden sm:inline text-xs text-slate-400 truncate">
            {theme.category}
          </span>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700/60">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              device === 'desktop'
                ? 'bg-[#108B67] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title={t.desktop}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.desktop}</span>
          </button>

          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              device === 'mobile'
                ? 'bg-[#108B67] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title={t.mobile}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t.mobile}</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Full Screen View Trigger */}
          <button
            onClick={() => onOpenFullView(theme)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{t.fullScreen}</span>
          </button>

          {/* Primary CTA button */}
          <button
            onClick={() => {
              alert(`Chúc mừng! Bạn đã kích hoạt sử dụng mẫu: ${displayName}. Hệ thống Kimcake đang khởi tạo trang cho bạn.`);
            }}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#108B67] hover:bg-[#0D7355] rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>{t.useTheme}</span>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Đóng cửa sổ xem trước"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Canvas Body */}
      <div className="flex-1 bg-slate-950 overflow-auto flex items-center justify-center p-0 sm:p-4">
        {device === 'desktop' ? (
          <div className="w-full h-full bg-white shadow-2xl rounded-none sm:rounded-xl overflow-y-auto">
            {theme.id === 1182 ? (
              <LandingPageLive01 language={language} />
            ) : theme.id === 1186 ? (
              <LandingPageLive05 language={language} />
            ) : (
              <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
                <div className="p-8 max-w-4xl mx-auto space-y-6 text-center pt-16">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#108B67] flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">{displayName}</h2>
                  <p className="text-slate-600 max-w-xl mx-auto">{theme.description}</p>
                  <div className="aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img src={theme.thumbnail} alt={displayName} className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => onOpenFullView(theme)}
                      className="px-6 py-3 bg-[#108B67] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#0D7355] cursor-pointer"
                    >
                      Mở giao diện tương tác trực tiếp
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mobile Device Frame Simulation */
          <div className="relative my-auto w-[375px] h-[780px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-[0_0_60px_rgba(0,0,0,0.8)] border-4 border-slate-700/80 flex flex-col shrink-0">
            {/* iPhone Island / Speaker Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
            </div>

            {/* Mobile Screen Inside */}
            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden overflow-y-auto relative scrollbar-none">
              {theme.id === 1182 ? (
                <LandingPageLive01 language={language} />
              ) : theme.id === 1186 ? (
                <LandingPageLive05 language={language} />
              ) : (
                <div className="p-4 space-y-4 text-center pt-12">
                  <h3 className="font-bold text-slate-900">{displayName}</h3>
                  <img src={theme.thumbnail} alt={displayName} className="rounded-xl w-full" />
                  <p className="text-xs text-slate-500">{theme.description}</p>
                </div>
              )}
            </div>

            {/* Home bar bottom indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};
