export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  phone?: string;
  address?: string;
  birthDate?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
