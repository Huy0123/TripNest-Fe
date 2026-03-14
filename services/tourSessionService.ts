import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { DepartureStatus } from "@/types/tour-session";


export interface TourSession {
  tourId: string;
  startDate: string;
  capacity: number;
  status?: DepartureStatus;
  adultPrice: number;
  childrenPrice?: number;
  discount?: number;
}

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
  findAll: async (query?: { available?: boolean; upcoming?: number }) => {
    return apiClient.get(`/tour-sessions`, { params: query });
  },

  findOne: async (id: string) => {
    return apiClient.get(`/tour-sessions/${id}`);
  },

  findByTour: async (tourId: string) => {
    return apiClient.get(`/tour-sessions/tour/${tourId}`);
  },

  create: async (data: Partial<TourSession>) => {
    return apiClient.post(`/tour-sessions`, data);
  },

  bulkCreate: async (data: TourSessionBulkCreateConfig) => {
    return apiClient.post(`/tour-sessions/bulk`, data);
  },

  update: async (id: string, data: Partial<TourSession>) => {
    return apiClient.patch(`/tour-sessions/${id}`, data);
  },

  remove: async (id: string) => {
    return apiClient.delete(`/tour-sessions/${id}`);
  },
};

// Server-side Fetch Functions
export const getTourSessionsServer = (query?: { available?: boolean; upcoming?: number }) => 
    serverFetch("/tour-sessions", { query });

export const getTourSessionServer = (id: string) => serverFetch(`/tour-sessions/${id}`);

export const getTourSessionsByTourServer = (tourId: string) => 
    serverFetch(`/tour-sessions/tour/${tourId}`);
