import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";

export interface Location {
  id: string;
  city: string;
  country: string;
}

export const locationService = {
  create: async (data: Partial<Location>) => {
    const response = await apiClient.post(`/locations`, data);
    return response;
  },
  
  findAll: async (search?: string, page?: number, limit?: number) => {
    return await apiClient.get(`/locations`, {
      params: { search, page, limit },
    });
  },

  findOne: async (id: string) => {
    const response = await apiClient.get(`/locations/${id}`);
    return response;
  },

  
  update: async (id: string, data: Partial<Location>) => {
    const response = await apiClient.patch(`/locations/${id}`, data);
    return response;
  },

  remove: async (id: string) => {
    const response = await apiClient.delete(`/locations/${id}`);
    return response;
  },
};

// Server-side Fetch Functions
export const getLocationsServer = (country?: string) => serverFetch("/locations", { query: { country } });
export const getLocationServer = (id: string) => serverFetch(`/locations/${id}`);
