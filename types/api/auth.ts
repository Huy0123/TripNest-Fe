/**
 * Authentication API Type Definitions
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'admin';
  emailVerified: boolean;
  createdAt: string;
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
