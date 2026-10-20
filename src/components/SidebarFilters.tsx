import React, { useState, useMemo } from 'react';
import { Filter, X, Check, Search } from 'lucide-react';
import { ThemeCategory, Language } from '../types';

interface SidebarFiltersProps {
  categories: ThemeCategory[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
  language: Language;
  onClearFilters: () => void;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  language,
  onClearFilters
}) => {
  const [catSearch, setCatSearch] = useState('');

  const t = {
    vi: {
      filterTitle: 'Bộ lọc',
      clearAll: 'Xóa tất cả',
      categoryHeading: 'Danh mục ngành nghề',
      searchCatPlaceholder: 'Tìm kiếm ngành nghề...',
      selectedFilterLabel: 'Đã chọn:',
      noCatsFound: 'Không tìm thấy danh mục phù hợp'
    },
    en: {
      filterTitle: 'Filters',
      clearAll: 'Clear all',
      categoryHeading: 'Industry Categories',
      searchCatPlaceholder: 'Search categories...',
      selectedFilterLabel: 'Selected:',
      noCatsFound: 'No categories found'
    },
    tl: {
      filterTitle: 'Mga Filter',
      clearAll: 'Alisin lahat',
      categoryHeading: 'Kategorya ng Industriya',
      searchCatPlaceholder: 'Maghanap ng kategorya...',
      selectedFilterLabel: 'Napili:',
      noCatsFound: 'Walang nahanap na kategorya'
    }
  }[language];

  // Filter category list by local search
  const filteredCategories = useMemo(() => {
    if (!catSearch.trim()) return categories;
    const q = catSearch.toLowerCase();
    return categories.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.name_en.toLowerCase().includes(q) ||
      (c.name_tl && c.name_tl.toLowerCase().includes(q))
    );
  }, [categories, catSearch]);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
        {/* Header & Clear */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Filter className="w-4 h-4 text-[#108B67]" />
            <span>{t.filterTitle}</span>
          </div>
          {selectedCategoryId !== 0 && (
            <button
              onClick={onClearFilters}
              className="text-xs font-semibold text-[#108B67] hover:text-[#0D7355] transition-colors cursor-pointer"
            >
              {t.clearAll}
            </button>
          )}
        </div>

        {/* Selected Filter Active Chip */}
        {selectedCategoryId !== 0 && selectedCategory && (
          <div className="space-y-1.5 bg-[#F0FDF9] border border-[#A7F3D0] rounded-xl p-2.5">
            <div className="text-[11px] font-medium text-emerald-800 flex items-center justify-between">
              <span>{t.selectedFilterLabel}</span>
              <button
                onClick={() => onSelectCategory(0)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Xóa lựa chọn này"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-xs font-bold text-[#108B67] truncate">
              {language === 'vi'
                ? selectedCategory.name
                : language === 'en'
                ? selectedCategory.name_en
                : selectedCategory.name_tl || selectedCategory.name}
            </div>
          </div>
        )}

        {/* Category Search Input */}
        <div className="relative">
          <input
            type="text"
            value={catSearch}
            onChange={(e) => setCatSearch(e.target.value)}
            placeholder={t.searchCatPlaceholder}
            className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#108B67] focus:bg-white transition-all"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {catSearch && (
            <button
              onClick={() => setCatSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Categories List with Scroll */}
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {t.categoryHeading}
          </h3>

          <div className="max-h-[500px] overflow-y-auto pr-1 space-y-0.5 divide-y divide-slate-50 scrollbar-thin">
            {filteredCategories.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              const displayName =
                language === 'vi'
                  ? cat.name
                  : language === 'en'
                  ? cat.name_en
                  : cat.name_tl || cat.name;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left group cursor-pointer ${
                    isSelected
                      ? 'bg-[#108B67] text-white shadow-xs font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        isSelected ? 'bg-white' : 'bg-transparent group-hover:bg-slate-300'
                      }`}
                    />
                    <span className="truncate">{displayName}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md font-mono tabular-nums transition-colors ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {cat.count}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              );
            })}

            {filteredCategories.length === 0 && (
              <div className="text-xs text-slate-400 py-4 text-center">
                {t.noCatsFound}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
