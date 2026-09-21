import React from 'react';
import { Flame, Sparkles, Calendar, ArrowRight, Clock, MapPin, Award, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
  onOrderOnline: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onBookTable,
  onOrderOnline,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-stone-100">
      {/* Background Image with Warm Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Artisan Kitchen Hearth Ambiance"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/50" />
        <div className="absolute inset-0 bg-radial-to-c from-amber-950/20 via-transparent to-stone-950/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Accolade Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase backdrop-blur-sm mb-6 shadow-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Michelin Guide Selection • 2025</span>
          <span className="text-stone-500">|</span>
          <span className="flex items-center gap-1 text-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            4.9 (1,200+ Reviews)
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-100 max-w-4xl leading-[1.1] mb-6">
          Where Living Fire Meets <br className="hidden sm:inline" />
          <span className="italic font-normal text-amber-200">the Season’s Harvest</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-10">
          Wood-fired California hearth cuisine, handmade extruded pastas, and a low-intervention cellar of over 300 biodynamic wines.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-14">
          <button
            id="hero-reserve-table-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base tracking-wide shadow-xl shadow-amber-950/40 hover:shadow-amber-900/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-5 h-5" />
            <span>Reserve a Table</span>
          </button>

          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold text-base border border-stone-700/80 backdrop-blur-sm transition-all"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            id="hero-order-takeout-btn"
            onClick={onOrderOnline}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full text-stone-300 hover:text-amber-300 font-medium text-sm transition-colors"
          >
            <span>Order Takeout & Pickup</span>
          </button>
        </div>

        {/* Bottom Quick Info Pillars */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-stone-800/80 text-left">
          <div className="bg-stone-900/40 border border-stone-800/60 rounded-xl p-3.5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Hearth Cuisine</span>
            </div>
            <p className="text-xs text-stone-300 font-medium">800° White Oak Coals</p>
          </div>

          <div className="bg-stone-900/40 border border-stone-800/60 rounded-xl p-3.5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Sourcing</span>
            </div>
            <p className="text-xs text-stone-300 font-medium">Capay Valley Organics</p>
          </div>

          <div className="bg-stone-900/40 border border-stone-800/60 rounded-xl p-3.5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Service Today</span>
            </div>
            <p className="text-xs text-stone-300 font-medium">Dinner from 5:00 PM</p>
          </div>

          <div className="bg-stone-900/40 border border-stone-800/60 rounded-xl p-3.5 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location</span>
            </div>
            <p className="text-xs text-stone-300 font-medium">Market St, San Francisco</p>
          </div>
        </div>
      </div>
    </section>
  );
};
