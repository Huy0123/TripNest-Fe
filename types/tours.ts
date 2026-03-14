export enum StayOption {
  HOTELS = 'HOTEL',
  LODGES = 'LODGE',
  RESORTS = 'RESORT',
  INNS = 'INN'
}

export interface TourImage {
  url: string;
  publicId: string;
}

export interface ItineraryItem {
  day: string;
  title: string;
  description?: string;
}

export interface MoreInfo {
  title: string;
  subtitle?: string;
  items: string[];
}

export interface TourDetail {
  moreInfo?: MoreInfo[];
  experience?: string;
  itinerary?: ItineraryItem[];
  description?: string;
  images?: TourImage[];
  video?: {
    url: string;
    publicId: string;
  };
}

export interface Tour {
  id: string;
  name: string;
  duration: number;
  guideService: string[];
  image?: string;
  price: number;
  discount?: number;
  rating?: number;
  departureLocationId: string;
  stayOption: StayOption;
  destinationIds: string[];
  detail: TourDetail;
  createdAt: string;
  updatedAt: string;
}
