/**
 * Tour API Type Definitions
 */

export interface DepartureDate {
  start: string;
  end: string;
}

export interface TourDuration {
  days: number;
  nights: number;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  duration: TourDuration;
  departureDates: DepartureDate[];
  hotelName?: string;
  stars?: number;
  onlyLeft?: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation?: string;
}

export interface TourDetails extends Tour {
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  cancellationPolicy: string;
  requirements: string[];
  maxGroupSize?: number;
  minAge?: number;
  difficulty?: 'easy' | 'moderate' | 'challenging' | 'expert';
  languages: string[];
}

export interface TourFilters {
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  tags?: string[];
  duration?: number;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'popular';
  page?: number;
  limit?: number;
}

export interface ToursResponse {
  tours: Tour[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
