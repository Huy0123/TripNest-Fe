/**
 * Favorite Server Actions
 * Handle favorite tour mutations
 */

'use server';

import { revalidateTag } from 'next/cache';
import { apiPost, apiDelete } from '@/lib/api/client';

export async function toggleFavorite(tourId: string) {
  try {
    // Check if already favorited (would need to fetch from API)
    const isFavorited = false; // Placeholder - should check from backend

    if (isFavorited) {
      await apiDelete(`/users/me/favorites/${tourId}`);
    } else {
      await apiPost(`/users/me/favorites/${tourId}`, {});
    }

    // Revalidate favorites
    revalidateTag('favorites');
    revalidateTag('user');

    return { success: true, isFavorited: !isFavorited };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to update favorites',
    };
  }
}
