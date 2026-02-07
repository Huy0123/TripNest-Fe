/**
 * User API Type Definitions
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  address?: Address;
  preferences?: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface UserPreferences {
  newsletter: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  currency: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nationality?: string;
  address?: Address;
  preferences?: UserPreferences;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}
