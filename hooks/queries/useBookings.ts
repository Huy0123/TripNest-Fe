import useSWR from 'swr';
import { bookingService } from '@/services/bookingService';
import { Booking } from '@/types/booking';

/**
 * Lấy danh sách booking của user hiện tại (hoặc filter theo trạng thái).
 */
export function useMyBookings(status?: string) {
  const key = status ? `/bookings?status=${status}` : '/bookings';

  const { data, error, isLoading, mutate } = useSWR<Booking[]>(
    key,
    async () => {
      const response = await bookingService.findAll(status ? { status } : undefined);
      if (Array.isArray(response)) return response;
      return (response as any)?.data || [];
    }
  );

  return {
    bookings: data || [],
    isLoading,
    isError: !!error,
    mutate,
  };
}

/**
 * Lấy chi tiết một booking theo ID.
 */
export function useBooking(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<Booking>(
    id ? `/bookings/${id}` : null,
    async () => {
      const response = await bookingService.findOne(id!);
      return (response as any)?.data || response;
    }
  );

  return {
    booking: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}
