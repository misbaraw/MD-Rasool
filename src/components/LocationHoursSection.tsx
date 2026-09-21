import React from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Car, 
  Train, 
  Sparkles, 
  ExternalLink,
  CalendarCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationHoursProps {
  onReserveClick: () => void;
}

export const LocationHoursSection: React.FC<LocationHoursProps> = ({
  onReserveClick,
}) => {
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  // Convert JS day (0 Sun - 6 Sat) to our array order (Mon-Sun):
  const dayIndexInArray = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

  return (
    <section id="hours" className="py-24 bg-stone-900 text-stone-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Clock className="w-4 h-4" />
            <span>Visit Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Hours & Location
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Conveniently situated in downtown San Francisco, footsteps away from Montgomery Station and the Embarcadero.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Opening Hours Table (5 cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Service Schedule</span>
              </h3>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open Today
              </span>
            </div>

            <div className="space-y-3">
              {RESTAURANT_INFO.openingHours.map((item, idx) => {
                const isToday = idx === dayIndexInArray;
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                      isToday
                        ? 'bg-amber-500/10 border border-amber-500/30 text-white font-semibold'
                        : 'text-stone-300 hover:bg-stone-900/40'
                    }`}
                  >
                    <span className="text-xs sm:text-sm flex items-center gap-2">
                      {item.day}
                      {isToday && (
                        <span className="text-[10px] uppercase font-bold text-amber-400 px-1.5 py-0.2 bg-amber-500/20 rounded">
                          Today
                        </span>
                      )}
                    </span>
                    <div className="text-right text-xs text-stone-400 font-mono">
                      {item.lunch && <span>{item.lunch} & </span>}
                      {item.brunch && <span>{item.brunch} & </span>}
                      <span className="text-stone-200">{item.dinner}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Happy Hour Note */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs">
              <span className="font-bold text-amber-400 block mb-1">
                Aperitivo & Hearth Happy Hour
              </span>
              <p className="text-stone-300 font-light">
                {RESTAURANT_INFO.happyHour}. Enjoy $12 craft spritzes, oysters on the half shell, and wood-fired flatbreads.
              </p>
            </div>

            <button
              id="hours-reserve-btn"
              onClick={onReserveClick}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Book a Table for Today
            </button>
          </div>

          {/* Right Column: Location, Map Preview, Getting Here (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Map Visualizer */}
            <div className="bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-xl">
              {/* Map Canvas Mockup with Realistic Cartography Styling */}
              <div className="relative h-64 sm:h-72 w-full bg-stone-800 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                  alt="City Map View"
                  className="w-full h-full object-cover opacity-40 filter contrast-125"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/40" />

                {/* Pin Card Marker */}
                <div className="relative z-10 bg-stone-900/95 border border-amber-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-xs text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg mb-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-white text-base">
                    Artisan Kitchen & Hearth
                  </h4>
                  <p className="text-xs text-stone-300 mt-0.5">
                    {RESTAURANT_INFO.address}
                  </p>
                  <a
                    id="open-google-maps-directions-link"
                    href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-stone-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Train className="w-4 h-4" />
                    <span>Public Transit</span>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    2 blocks from Montgomery St Station (BART and Muni Metro lines J, K, M, N). Easy walk from Transbay Transit Terminal.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Car className="w-4 h-4" />
                    <span>Valet & Parking</span>
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    Valet parking available at our main entrance Thursday – Saturday evenings. Secured garage parking at 433 California St.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact & Private Events Card */}
            <div className="bg-stone-950 rounded-3xl p-6 sm:p-8 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[11px] text-amber-400 uppercase font-bold tracking-wider block">
                  Private Dining & Large Parties
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  Hosting a Celebration or Corporate Dinner?
                </h4>
                <p className="text-xs text-stone-400 font-light">
                  Our private Wine Vault accommodates up to 24 guests, or full restaurant buyout for 120 guests.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Inquire Events</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
