import React, { useState } from 'react';
import { Utensils, Mail, ArrowUp, Award, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Story Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white">
                ARTISAN KITCHEN
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-md">
              {RESTAURANT_INFO.tagline}. Dedicated to wood-fired hearth cooking, hand-rolled pastas, and regenerative farm partnerships in San Francisco since 2018.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {RESTAURANT_INFO.awards.map((award, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-amber-200/90 font-serif"
                >
                  <Award className="w-3 h-3 text-amber-400" />
                  {award}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              The Artisan Wine & Culinary Dispatch
            </span>
            <h4 className="font-serif text-xl font-bold text-white">
              Stay Connected With Our Seasonal Menus
            </h4>
            <p className="text-xs text-stone-400 font-light">
              Receive early invitations to winemaker dinners, seasonal menu debuts, and exclusive hearth table openings.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you for subscribing! We look forward to welcoming you soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  id="newsletter-subscribe-btn"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Navigation & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => onNavigate('menu')} 
              className="hover:text-stone-300 transition-colors"
            >
              Menu
            </button>
            <button 
              onClick={() => onNavigate('reservations')} 
              className="hover:text-stone-300 transition-colors"
            >
              Reservations
            </button>
            <button 
              onClick={() => onNavigate('experience')} 
              className="hover:text-stone-300 transition-colors"
            >
              Our Story
            </button>
            <button 
              onClick={() => onNavigate('hours')} 
              className="hover:text-stone-300 transition-colors"
            >
              Hours & Location
            </button>
            <button 
              onClick={() => onNavigate('reviews')} 
              className="hover:text-stone-300 transition-colors"
            >
              Reviews
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} Artisan Kitchen LLC. All rights reserved.</span>
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors flex items-center gap-1.5"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
