export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'chef-pick' | 'organic';

export type MenuCategory = 
  | 'all'
  | 'starters'
  | 'mains'
  | 'pastas'
  | 'specials'
  | 'desserts'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  description: string;
  price: number;
  image: string;
  dietary: DietaryTag[];
  calories?: number;
  prepTimeMinutes?: number;
  pairing?: string;
  ingredients: string[];
  allergens?: string[];
  isPopular?: boolean;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export type SeatingArea = 
  | 'main-dining'
  | 'hearth-counter'
  | 'patio-garden'
  | 'wine-cellar';

export type DiningOccasion = 
  | 'casual'
  | 'birthday'
  | 'anniversary'
  | 'business'
  | 'date-night'
  | 'celebration';

export interface Reservation {
  id: string;
  confirmationCode: string;
  guestName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: SeatingArea;
  occasion: DiningOccasion;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  orderType: 'pickup' | 'dine-in';
  pickupTime: string;
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  specialInstructions?: string;
  subtotal: number;
  tax: number;
  total: number;
  placedAt: string;
  status: 'received' | 'preparing' | 'ready' | 'completed';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  dishRecommended: string;
  verifiedGuest: boolean;
}
