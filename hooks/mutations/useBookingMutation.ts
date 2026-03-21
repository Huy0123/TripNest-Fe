import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { bookingService } from '@/services/bookingService';
import { CreateBookingDto } from '@/types/booking';

export function useCreateBooking() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createBooking = async (data: CreateBookingDto) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.create(data);
      const result = (response as any)?.data || response;
      await mutate('/bookings');
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Tạo booking thất bại');
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { createBooking, isLoading, error };
}

export function useCancelBooking() {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const cancelBooking = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.cancel(id);
      const result = (response as any)?.data || response;
      // Invalidate specific booking + list cache
      await Promise.all([
        mutate(`/bookings/${id}`),
        mutate('/bookings'),
      ]);
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Hủy booking thất bại');
      setError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { cancelBooking, isLoading, error };
}
