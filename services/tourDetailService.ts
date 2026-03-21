import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { TourDetail } from "@/types/tour-detail";

export const tourDetailService = {
  create: async (data: any): Promise<TourDetail> => {
    return apiClient.post('/tour-details', data);
  },
  findAll: async (): Promise<TourDetail[]> => {
    return apiClient.get('/tour-details');
  },
  findOne: async (id: string): Promise<TourDetail> => {
    return apiClient.get(`/tour-details/${id}`);
  },
  findByTourId: async (tourId: string): Promise<TourDetail> => {
    return apiClient.get(`/tour-details/by-tour/${tourId}`);
  },
  remove: async (id: string): Promise<void> => {
    return apiClient.delete(`/tour-details/${id}`);
  },
  uploadImages: async (id: string, files: File[]): Promise<TourDetail> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return apiClient.patch(`/tour-details/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  uploadVideo: async (id: string, file: File): Promise<TourDetail> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.patch(`/tour-details/${id}/videos`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteImage: async (id: string, publicId: string): Promise<void> => {
    return apiClient.delete(`/tour-details/${id}/images/${publicId}`);
  },

  update: async (id: string, data: any): Promise<TourDetail> => {
    return apiClient.patch(`/tour-details/${id}`, data);
  },
};

// Server-side Fetch Functions
export const getTourDetailByIdServer = (id: string) => serverFetch(`/tour-details/${id}`);
export const getTourDetailByTourIdServer = (tourId: string) => serverFetch(`/tour-details/by-tour/${tourId}`);
