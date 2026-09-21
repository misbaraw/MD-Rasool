import React, { useState } from 'react';
import { 
  Utensils, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Phone, 
  Menu as MenuIcon, 
  X 
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenReservation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'menu', label: 'Menu' },
    { id: 'experience', label: 'Our Story' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'hours', label: 'Hours & Location' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all">
      {/* Announcement Bar */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs text-stone-400 border-b border-stone-800/60 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Today: 11:30 AM – 10:30 PM
            </span>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1 hover:text-stone-200 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              {RESTAURANT_INFO.neighborhood}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-200/80 font-serif italic text-xs">
              Michelin Guide Recommended 2025
            </span>
            <span className="text-stone-600">•</span>
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button 
            id="header-brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex flex-col text-left group focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-stone-100 group-hover:text-amber-200 transition-colors">
                ARTISAN KITCHEN
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-stone-400 uppercase font-sans pl-10">
              Hearth & Craft Cellar
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
                  activeSection === item.id 
                    ? 'text-amber-400' 
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Takeout Order Bag Button */}
            <button
              id="header-cart-toggle-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-stone-200 border border-stone-700/70 transition-all flex items-center gap-2 focus:outline-none"
              title="View Takeout Bag"
              aria-label="View Takeout Bag"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
              <span className="hidden md:inline text-xs font-medium text-stone-300 pr-1">
                Order Online
              </span>
            </button>

            {/* Book Table Button */}
            <button
              id="header-reserve-table-btn"
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold text-sm tracking-wide shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Table</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="header-mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-stone-800 text-amber-400 font-semibold'
                    : 'text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800/80 flex flex-col gap-2.5">
            <button
              id="mobile-reserve-table-btn"
              onClick={() => {
                onOpenReservation();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Table</span>
            </button>

            <button
              id="mobile-cart-toggle-btn"
              onClick={() => {
                onOpenCart();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Takeout Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
