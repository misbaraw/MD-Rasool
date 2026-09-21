import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Utensils, 
  Phone, 
  User, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { CartItem, PlacedOrder } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'dine-in'>('pickup');
  const [tableNumber, setTableNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (~25 mins)');
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      return;
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      return;
    }

    const orderNumber = `AK-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PlacedOrder = {
      orderId: orderNumber,
      items: [...cartItems],
      orderType,
      pickupTime: orderType === 'pickup' ? pickupTime : `Table ${tableNumber}`,
      tableNumber: orderType === 'dine-in' ? tableNumber : undefined,
      customerName,
      customerPhone,
      subtotal,
      tax,
      total,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'received'
    };

    setPlacedOrder(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Your Dining Order</h3>
              <p className="text-[11px] text-stone-400">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in bag
              </p>
            </div>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-700 font-bold">
                  Order Successfully Placed
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  The Hearth is Firing Up!
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Order Reference: <span className="font-mono font-bold text-stone-900">{placedOrder.orderId}</span>
                </p>
              </div>

              {/* Order Stepper */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 text-left space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                  Kitchen Live Progress
                </span>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">1. Order Received</span>
                      <span className="text-[11px] text-stone-500">Sent to Chef Marco’s station at {placedOrder.placedAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold animate-pulse">
                      2
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">2. In the Hearth Kitchen</span>
                      <span className="text-[11px] text-stone-500">
                        {placedOrder.orderType === 'pickup' 
                          ? `Ready for pickup: ${placedOrder.pickupTime}` 
                          : `Delivering to Table ${placedOrder.tableNumber}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <span className="text-xs font-bold text-stone-800 block">3. Ready for Hand-off</span>
                      <span className="text-[11px] text-stone-500">Notify guest via SMS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pickup details */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <MapPin className="w-4 h-4 text-amber-700" />
                  <span>Pickup Location</span>
                </div>
                <p className="text-stone-700">{RESTAURANT_INFO.address}</p>
                <p className="text-stone-600">Please provide name <span className="font-semibold text-stone-900">{placedOrder.customerName}</span> or order <span className="font-mono font-semibold text-stone-900">{placedOrder.orderId}</span> at the Host Stand.</p>
              </div>

              <button
                id="order-more-btn"
                onClick={() => setPlacedOrder(null)}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs tracking-wide transition-colors"
              >
                Place Another Order
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Utensils className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our wood-fired hearth menu and handmade pastas to curate your meal.
              </p>
              <button
                id="cart-browse-menu-btn"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Items & Checkout Form */
            <>
              {/* Order Mode Switcher */}
              <div className="bg-stone-100 p-1 rounded-xl flex">
                <button
                  type="button"
                  id="order-mode-pickup-btn"
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    orderType === 'pickup'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Takeout Pickup
                </button>
                <button
                  type="button"
                  id="order-mode-dinein-btn"
                  onClick={() => setOrderType('dine-in')}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                    orderType === 'dine-in'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Dine-In Table Order
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div key={item.dish.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-stone-900 text-sm leading-tight truncate">
                          {item.dish.name}
                        </h4>
                        <span className="font-serif font-bold text-stone-900 text-sm shrink-0">
                          ${(item.dish.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-2">
                        ${item.dish.price} each
                      </p>

                      {item.specialInstructions && (
                        <p className="text-[11px] text-amber-800 italic bg-amber-50 px-2 py-0.5 rounded-md mb-2">
                          Note: {item.specialInstructions}
                        </p>
                      )}

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-white">
                          <button
                            id={`drawer-qty-minus-${item.dish.id}`}
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="p-1 text-stone-500 hover:bg-stone-100"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            id={`drawer-qty-plus-${item.dish.id}`}
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="p-1 text-stone-500 hover:bg-stone-100"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          id={`drawer-remove-item-${item.dish.id}`}
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details Form */}
              <form id="order-checkout-form" onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  {orderType === 'pickup' ? 'Guest & Pickup Info' : 'Table & Contact Info'}
                </span>

                {orderType === 'dine-in' ? (
                  <div>
                    <label htmlFor="order-table-number" className="block text-xs font-medium text-stone-600 mb-1">
                      Table Number *
                    </label>
                    <input
                      id="order-table-number"
                      type="text"
                      required
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 14 or Hearth Bar 4"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="order-pickup-time" className="block text-xs font-medium text-stone-600 mb-1">
                      Requested Pickup Time
                    </label>
                    <select
                      id="order-pickup-time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="ASAP (~25 mins)">ASAP (~25 mins)</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <option value="Scheduled this evening (6:30 PM)">This evening (6:30 PM)</option>
                      <option value="Scheduled tonight (7:30 PM)">Tonight (7:30 PM)</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="order-cust-name" className="block text-xs font-medium text-stone-600 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="order-cust-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Miller"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-cust-phone" className="block text-xs font-medium text-stone-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="order-cust-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(415) 555-0123"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals and Submit */}
        {!placedOrder && cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-serif text-lg text-stone-950">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="order-checkout-form"
              id="submit-takeout-order-btn"
              className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Place Order • ${total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
