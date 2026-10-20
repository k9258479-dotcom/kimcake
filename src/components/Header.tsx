import React, { useState } from 'react';
import { Layers, Globe, Menu, X, ArrowUpRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentView: 'catalog' | 'landing-01' | 'landing-05';
  onViewChange: (view: 'catalog' | 'landing-01' | 'landing-05') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  language,
  onLanguageChange,
  cartCount = 0,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = {
    vi: {
      products: 'Sản phẩm',
      pricing: 'Bảng giá',
      templates: 'Kho giao diện',
      guides: 'Hướng dẫn',
      blog: 'Blog',
      login: 'Đăng nhập',
      freeTrial: 'Sử dụng miễn phí',
      viewCatalog: 'Kho Giao Diện (#1848)',
      viewLanding01: 'Xem Landing Page 01 (D2C Flash Sale)',
      viewLanding05: 'Xem Landing Page 05 (Shopee Style)',
      switchViewTitle: 'Chế độ xem:',
      categoryLabel: 'Sàn thương mại điện tử (Cat #1848)'
    },
    en: {
      products: 'Products',
      pricing: 'Pricing',
      templates: 'Theme Library',
      guides: 'Guides',
      blog: 'Blog',
      login: 'Log in',
      freeTrial: 'Start Free Trial',
      viewCatalog: 'Theme Catalog (#1848)',
      viewLanding01: 'Live Landing Page 01 (Flash Sale)',
      viewLanding05: 'Live Landing Page 05 (Shopee Style)',
      switchViewTitle: 'View Mode:',
      categoryLabel: 'E-Commerce Platform (Cat #1848)'
    },
    tl: {
      products: 'Mga Produkto',
      pricing: 'Presyo',
      templates: 'Mga Tema (Catalog)',
      guides: 'Gabay',
      blog: 'Blog',
      login: 'Mag-login',
      freeTrial: 'Subukan nang Libre',
      viewCatalog: 'Theme Catalog (#1848)',
      viewLanding01: 'Live Landing Page 01 (Flash Sale)',
      viewLanding05: 'Live Landing Page 05 (Shopee Style)',
      switchViewTitle: 'Mode ng Tingin:',
      categoryLabel: 'E-Commerce Platform (Cat #1848)'
    }
  }[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-colors">
      {/* Top Banner Notice for Quick Navigation */}
      <div className="bg-[#108B67] text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Kimcake.io:
            </span>
            <span className="hidden sm:inline text-white/90">
              {t.categoryLabel}
            </span>
          </div>

          {/* Quick View Mode Switcher Pills */}
          <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-lg">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                currentView === 'catalog'
                  ? 'bg-white text-[#108B67] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{t.viewCatalog}</span>
            </button>
            <button
              onClick={() => onViewChange('landing-01')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                currentView === 'landing-01'
                  ? 'bg-white text-[#108B67] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Landing 01</span>
            </button>
            <button
              onClick={() => onViewChange('landing-05')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap flex items-center gap-1 ${
                currentView === 'landing-05'
                  ? 'bg-white text-[#108B67] shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Landing 05</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Wordmark & Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onViewChange('catalog')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0D7355] to-[#108B67] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-extrabold tracking-tight text-[#111827]">
                  kimcake
                </span>
                <span className="text-sm font-semibold text-[#108B67]">.io</span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4B5563]">
              <button
                onClick={() => onViewChange('catalog')}
                className="hover:text-[#108B67] transition-colors cursor-pointer"
              >
                {t.products}
              </button>
              <button
                onClick={() => onViewChange('catalog')}
                className="hover:text-[#108B67] transition-colors cursor-pointer"
              >
                {t.pricing}
              </button>
              <button
                onClick={() => onViewChange('catalog')}
                className={`relative py-1 font-semibold transition-colors cursor-pointer ${
                  currentView === 'catalog' ? 'text-[#108B67]' : 'hover:text-[#108B67]'
                }`}
              >
                {t.templates}
                {currentView === 'catalog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#108B67] rounded-full" />
                )}
              </button>
              <button
                onClick={() => onViewChange('landing-01')}
                className={`transition-colors cursor-pointer ${
                  currentView === 'landing-01' ? 'text-[#108B67] font-semibold' : 'hover:text-[#108B67]'
                }`}
              >
                Landing 01
              </button>
              <button
                onClick={() => onViewChange('landing-05')}
                className={`transition-colors cursor-pointer ${
                  currentView === 'landing-05' ? 'text-[#108B67] font-semibold' : 'hover:text-[#108B67]'
                }`}
              >
                Landing 05
              </button>
              <a
                href="#footer-links"
                className="hover:text-[#108B67] transition-colors cursor-pointer"
              >
                {t.guides}
              </a>
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                title="Thay đổi ngôn ngữ / Change language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase font-semibold">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => {
                      onLanguageChange('vi');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'vi' ? 'text-[#108B67] font-semibold' : 'text-slate-600'
                    }`}
                  >
                    <span>Tiếng Việt</span>
                    <span>🇻🇳</span>
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'en' ? 'text-[#108B67] font-semibold' : 'text-slate-600'
                    }`}
                  >
                    <span>English</span>
                    <span>🇺🇸</span>
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('tl');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'tl' ? 'text-[#108B67] font-semibold' : 'text-slate-600'
                    }`}
                  >
                    <span>Tagalog</span>
                    <span>🇵🇭</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart button if in landing page view */}
            {onOpenCart && cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-slate-700 hover:text-[#108B67] border border-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#108B67] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Login Button */}
            <button
              onClick={() => alert('Chức năng Đăng nhập Kimcake ID')}
              className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t.login}
            </button>

            {/* Try Free CTA Button in Signature Green */}
            <button
              onClick={() => {
                onViewChange('catalog');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-[#108B67] hover:bg-[#0D7355] rounded-lg shadow-xs hover:shadow-sm active:scale-98 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>{t.freeTrial}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              onViewChange('catalog');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 flex items-center justify-between"
          >
            <span>{t.viewCatalog}</span>
            {currentView === 'catalog' && <span className="text-[#108B67] text-xs font-bold">Active</span>}
          </button>
          <button
            onClick={() => {
              onViewChange('landing-01');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 flex items-center justify-between"
          >
            <span>{t.viewLanding01}</span>
            {currentView === 'landing-01' && <span className="text-[#108B67] text-xs font-bold">Active</span>}
          </button>
          <button
            onClick={() => {
              onViewChange('landing-05');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-medium text-slate-800 flex items-center justify-between"
          >
            <span>{t.viewLanding05}</span>
            {currentView === 'landing-05' && <span className="text-[#108B67] text-xs font-bold">Active</span>}
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Ngôn ngữ:</span>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => onLanguageChange('vi')}
                className={`px-2 py-1 rounded ${language === 'vi' ? 'bg-[#108B67] text-white' : 'bg-slate-100'}`}
              >
                🇻🇳 VI
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded ${language === 'en' ? 'bg-[#108B67] text-white' : 'bg-slate-100'}`}
              >
                🇺🇸 EN
              </button>
              <button
                onClick={() => onLanguageChange('tl')}
                className={`px-2 py-1 rounded ${language === 'tl' ? 'bg-[#108B67] text-white' : 'bg-slate-100'}`}
              >
                🇵🇭 TL
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
