export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface Tour {
  id: string;
  title: string;
  destination: string;
  duration: number;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  includedServices: string[];
  startDate: string;
  endDate: string;
  starHotel: number;
  amenities: string[];
  nights: number;
  isSale?: boolean;
  tourStyle?: string[];
}

export interface TourFilters {
  styles: string[];
  priceRange: {
    min: number;
    max: number;
  };
  length: {
    min: number;
    max: number;
  };
  destinations: string[];
  stayRating: number;
  stayOptions: string[];
  accessibility: string[];
  guests: {
    adults: number;
    children: number;
    ageRange: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}


export interface SliderItem {
  id: number;
  title: string;
  image: string;
  rating: number;
  dateRange: string;
  price: number;
  isGuestFavorite: boolean;
  originalPrice?: number;
  discount?: number;
}

// data/auth.ts
export interface AuthSlide {
  image: string;
  title: string;
  subtitle: string;
}

// data/navigation.ts
export interface NavLink {
  name: string;
  href: string;
}

export interface DestinationGroup {
  id: string;
  name: string;
  image: string;
  items: NavLink[];
}

export interface PackageGroup {
  id: string;
  name: string;
  image: string;
  items: NavLink[];
}

export interface HeroDestination {
  id: number;
  name: string;
  image: string;
}
