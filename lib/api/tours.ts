/**
 * Tours API
 * Handles all tour-related API calls
 */

import { apiGet } from './client';
import { Tour, TourDetails, TourFilters, ToursResponse } from '@/types/api/tour';

/**
 * Get all tours with optional filters
 * Cached for 5 minutes
 */
export async function getTours(filters?: TourFilters): Promise<ToursResponse> {
  const params = new URLSearchParams();
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/tours?${queryString}` : '/tours';

  return apiGet<ToursResponse>(endpoint, {
    revalidate: 300, // 5 minutes cache
    tags: ['tours'],
  });
}

/**
 * Get tour by ID
 * Cached for 10 minutes
 */
export async function getTourById(id: string): Promise<TourDetails> {
  return apiGet<TourDetails>(`/tours/${id}`, {
    revalidate: 600, // 10 minutes cache
    tags: ['tours', `tour-${id}`],
  });
}

/**
 * Search tours by query
 * Short cache (1 minute)
 */
export async function searchTours(query: string): Promise<Tour[]> {
  return apiGet<Tour[]>(`/tours/search?q=${encodeURIComponent(query)}`, {
    revalidate: 60, // 1 minute cache
    tags: ['tours', 'search'],
  });
}

/**
 * Get featured tours
 * Cached for 5 minutes
 */
export async function getFeaturedTours(): Promise<Tour[]> {
  return apiGet<Tour[]>('/tours/featured', {
    revalidate: 300,
    tags: ['tours', 'featured'],
  });
}

/**
 * Get popular tours
 * Cached for 5 minutes
 */
export async function getPopularTours(limit: number = 10): Promise<Tour[]> {
  return apiGet<Tour[]>(`/tours/popular?limit=${limit}`, {
    revalidate: 300,
    tags: ['tours', 'popular'],
  });
}

/**
 * Get tours by destination
 * Cached for 5 minutes
 */
export async function getToursByDestination(destination: string): Promise<Tour[]> {
  return apiGet<Tour[]>(`/tours/destination/${destination}`, {
    revalidate: 300,
    tags: ['tours', `destination-${destination}`],
  });
}
