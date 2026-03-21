import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { TourSession, CreateTourSessionDto } from "@/types/tour-session";

export interface TourSessionBulkCreateConfig {
  tourId: string;
  startDateRange: string;
  endDateRange: string;
  daysOfWeek: number[];
  capacity: number;
  adultPrice: number;
  childrenPrice?: number;
  discount?: number;
}

// Client-side & Mutation Service
export const tourSessionService = {
  findAll: async (query?: { mode?: 'AVAILABLE' | 'UPCOMING'; days?: number }): Promise<TourSession[]> => {
    return apiClient.get(`/tour-sessions`, { params: query });
  },

  findOne: async (id: string): Promise<TourSession> => {
    return apiClient.get(`/tour-sessions/${id}`);
  },

  findByTourId: async (tourId: string): Promise<TourSession[]> => {
    return apiClient.get(`/tour-sessions/tour/${tourId}`);
  },

  create: async (data: CreateTourSessionDto): Promise<TourSession> => {
    return apiClient.post(`/tour-sessions`, data);
  },

  bulkCreate: async (data: TourSessionBulkCreateConfig): Promise<{ count: number; sessions: TourSession[] }> => {
    return apiClient.post(`/tour-sessions/bulk`, data);
  },

  update: async (id: string, data: any): Promise<TourSession> => {
    return apiClient.patch(`/tour-sessions/${id}`, data);
  },

  remove: async (id: string): Promise<void> => {
    return apiClient.delete(`/tour-sessions/${id}`);
  },
};

// Server-side Fetch Functions
export const getTourSessionsServer = (query?: { mode?: 'AVAILABLE' | 'UPCOMING'; days?: number }) => 
    serverFetch("/tour-sessions", { query });

export const getTourSessionServer = (id: string) => serverFetch(`/tour-sessions/${id}`);

export const getTourSessionsByTourServer = (tourId: string) => 
    serverFetch(`/tour-sessions/tour/${tourId}`);
