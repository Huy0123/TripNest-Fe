import useSWR from 'swr';
import { tourSessionService } from '@/services/tourSessionService';
import { TourSession } from '@/types/tour-session';

export function useTourSessionsByTour(tourId: string, fallbackData?: TourSession[]) {
  const { data, error, isLoading, mutate } = useSWR(
    tourId ? `/tour-sessions/tour/${tourId}` : null,
    async () => {
      const response = await tourSessionService.findByTourId(tourId);
      if (Array.isArray(response)) return response;
      return (response as any)?.data || [];
    },
    { fallbackData }
  );

  return {
    sessions: (data as TourSession[]) || [],
    isLoading,
    isError: error,
    mutate,
  };
}
