export interface TourDetail {
  id: string;
  tourId: string;
  description?: string;
  experience?: string;
  itinerary?: TourItinerary[];
  inclusions?: string[];
  exclusions?: string[];
  images?: TourImage[];
}

export interface TourItinerary {
  day: string;
  title: string;
  description?: string;
}



export interface TourImage {
  url: string;
  publicId: string;
}
