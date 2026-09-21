import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationSection } from './components/ReservationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { ReviewsSection } from './components/ReviewsSection';
import { OrderDrawer } from './components/OrderDrawer';
import { Footer } from './components/Footer';
import { MenuItem, CartItem } from './types';
import { Calendar, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (dish: MenuItem, quantity: number = 1, instructions: string = '') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (instructions) {
          updated[existingIndex].specialInstructions = instructions;
        }
        return updated;
      }
      return [...prev, { dish, quantity, specialInstructions: instructions }];
    });

    // Mark as added for visual feedback on button
    setAddedItemIds((prev) => new Set(prev).add(dish.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(dish.id);
        return next;
      });
    }, 1500);

    // Toast feedback
    setToastMessage(`Added ${quantity}x ${dish.name} to order`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.dish.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keep active section synchronized with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['reviews', 'hours', 'reservations', 'experience', 'menu'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(section);
          return;
        }
      }
      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-stone-950/90 backdrop-blur-md text-amber-300 px-4 py-2.5 rounded-2xl shadow-xl border border-amber-500/30 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-top-3 duration-300">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservations')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservations')}
          onOrderOnline={() => {
            scrollToSection('menu');
            setIsCartOpen(true);
          }}
        />

        {/* Seasonal Menu Section */}
        <MenuSection
          onSelectItem={(dish) => setSelectedDish(dish)}
          onAddToCart={(dish) => handleAddToCart(dish, 1)}
          addedItemIds={addedItemIds}
        />

        {/* Story & Philosophy Section */}
        <ExperienceSection
          onReserveTasting={() => scrollToSection('reservations')}
        />

        {/* Reservations Booking Section */}
        <ReservationSection />

        {/* Reviews & Accolades */}
        <ReviewsSection />

        {/* Hours, Map & Location */}
        <LocationHoursSection
          onReserveClick={() => scrollToSection('reservations')}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Dish Quick Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Online Order Bag Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Mobile Quick Action Pill */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center gap-2">
        <button
          id="mobile-sticky-reserve-btn"
          onClick={() => scrollToSection('reservations')}
          className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 text-stone-950 font-bold text-xs shadow-xl flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book a Table</span>
        </button>

        <button
          id="mobile-sticky-cart-btn"
          onClick={() => setIsCartOpen(true)}
          className="py-3 px-4 rounded-2xl bg-stone-900 text-stone-100 font-bold text-xs border border-stone-800 shadow-xl flex items-center justify-center gap-2 relative"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          {totalCartCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[10px] flex items-center justify-center font-bold">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
