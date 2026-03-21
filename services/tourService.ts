import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import type { Tour, ToursQueryDto } from "@/types/tours";

// Client-side & Mutation Service
export const tourService = {
  findAll: async (query?: ToursQueryDto): Promise<{ data: Tour[]; total: number }> => {
    return apiClient.get(`/tours`, { params: query });
  },

  findOne: async (id: string): Promise<Tour> => {
    return apiClient.get(`/tours/${id}`);
  },

  findByDiscount: async (): Promise<Tour[]> => {
    return apiClient.get(`/tours/discount`);
  },

  create: async (data: any): Promise<Tour> => {
    return apiClient.post(`/tours`, data);
  },

  update: async (id: string, data: any): Promise<Tour> => {
    return apiClient.patch(`/tours/${id}`, data);
  },

  remove: async (id: string): Promise<void> => {
    return apiClient.delete(`/tours/${id}`);
  },

  uploadImage: async (id: string, file: File): Promise<Tour> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.patch(`/tours/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Server-side Fetch Functions
export const getToursServer = (query?: ToursQueryDto) => serverFetch("/tours", { query });
export const getTourByIdServer = (id: string) => serverFetch(`/tours/${id}`);
export const getDiscountedToursServer = () => serverFetch("/tours/discount");
