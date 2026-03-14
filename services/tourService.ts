import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";

interface Tour {
  id: string;
  name: string;
  price: number;
  discount?: number;
  duration: number;
  departureLocationId: string;
  stayOption: string;
  guideService: string [];
  destinationIds: string[];
  detail?: {
    moreInfo?: {
      title: string,
      subtitle?: string;
      items: string[];
    }[];
    experience?: string;
    itinerary?: {
      day: string,
      title: string,
      description: string
    }[];
    description?: string;
  }
}

export interface ToursQuery {
  page?: number;
  limit?: number;
  search?: string;
  destinationSearch?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// Client-side & Mutation Service
export const tourService = {
  findAll: async (destinationSearch?: string, page?: number, limit?: number) => {
    return apiClient.get(`/tours`, { params: { destinationSearch, page, limit } });
  },

  findOne: async (id: string) => {
    return apiClient.get(`/tours/${id}`);
  },

  findByDiscount: async () => {
    return apiClient.get(`/tours/discount`);
  },

  create: async (data: Partial<Tour>) => {
    return apiClient.post(`/tours`, data);
  },

  update: async (id: string, data: Partial<Tour>) => {
    return apiClient.patch(`/tours/${id}`, data);
  },

  remove: async (id: string) => {
    return apiClient.delete(`/tours/${id}`);
  },

  uploadImage: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.patch(`/tours/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Server-side Fetch Functions
export const getToursServer = (query?: ToursQuery) => serverFetch("/tours", { query });
export const getTourDetailServer = (id: string) => serverFetch(`/tours/${id}`);
export const getDiscountedToursServer = () => serverFetch("/tours/discount");
