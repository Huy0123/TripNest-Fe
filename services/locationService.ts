import api from '@/lib/api-client';
import { serverFetch } from "@/lib/server-fetch";
import { Location } from '@/types/location';

export const locationService = {
  findAll: async (): Promise<Location[]> => {
    const response = await api.get('/locations');
    return response.data;
  },

  findOne: async (id: string): Promise<Location> => {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  },

  create: async (data: any): Promise<Location> => {
    const response = await api.post('/locations', data);
    return response.data;
  },

  update: async (id: string, data: any): Promise<Location> => {
    const response = await api.patch(`/locations/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/locations/${id}`);
  },
};

export const getLocationsServer = () => serverFetch("/locations");
export const getLocationServer = (id: string) => serverFetch(`/locations/${id}`);
