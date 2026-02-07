/**
 * Authentication API
 * Handles all auth-related API calls
 */

import { apiPost, apiGet } from './client';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  RefreshTokenResponse,
  ResetPasswordRequest,
  ResetPasswordConfirm,
  VerifyEmailData,
  AuthUser,
} from '@/types/api/auth';

/**
 * Login user
 * No cache - auth endpoints should never be cached
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/login', credentials, {
    cache: 'no-store',
  });
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  return apiPost<AuthResponse>('/auth/register', data, {
    cache: 'no-store',
  });
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  return apiPost<void>('/auth/logout', {}, {
    cache: 'no-store',
  });
}

/**
 * Refresh access token using refresh token
 */
export async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
  return apiPost<RefreshTokenResponse>('/auth/refresh', { refreshToken }, {
    cache: 'no-store',
  });
}

/**
 * Get current authenticated user
 */
export async function getCurrentAuthUser(): Promise<AuthUser> {
  return apiGet<AuthUser>('/auth/me', {
    cache: 'no-store',
  });
}

/**
 * Request password reset email
 */
export async function requestPasswordReset(data: ResetPasswordRequest): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/forgot-password', data, {
    cache: 'no-store',
  });
}

/**
 * Reset password with token
 */
export async function resetPassword(data: ResetPasswordConfirm): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/reset-password', data, {
    cache: 'no-store',
  });
}

/**
 * Verify email with token
 */
export async function verifyEmail(data: VerifyEmailData): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/verify-email', data, {
    cache: 'no-store',
  });
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/resend-verification', { email }, {
    cache: 'no-store',
  });
}
