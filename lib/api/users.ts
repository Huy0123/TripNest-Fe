/**
 * Users API
 * Handles all user-related API calls
 */

import { apiGet } from './client';
import { User, UserProfile, UsersResponse } from '@/types/api/user';

/**
 * Get current user profile
 * No cache - user-specific data
 */
export async function getCurrentUser(): Promise<UserProfile> {
  return apiGet<UserProfile>('/users/me', {
    cache: 'no-store',
    tags: ['user'],
  });
}

/**
 * Get user by ID
 * No cache - user data can change
 */
export async function getUserById(id: string): Promise<UserProfile> {
  return apiGet<UserProfile>(`/users/${id}`, {
    cache: 'no-store',
    tags: ['user', `user-${id}`],
  });
}

/**
 * Get all users (Admin only)
 * No cache - admin needs fresh data
 */
export async function getAllUsers(
  page: number = 1,
  limit: number = 10
): Promise<UsersResponse> {
  return apiGet<UsersResponse>(`/admin/users?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    tags: ['admin', 'users'],
  });
}

/**
 * Get user's favorites
 * No cache - favorites can change frequently
 */
export async function getUserFavorites(): Promise<string[]> {
  return apiGet<string[]>('/users/me/favorites', {
    cache: 'no-store',
    tags: ['user', 'favorites'],
  });
}
