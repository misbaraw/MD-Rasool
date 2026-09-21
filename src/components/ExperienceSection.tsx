import React from 'react';
import { Flame, Leaf, Wine, Sparkles, Award, ArrowRight } from 'lucide-react';
import { PHILOSOPHY_PILLARS, RESTAURANT_INFO } from '../data/restaurantData';

interface ExperienceSectionProps {
  onReserveTasting: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onReserveTasting,
}) => {
  return (
    <section id="experience" className="py-24 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 font-semibold mb-3">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Our Culinary Philosophy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-[1.15] mb-6">
              Respect for the Fire. <br />
              <span className="italic font-normal text-amber-800">Reverence for the Soil.</span>
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light mb-6">
              Founded in 2018 in San Francisco, Artisan Kitchen is built on an enduring commitment to primitive cooking techniques paired with progressive Northern California farm relationships. We believe that true luxury is knowing the exact farm row where your greens were harvested at dawn.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div>
                <span className="font-serif text-3xl font-bold text-stone-900 block">800°</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Oak Hearth</span>
              </div>
              <div className="w-px h-10 bg-stone-300" />
              <div>
                <span className="font-serif text-3xl font-bold text-stone-900 block">320+</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Cellar Wines</span>
              </div>
              <div className="w-px h-10 bg-stone-300" />
              <div>
                <span className="font-serif text-3xl font-bold text-stone-900 block">100%</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider">Organic Flour</span>
              </div>
            </div>
          </div>

          {/* Photo Showcase Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                  alt="Dining Room Ambiance"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-44 bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
                  alt="Handmade Pasta Craft"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="space-y-4 pt-6">
              <div className="rounded-2xl overflow-hidden shadow-md h-44 bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                  alt="Wine Cellar Reserve"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-64 bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80"
                  alt="Wood Fired Grilling"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              id={`philosophy-pillar-${idx}`}
              className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
                {idx === 0 && <Flame className="w-6 h-6" />}
                {idx === 1 && <Leaf className="w-6 h-6" />}
                {idx === 2 && <Wine className="w-6 h-6" />}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                {pillar.subtitle}
              </span>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                {pillar.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Chef's Table & Tasting Experience Banner */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-stone-100 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-wider font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Chef's Hearth Counter Experience</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3">
              The Seven-Course Hearth Tasting Menu
            </h3>
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Curated nightly by Executive Chef {RESTAURANT_INFO.executiveChef}. Limited to 10 guests per seating with personalized wine flight selections by our Head Sommelier ($145 per guest).
            </p>
          </div>

          <button
            id="book-tasting-menu-btn"
            onClick={onReserveTasting}
            className="shrink-0 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2"
          >
            <span>Book Hearth Tasting</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
