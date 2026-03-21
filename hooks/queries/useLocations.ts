import useSWR from 'swr';
import { locationService } from '@/services/locationService';
import { Location } from '@/types/location';

export function useLocations(fallbackData?: Location[]) {
  const { data, error, isLoading, mutate } = useSWR(
    'locations',
    async () => {
      const response = await locationService.findAll();
      // Ensure we extract the data array if wrapped in an axios response
      if (Array.isArray(response)) return response;
      return (response as any)?.data || [];
    },
    {
      fallbackData,
    }
  );

  return {
    locations: (data as Location[]) || [],
    isLoading,
    isError: error,
    mutate,
  };
}
