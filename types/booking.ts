import { TourSession } from './tour-session';
import { User } from './user';

export enum BookingStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export interface Booking {
  id: string;
  userId: string;
  user?: User;
  sessionId: string;
  session?: TourSession;
  adults: number;
  children: number;
  totalAmount: string | number;
  bookingCode: string;
  status: BookingStatus;
  promoCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingDto {
  sessionId: string;
  tourId: string;
  adults: number;
  children: number;
  promoCode?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}
