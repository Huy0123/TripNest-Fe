import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { Review, CreateReviewDto } from "@/types/review";

export const reviewService = {
  findAll: async (tourId?: string): Promise<Review[]> => {
    return apiClient.get(`/reviews`, { params: { tourId } });
  },

  findOne: async (id: string): Promise<Review> => {
    return apiClient.get(`/reviews/${id}`);
  },

  create: async (data: any): Promise<Review> => {
    return apiClient.post('/reviews', data);
  },

  update: async (id: string, data: any): Promise<Review> => {
    return apiClient.patch(`/reviews/${id}`, data);
  },

  remove: async (id: string): Promise<void> => {
    return apiClient.delete(`/reviews/${id}`);
  }
};

// Server-side Fetch Functions
export const getReviewsByTourIdServer = (tourId: string) => serverFetch(`/reviews`, { query: { tourId } });
