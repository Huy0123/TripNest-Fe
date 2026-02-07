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
  fullName: string;
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
