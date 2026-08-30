export interface WaffleBase {
  id: string;
  name: string;
  description: string;
  price: number;
  color?: string;
  badge?: string;
  texture?: string;
  icon?: string;
  calories?: number;
}

export interface SauceDip {
  id: string;
  name: string;
  description: string;
  price: number;
  colorHex?: string;
  color?: string;
  textColor?: string;
  flavorProfile?: string;
  cocoaPercent?: string;
  badge?: string;
  calories?: number;
}

export interface Topping {
  id: string;
  name: string;
  description: string;
  price: number;
  crunchLevel?: 'Light' | 'Medium' | 'Super Crunchy' | 'Chewy';
  icon: string;
  calories?: number;
}

export interface DrizzleExtra {
  id: string;
  name: string;
  description: string;
  price: number;
  color?: string;
  calories?: number;
}

export interface CustomDripStick {
  base: WaffleBase;
  sauce: SauceDip;
  toppings: Topping[];
  drizzle?: DrizzleExtra;
  specialInstructions?: string;
}

export interface ShowStopperProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  base: WaffleBase;
  sauce: SauceDip;
  toppings: Topping[];
  drizzle?: DrizzleExtra;
  badge: string;
  image: string;
  calories: number;
  isPopular?: boolean;
  category?: 'all' | 'fruity' | 'chocolate' | 'nutty' | 'caramel';
  pastelTheme?: {
    cardBg: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    accent: string;
  };
}

export interface Outlet {
  id: string;
  name: string;
  city: string;
  area?: string;
  address: string;
  landmark?: string;
  timing?: string;
  timings?: string;
  phone: string;
  rating: number;
  reviews?: number;
  isNew?: boolean;
  coordinates?: { lat: number; lng: number };
  features?: string[];
  isOpen?: boolean;
  image?: string;
  mapUrl?: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  minGuests: number;
  maxGuests?: number;
  basePrice?: number;
  pricePerStick?: number;
  pricePerPerson?: number;
  description?: string;
  features: string[];
  idealFor?: string;
  isPopular?: boolean;
  includesChef?: boolean;
}

export interface CateringInquiry {
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  eventType: 'Birthday Party' | 'Wedding / Sangeet' | 'College Fest' | 'Corporate' | 'Other';
  city: string;
  packageId: string;
  specialRequests?: string;
}

export interface FranchiseTier {
  id: string;
  name: string;
  spaceRequired: string;
  investment: string;
  roiPeriod: string;
  profitMargin: string;
  description: string;
  features: string[];
}

export interface FranchiseInquiry {
  fullName: string;
  email: string;
  phone: string;
  targetCity: string;
  investmentBudget: string;
  foodServiceExperience: string;
  hasCommercialSpace: boolean;
  tierId: string;
}

export interface CartItem {
  id: string;
  type?: 'custom' | 'showstopper';
  title: string;
  subtitle: string;
  price?: number;
  totalPrice?: number;
  quantity: number;
  image?: string;
  isCustom?: boolean;
  customDetails?: CustomDripStick;
  specialNotes?: string;
}

export interface SocialPost {
  id: string;
  username?: string;
  author?: string;
  handle?: string;
  avatar?: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  tags?: string[];
  type?: 'reel' | 'photo';
  verified?: boolean;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  city: string;
  text: string;
  rating: number;
  date: string;
  favoriteCombo: string;
}

export interface MatchmakerQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    icon: string;
    tag: string;
  }[];
}
