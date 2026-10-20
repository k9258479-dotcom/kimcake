import React from 'react';
import { Layers, ShieldCheck, Mail, Phone, Globe, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = {
    vi: {
      tagline: 'Nền tảng thiết kế Landing page & Storefront tối ưu chuyển đổi số 1 cho nhà bán hàng.',
      ecosystem: 'Thuộc hệ sinh thái Pancake',
      productsHeading: 'Sản phẩm',
      landingPage: 'Landing Page Builder',
      storefront: 'Storefront Bán Hàng',
      themes: 'Kho giao diện mẫu (500+)',
      supportHeading: 'Hỗ trợ & Hướng dẫn',
      docs: 'Tài liệu hướng dẫn',
      community: 'Cộng đồng người dùng',
      pricing: 'Bảng giá dịch vụ',
      legalHeading: 'Điều khoản & Bảo mật',
      terms: 'Điều khoản sử dụng',
      privacy: 'Chính sách bảo mật',
      refund: 'Chính sách hoàn tiền',
      rights: '© 2025 Kimcake.io - Mọi quyền được bảo lưu.'
    },
    en: {
      tagline: 'Leading high-conversion Landing Page & Storefront builder for modern online businesses.',
      ecosystem: 'Part of the Pancake Ecosystem',
      productsHeading: 'Products',
      landingPage: 'Landing Page Builder',
      storefront: 'Storefront E-Commerce',
      themes: 'Theme Library (500+)',
      supportHeading: 'Support & Docs',
      docs: 'Documentation',
      community: 'User Community',
      pricing: 'Pricing Plans',
      legalHeading: 'Legal & Privacy',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      refund: 'Refund Policy',
      rights: '© 2025 Kimcake.io - All rights reserved.'
    },
    tl: {
      tagline: 'Nangungunang platform para sa paggawa ng mataas na benta na Landing Page at Storefront.',
      ecosystem: 'Bahagi ng Pancake Ecosystem',
      productsHeading: 'Mga Produkto',
      landingPage: 'Tagabuo ng Landing Page',
      storefront: 'Storefront para sa Benta',
      themes: 'Koleksyon ng Tema (500+)',
      supportHeading: 'Tulong at Gabay',
      docs: 'Mga Dokumento',
      community: 'Komunidad',
      pricing: 'Mga Presyo',
      legalHeading: 'Legal at Patakaran',
      terms: 'Mga Tuntunin sa Paggamit',
      privacy: 'Patakaran sa Privacy',
      refund: 'Patakaran sa Refund',
      rights: '© 2025 Kimcake.io - Lahat ng karapatan ay nakalaan.'
    }
  }[language];

  return (
    <footer id="footer-links" className="bg-[#111827] text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#108B67] flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="flex items-baseline">
                <span className="text-lg font-black tracking-tight text-white">kimcake</span>
                <span className="text-xs font-bold text-[#108B67]">.io</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.tagline}
            </p>

            <div className="flex items-center gap-2 text-slate-300 font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-[#108B67]" />
              <span>{t.ecosystem}</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.productsHeading}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {t.landingPage}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">
                  {t.storefront}
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors font-medium text-emerald-400">
                  {t.themes}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.supportHeading}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#help" className="hover:text-white transition-colors">
                  {t.docs}
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-white transition-colors">
                  {t.community}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {t.pricing}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.legalHeading}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  {t.terms}
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="#refund" className="hover:text-white transition-colors">
                  {t.refund}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>{t.rights}</div>
          <div className="flex items-center gap-4">
            <span>Giao diện Kimcake.io - Category 1848</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
