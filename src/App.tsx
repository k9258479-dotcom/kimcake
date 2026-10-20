import React, { useState, useMemo } from 'react';
import {
  Header
} from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SidebarFilters } from './components/SidebarFilters';
import { ThemeCard } from './components/ThemeCard';
import { PreviewModal } from './components/PreviewModal';
import { LandingPageLive01 } from './components/LandingPageLive01';
import { LandingPageLive05 } from './components/LandingPageLive05';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Footer } from './components/Footer';

import { WEBECAKE_CATEGORIES } from './data/categories';
import { THEMES_DATA } from './data/themes';
import { Language, ThemeItem } from './types';
import { ArrowUpDown, Grid, LayoutGrid, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'landing-01' | 'landing-05'>('catalog');
  const [language, setLanguage] = useState<Language>('vi');

  // Theme Catalog States (Pre-selected Category 1848 from user's URL!)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1848);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeType, setActiveType] = useState<'landingpage' | 'storefront'>('landingpage');
  const [sortBy, setSortBy] = useState<'views' | 'rating' | 'newest'>('views');

  // Preview Modal States
  const [previewTheme, setPreviewTheme] = useState<ThemeItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Shopping Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filtered Themes Logic
  const filteredThemes = useMemo(() => {
    return THEMES_DATA.filter((theme) => {
      // Filter by type
      if (theme.theme_type !== activeType) return false;

      // Filter by category: if not 0, match category_id
      if (selectedCategoryId !== 0 && theme.category_id !== selectedCategoryId) {
        return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = theme.name.toLowerCase().includes(q) || theme.name_en.toLowerCase().includes(q);
        const matchesDesc = theme.description.toLowerCase().includes(q);
        const matchesTags = theme.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'rating') return b.rating - a.rating;
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  }, [selectedCategoryId, searchQuery, activeType, sortBy]);

  const selectedCategory = WEBECAKE_CATEGORIES.find((c) => c.id === selectedCategoryId);
  const selectedCategoryName =
    language === 'vi'
      ? selectedCategory?.name || 'Tất cả'
      : language === 'en'
      ? selectedCategory?.name_en || 'All'
      : selectedCategory?.name_tl || selectedCategory?.name || 'Lahat';

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Open full view directly
  const handleSelectFullView = (theme: ThemeItem) => {
    if (theme.id === 1186) {
      setCurrentView('landing-05');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('landing-01');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB] text-[#222222]">
      {/* Universal Header with Top Switcher */}
      <Header
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        onLanguageChange={setLanguage}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* VIEW 1: Full-featured Live Landing Page 01 (Flash Sale & D2C) */}
      {currentView === 'landing-01' && (
        <LandingPageLive01
          language={language}
          onBackToCatalog={() => setCurrentView('catalog')}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* VIEW 2: Full-featured Live Landing Page 05 (Shopee Marketplace Style) */}
      {currentView === 'landing-05' && (
        <LandingPageLive05
          language={language}
          onBackToCatalog={() => setCurrentView('catalog')}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* VIEW 3: Exact Webcake Themes Catalog for Category 1848 */}
      {currentView === 'catalog' && (
        <div className="flex-1 flex flex-col">
          {/* Hero Banner Section */}
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeType={activeType}
            onTypeChange={setActiveType}
            totalThemes={filteredThemes.length}
            language={language}
            selectedCategoryName={selectedCategoryName}
          />

          {/* Main Content Area: Sidebar + Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left Sidebar Category Filter */}
              <SidebarFilters
                categories={WEBECAKE_CATEGORIES}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(id) => setSelectedCategoryId(id)}
                language={language}
                onClearFilters={() => setSelectedCategoryId(0)}
              />

              {/* Right Content Area: Results Bar & Card Grid */}
              <div className="flex-1 w-full space-y-6">
                {/* Result count & sorting bar */}
                <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      Hiển thị{' '}
                      <span className="text-[#108B67] font-black tabular-nums">
                        {filteredThemes.length}
                      </span>{' '}
                      mẫu giao diện
                    </span>
                    {selectedCategoryId === 1848 && (
                      <span className="text-xs bg-emerald-50 text-[#108B67] font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                        Sàn thương mại điện tử
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-medium">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#108B67]"
                    >
                      <option value="views">Lượt xem nhiều nhất</option>
                      <option value="rating">Đánh giá cao nhất</option>
                      <option value="newest">Mới cập nhật</option>
                    </select>
                  </div>
                </div>

                {/* Theme Cards Grid */}
                {filteredThemes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
                    {filteredThemes.map((theme) => (
                      <ThemeCard
                        key={theme.id}
                        theme={theme}
                        language={language}
                        onPreview={(t, device) => {
                          setPreviewTheme(t);
                          setPreviewDevice(device);
                        }}
                        onSelectFullView={handleSelectFullView}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                      <Filter className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-base">
                        Không tìm thấy mẫu phù hợp
                      </h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Thử xóa từ khóa tìm kiếm hoặc chọn danh mục khác trong danh sách bên trái.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategoryId(1848);
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#108B67] rounded-xl hover:bg-[#0D7355] transition-colors cursor-pointer"
                    >
                      Quay lại danh mục Sàn thương mại điện tử (#1848)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Preview Modal (Desktop & Mobile Simulation) */}
      {previewTheme && (
        <PreviewModal
          theme={previewTheme}
          initialDevice={previewDevice}
          language={language}
          onClose={() => setPreviewTheme(null)}
          onOpenFullView={(theme) => {
            setPreviewTheme(null);
            handleSelectFullView(theme);
          }}
        />
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert('Tiến hành đặt hàng COD với các sản phẩm đã chọn trong giỏ hàng!');
          setIsCartOpen(false);
        }}
      />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
