/**
 * Authentication Server Actions
 * Handle auth mutations with cookies
 */

'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login, register, logout, requestPasswordReset, resetPassword } from '@/lib/api/auth';
import { LoginCredentials, RegisterData, ResetPasswordRequest, ResetPasswordConfirm } from '@/types/api/auth';

// Cookie configuration
const COOKIE_NAME = 'auth_token';
const REFRESH_COOKIE_NAME = 'refresh_token';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: '/',
};

/**
 * Login action
 */
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validation
  if (!email || !password) {
    return {
      error: 'Email and password are required',
    };
  }

  if (!email.includes('@')) {
    return {
      error: 'Invalid email format',
    };
  }

  try {
    const credentials: LoginCredentials = { email, password };
    const response = await login(credentials);

    // Set auth cookies
    cookies().set(COOKIE_NAME, response.token, COOKIE_OPTIONS);
    
    if (response.refreshToken) {
      cookies().set(REFRESH_COOKIE_NAME, response.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30, // 30 days for refresh token
      });
    }

    // Redirect based on role
    if (response.user.role === 'admin') {
      redirect('/admin');
    } else {
      redirect('/profile');
    }
  } catch (error: any) {
    return {
      error: error.message || 'Login failed. Please check your credentials.',
    };
  }
}

/**
 * Register action
 */
export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const passwordConfirmation = formData.get('passwordConfirmation') as string;

  // Validation
  if (!name || !email || !password || !passwordConfirmation) {
    return {
      error: 'All fields are required',
    };
  }

  if (!email.includes('@')) {
    return {
      error: 'Invalid email format',
    };
  }

  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }

  if (password !== passwordConfirmation) {
    return {
      error: 'Passwords do not match',
    };
  }

  try {
    const data: RegisterData = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    const response = await register(data);

    // Set auth cookies
    cookies().set(COOKIE_NAME, response.token, COOKIE_OPTIONS);
    
    if (response.refreshToken) {
      cookies().set(REFRESH_COOKIE_NAME, response.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    // Redirect to profile or onboarding
    redirect('/profile');
  } catch (error: any) {
    return {
      error: error.message || 'Registration failed. Please try again.',
    };
  }
}

/**
 * Logout action
 */
export async function logoutAction() {
  try {
    // Call backend logout (optional - invalidates refresh token)
    await logout().catch(() => {
      // Ignore logout API errors
    });

    // Clear cookies
    cookies().delete(COOKIE_NAME);
    cookies().delete(REFRESH_COOKIE_NAME);

    redirect('/signin');
  } catch (error) {
    // Still clear cookies even if API fails
    cookies().delete(COOKIE_NAME);
    cookies().delete(REFRESH_COOKIE_NAME);
    redirect('/signin');
  }
}

/**
 * Request password reset action
 */
export async function requestPasswordResetAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return {
      error: 'Valid email is required',
    };
  }

  try {
    const data: ResetPasswordRequest = { email };
    const response = await requestPasswordReset(data);

    return {
      success: true,
      message: response.message || 'Password reset email sent. Please check your inbox.',
    };
  } catch (error: any) {
    return {
      error: error.message || 'Failed to send reset email',
    };
  }
}

/**
 * Reset password action
 */
export async function resetPasswordAction(prevState: any, formData: FormData) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;
  const passwordConfirmation = formData.get('passwordConfirmation') as string;

  if (!token || !password || !passwordConfirmation) {
    return {
      error: 'All fields are required',
    };
  }

  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long',
    };
  }

  if (password !== passwordConfirmation) {
    return {
      error: 'Passwords do not match',
    };
  }

  try {
    const data: ResetPasswordConfirm = {
      token,
      password,
      passwordConfirmation,
    };

    await resetPassword(data);

    redirect('/signin?reset=success');
  } catch (error: any) {
    return {
      error: error.message || 'Failed to reset password',
    };
  }
}

/**
 * Get current auth token from cookies
 * Use this in middleware or server components
 */
export async function getAuthToken(): Promise<string | undefined> {
  return cookies().get(COOKIE_NAME)?.value;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}
