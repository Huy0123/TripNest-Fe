import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";
import { CreateBookingDto } from "@/types/booking";

export type { Booking, BookingStatus } from "@/types/booking";

export const bookingService = {
  findAll: async (query?: { status?: string; userId?: string }) => {
    return apiClient.get(`/bookings`, { params: query });
  },

  findOne: async (id: string) => {
    return apiClient.get(`/bookings/${id}`);
  },

  create: async (data: CreateBookingDto) => {
    return apiClient.post(`/bookings`, data);
  },

  cancel: async (id: string) => {
    return apiClient.patch(`/bookings/${id}/cancel`);
  },
};

export const getBookingsServer = (query?: any) => serverFetch("/bookings", { query });
export const getBookingServer = (id: string) => serverFetch(`/bookings/${id}`);
