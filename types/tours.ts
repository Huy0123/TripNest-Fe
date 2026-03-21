import { Location } from './location';
import { TourDetail } from './tour-detail';
export enum StayOption {
  HOTEL = 'HOTEL',
  LODGE = 'LODGE',
  RESORT = 'RESORT',
  INN = 'INN',
  HOMESTAY = 'HOMESTAY',
}

export interface Tour {
  id: string;
  name: string;
  duration: number;
  price: number;
  discount: number;
  guideService: string[];
  stayOption: StayOption;
  image?: string;
  imagePublicId?: string;
  rating: number;
  reviewCount: number;
  departureLocation?: Location;
  destinations: Location[];
  detail?: TourDetail;
  createdAt: string;
  updatedAt: string;
}

export interface ToursQueryDto {
  minPrice?: number;
  maxPrice?: number;
  destinationId?: string;
  destinationSearch?: string;
  departureLocationId?: string;
  rating?: number;
  duration?: number;
  stayOption?: StayOption;
  sortBy?: 'price' | 'rating' | 'createdAt';
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  page?: number;
  limit?: number;
}
