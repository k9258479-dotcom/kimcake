import React from 'react';
import { Search, X, ShoppingBag, LayoutTemplate, Layers, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeType: 'landingpage' | 'storefront';
  onTypeChange: (type: 'landingpage' | 'storefront') => void;
  totalThemes: number;
  language: Language;
  selectedCategoryName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  activeType,
  onTypeChange,
  totalThemes,
  language,
  selectedCategoryName
}) => {
  const t = {
    vi: {
      title: 'Kho giao diện Kimcake',
      badge: 'Bộ sưu tập chuyên nghiệp 2025',
      desc: 'Hơn 500+ mẫu giao diện Landing page và Storefront được thiết kế chuẩn SEO, tối ưu tốc độ tải và chuyển đổi cao cho mọi ngành nghề.',
      tabLanding: 'Landing page',
      tabStorefront: 'Storefront (Bán hàng)',
      searchPlaceholder: 'Tìm kiếm theo tên giao diện, ngành nghề (ví dụ: sàn thương mại, trà, thời trang)...',
      currentFilter: 'Đang xem danh mục:',
      statsFast: 'Tốc độ tải < 1.2s',
      statsConversion: 'Tối ưu chuyển đổi',
      statsResponsive: 'Tương thích 100% Mobile'
    },
    en: {
      title: 'Kimcake Theme Library',
      badge: 'Professional Templates Collection',
      desc: 'Over 500+ professional landing page and storefront templates optimized for high conversion, fast loading speed, and mobile responsiveness.',
      tabLanding: 'Landing page',
      tabStorefront: 'Storefront',
      searchPlaceholder: 'Search templates by name, keyword (e.g. e-commerce, tea, fashion)...',
      currentFilter: 'Selected Category:',
      statsFast: 'Fast Load < 1.2s',
      statsConversion: 'High Conversion',
      statsResponsive: '100% Mobile Ready'
    },
    tl: {
      title: 'Koleksyon ng Tema ng Kimcake',
      badge: 'Propesyonal na Koleksyon',
      desc: 'Higit sa 500+ template ng landing page at storefront na dinisenyo para sa mabilisang benta at mataas na conversion.',
      tabLanding: 'Landing page',
      tabStorefront: 'Storefront',
      searchPlaceholder: 'Maghanap ng template sa pangalan o uri (hal. e-commerce, tsaa, fashion)...',
      currentFilter: 'Kasalukuyang Kategorya:',
      statsFast: 'Bilis ng karga < 1.2s',
      statsConversion: 'Mataas na benta',
      statsResponsive: 'Handa sa Mobile'
    }
  }[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2FBF7] via-[#F8FCFA] to-[#F7F9FB] border-b border-[#E5E7EB] pt-10 pb-12">
      {/* Subtle organic background mesh circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200/60 text-xs font-semibold text-[#0D7355]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
            <span className="text-emerald-400">·</span>
            <span className="font-bold text-[#108B67]">Category 1848</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            {t.title}
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
            {t.desc}
          </p>

          {/* Value Props Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs text-[#0D7355] font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#108B67]" />
              {t.statsFast}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#108B67]" />
              {t.statsConversion}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#108B67]" />
              {t.statsResponsive}
            </span>
          </div>
        </div>

        {/* Tab Switcher & Search Bar Unit */}
        <div className="mt-8 max-w-2xl mx-auto space-y-4">
          {/* Segmented Tab Switcher */}
          <div className="flex items-center justify-center">
            <div className="inline-flex p-1 bg-white rounded-xl shadow-xs border border-slate-200">
              <button
                onClick={() => onTypeChange('landingpage')}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeType === 'landingpage'
                    ? 'bg-[#108B67] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>{t.tabLanding}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeType === 'landingpage' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  373
                </span>
              </button>

              <button
                onClick={() => onTypeChange('storefront')}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeType === 'storefront'
                    ? 'bg-[#108B67] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.tabStorefront}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeType === 'storefront' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  128
                </span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-10 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#108B67]/30 focus:border-[#108B67] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
