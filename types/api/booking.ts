/**
 * Booking API Type Definitions
 */

export interface Booking {
  id: string;
  bookingId: string;
  tourId: string;
  tourTitle: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  guests: number;
  departureDate: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface BookingDetails extends Booking {
  tourDetails: {
    image: string;
    destination: string;
    duration: {
      days: number;
      nights: number;
    };
  };
  guestDetails: GuestInfo[];
  specialRequests?: string;
  paymentDetails?: PaymentInfo;
}

export interface GuestInfo {
  firstName: string;
  lastName: string;
  age: number;
  nationality: string;
  passportNumber?: string;
}

export interface PaymentInfo {
  method: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer';
  transactionId: string;
  paidAt: string;
}

export interface CreateBookingData {
  tourId: string;
  departureDate: string;
  guests: number;
  customerName: string;
  email: string;
  phone: string;
  guestDetails: GuestInfo[];
  specialRequests?: string;
}

export interface BookingsResponse {
  bookings: Booking[];
  total: number;
  page: number;
  limit: number;
}
