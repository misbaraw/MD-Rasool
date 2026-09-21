import React, { useState } from 'react';
import { 
  X, 
  Wine, 
  Flame, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingBag,
  Check
} from 'lucide-react';
import { MenuItem } from '../types';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, quantity: number, instructions: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, quantity, instructions);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          id="close-dish-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white backdrop-blur-sm transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Image */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-900">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {dish.dietary.includes('chef-pick') && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    Chef’s Recommendation
                  </span>
                )}
                {dish.dietary.filter(d => d !== 'chef-pick').map((diet) => (
                  <span
                    key={diet}
                    className="px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-stone-200 text-xs font-medium uppercase tracking-wider"
                  >
                    {diet}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {dish.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                ${dish.price}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(85vh-18rem)]">
          {/* Quick Metrics */}
          <div className="flex items-center gap-4 text-xs text-stone-500 border-b border-stone-100 pb-4">
            {dish.calories && (
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{dish.calories} kcal</span>
              </span>
            )}
            {dish.prepTimeMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-stone-400" />
                <span>~{dish.prepTimeMinutes} mins prep</span>
              </span>
            )}
            <span className="capitalize text-stone-600 font-medium">
              Course: {dish.category}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
              Culinary Profile
            </h4>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              {dish.description}
            </p>
          </div>

          {/* Sourced Ingredients */}
          <div>
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">
              Sourced Ingredients
            </h4>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Wine Pairing */}
          {dish.pairing && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
                <Wine className="w-4 h-4 text-amber-700" />
                <span>Sommelier Recommended Pairing</span>
              </div>
              <p className="text-stone-800 text-sm font-serif italic">
                {dish.pairing}
              </p>
            </div>
          )}

          {/* Allergen Notice */}
          {dish.allergens && dish.allergens.length > 0 && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 text-xs">
              <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800">Contains allergens: </span>
                <span>{dish.allergens.join(', ')}. Please notify our kitchen staff if you have severe allergies.</span>
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label 
              htmlFor="dish-instructions-input" 
              className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-2"
            >
              Special Dietary Notes or Kitchen Instructions (Optional)
            </label>
            <input
              id="dish-instructions-input"
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g., dressing on side, no chives, extra crispy"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer / Order Action */}
        <div className="p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl p-1.5 shadow-xs">
            <button
              id="dish-qty-decrease-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-stone-900 text-sm">
              {quantity}
            </span>
            <button
              id="dish-qty-increase-btn"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            id="dish-modal-add-to-cart-btn"
            onClick={handleAdd}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-amber-600 text-white active:scale-98'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • ${(dish.price * quantity).toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
