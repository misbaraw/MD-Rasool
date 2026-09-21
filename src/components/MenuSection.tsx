import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Wine, 
  Plus, 
  Check, 
  Utensils, 
  Eye, 
  Flame, 
  Wheat, 
  Leaf, 
  Salad 
} from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, MenuCategory, DietaryTag } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  addedItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onAddToCart,
  addedItemIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Dishes', count: MENU_ITEMS.length },
    { id: 'starters', label: 'Starters & Crudo', count: MENU_ITEMS.filter(i => i.category === 'starters').length },
    { id: 'mains', label: 'Hearth Mains', count: MENU_ITEMS.filter(i => i.category === 'mains').length },
    { id: 'pastas', label: 'Handmade Pasta', count: MENU_ITEMS.filter(i => i.category === 'pastas').length },
    { id: 'specials', label: 'Chef Specials', count: MENU_ITEMS.filter(i => i.category === 'specials').length },
    { id: 'desserts', label: 'Desserts', count: MENU_ITEMS.filter(i => i.category === 'desserts').length },
    { id: 'drinks', label: 'Cocktails & Cellar', count: MENU_ITEMS.filter(i => i.category === 'drinks').length },
  ];

  const dietaryFilters: { id: DietaryTag | 'all'; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Diets' },
    { id: 'chef-pick', label: 'Chef’s Pick', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'vegetarian', label: 'Vegetarian', icon: <Salad className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'vegan', label: 'Vegan', icon: <Leaf className="w-3.5 h-3.5 text-green-600" /> },
    { id: 'gluten-free', label: 'Gluten-Free', icon: <Wheat className="w-3.5 h-3.5 text-amber-600" /> },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary !== 'all') {
        if (!item.dietary.includes(selectedDietary)) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesIngredients;
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-stone-50 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Seasonal Culinary Program</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight mb-4">
            Curated Autumn Menu
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light">
            Every dish is cooked over live wood embers or extruded fresh daily using organic flour. Sourced with integrity from local Northern California farmers.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-category-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Dietary Badges */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
            {/* Dietary Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {dietaryFilters.map((diet) => {
                const isSelected = selectedDietary === diet.id;
                return (
                  <button
                    key={diet.id}
                    id={`dietary-filter-${diet.id}`}
                    onClick={() => setSelectedDietary(diet.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900 font-semibold'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    {diet.icon}
                    <span>{diet.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, truffle, branzino..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  id="menu-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8">
            <Utensils className="w-10 h-10 text-stone-400 mx-auto mb-3 stroke-[1.5]" />
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">No dishes match your filter</h3>
            <p className="text-xs text-stone-500 mb-4">Try clearing the search query or selecting a different dietary requirement.</p>
            <button
              id="reset-menu-filters-btn"
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const isAdded = addedItemIds.has(dish.id);

              return (
                <div
                  key={dish.id}
                  id={`dish-card-${dish.id}`}
                  className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image & Badges */}
                  <div>
                    <div 
                      className="relative h-52 sm:h-56 overflow-hidden cursor-pointer bg-stone-100"
                      onClick={() => onSelectItem(dish)}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {dish.dietary.includes('chef-pick') && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[11px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            Chef’s Choice
                          </span>
                        )}
                        {dish.isPopular && (
                          <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide shadow-sm">
                            House Favorite
                          </span>
                        )}
                      </div>

                      {/* Quick View Button on Hover */}
                      <button
                        id={`quick-view-${dish.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(dish);
                        }}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 pb-2">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 
                          onClick={() => onSelectItem(dish)}
                          className="font-serif text-xl font-bold text-stone-900 hover:text-amber-700 transition-colors cursor-pointer leading-tight"
                        >
                          {dish.name}
                        </h3>
                        <span className="font-serif text-lg font-bold text-stone-900 shrink-0">
                          ${dish.price}
                        </span>
                      </div>

                      {/* Dietary Badges */}
                      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                        {dish.dietary.filter(d => d !== 'chef-pick').map((diet) => (
                          <span
                            key={diet}
                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200"
                          >
                            {diet}
                          </span>
                        ))}
                        {dish.prepTimeMinutes && (
                          <span className="text-[10px] text-stone-400 font-medium ml-auto">
                            ~{dish.prepTimeMinutes} mins
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                        {dish.description}
                      </p>

                      {/* Wine Pairing Note */}
                      {dish.pairing && (
                        <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100/80 mb-4 flex items-start gap-2">
                          <Wine className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-snug">
                            <span className="font-medium text-amber-900">Sommelier Pairing: </span>
                            <span className="text-stone-700 italic">{dish.pairing}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 sm:p-6 pt-0 mt-auto border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      id={`view-recipe-btn-${dish.id}`}
                      onClick={() => onSelectItem(dish)}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900 underline underline-offset-4 transition-colors"
                    >
                      Ingredients & Notes
                    </button>

                    <button
                      id={`add-to-cart-${dish.id}`}
                      onClick={() => onAddToCart(dish)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-stone-900 hover:bg-amber-600 text-white active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
