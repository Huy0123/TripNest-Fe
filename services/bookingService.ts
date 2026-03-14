import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  sessionId: string;
  promotionId?: string;
  numberOfPeople: number;
  totalPrice: number;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  tour?: any;
  session?: any;
  user?: any;
}

export const bookingService = {
  findAll: async (query?: { status?: string; userId?: string }) => {
    return apiClient.get(`/bookings`, { params: query });
  },

  findOne: async (id: string) => {
    return apiClient.get(`/bookings/${id}`);
  },

  create: async (data: Partial<Booking>) => {
    return apiClient.post(`/bookings`, data);
  },

  update: async (id: string, data: Partial<Booking>) => {
    return apiClient.patch(`/bookings/${id}`, data);
  },

  remove: async (id: string) => {
    return apiClient.delete(`/bookings/${id}`);
  },
};

export const getBookingsServer = (query?: any) => serverFetch("/bookings", { query });
export const getBookingServer = (id: string) => serverFetch(`/bookings/${id}`);
