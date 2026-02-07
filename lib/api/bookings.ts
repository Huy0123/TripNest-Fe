/**
 * Bookings API
 * Handles all booking-related API calls
 */

import { apiGet } from './client';
import { Booking, BookingDetails, BookingsResponse } from '@/types/api/booking';

/**
 * Get user's bookings
 * No cache - always fresh user data
 */
export async function getUserBookings(): Promise<Booking[]> {
  return apiGet<Booking[]>('/bookings/me', {
    cache: 'no-store',
    tags: ['bookings'],
  });
}

/**
 * Get booking by ID
 * No cache - real-time status
 */
export async function getBookingById(id: string): Promise<BookingDetails> {
  return apiGet<BookingDetails>(`/bookings/${id}`, {
    cache: 'no-store',
    tags: ['bookings', `booking-${id}`],
  });
}

/**
 * Get all bookings (Admin only)
 * No cache - admin needs fresh data
 */
export async function getAllBookings(
  page: number = 1,
  limit: number = 10
): Promise<BookingsResponse> {
  return apiGet<BookingsResponse>(`/admin/bookings?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    tags: ['admin', 'bookings'],
  });
}

/**
 * Check tour availability
 * No cache - real-time availability
 */
export async function checkTourAvailability(
  tourId: string,
  date: string
): Promise<{ available: boolean; spotsLeft: number }> {
  return apiGet(`/tours/${tourId}/availability?date=${date}`, {
    cache: 'no-store',
  });
}
