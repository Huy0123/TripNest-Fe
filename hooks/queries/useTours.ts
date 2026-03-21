import useSWR from 'swr';
import { tourService } from '@/services/tourService';
import { tourDetailService } from '@/services/tourDetailService';
import { Tour } from '@/types/tours';

export function useTours(searchQuery: string = '', page: number = 1, limit: number = 10) {
  const { data, error, isLoading, mutate } = useSWR(
    ['/tours', searchQuery, page, limit],
    async () => {
      const response = await tourService.findAll({ search: searchQuery, page, limit });
      const isPaginated = !Array.isArray(response) && response?.data;
      
      return {
        tours: isPaginated ? response.data : (Array.isArray(response) ? response : []),
        total: isPaginated ? (response as any).total : (Array.isArray(response) ? response.length : 0),
      };
    }
  );

  return {
    tours: (data?.tours as Tour[]) || [],
    total: data?.total || 0,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useTour(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/tours/${id}` : null,
    async () => {
      const [tourRes, detailRes] = await Promise.all([
        tourService.findOne(id).catch(() => null),
        tourDetailService.findByTourId(id).catch(() => null)
      ]);
      
      const tour = (tourRes as any)?.data || tourRes;
      const detail = (detailRes as any)?.data || detailRes;
      
      if (tour && detail) {
        tour.detail = detail;
      }
      
      return tour;
    }
  );

  return {
    tour: data as Tour | undefined,
    isLoading,
    isError: error,
    mutate,
  };
}
