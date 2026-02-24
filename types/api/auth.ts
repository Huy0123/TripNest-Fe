/**
 * Authentication API Type Definitions
 */

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  accessToken?: string;
}

/** Shape của JWT payload user trả về từ BE NestJS */
export interface AuthUser {
  sub: string;       // user id
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  providers?: string[];
  // Alias helpers
  id?: string;
  name?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'customer' | 'admin';
  exp: number;
  iat: number;
}

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  password: string;
  passwordConfirmation: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface VerifyEmailData {
  token: string;
}
