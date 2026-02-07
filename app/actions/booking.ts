/**
 * Booking Server Actions
 * Handle booking mutations with revalidation
 */

'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { apiPost } from '@/lib/api/client';
import { CreateBookingData, Booking } from '@/types/api/booking';

export async function createBooking(
  prevState: any,
  formData: FormData
) {
  const tourId = formData.get('tourId') as string;
  const guests = parseInt(formData.get('guests') as string);
  const departureDate = formData.get('departureDate') as string;
  const customerName = formData.get('customerName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  // Basic validation
  if (!tourId || !guests || !departureDate || !customerName || !email || !phone) {
    return {
      error: 'All fields are required',
    };
  }

  try {
    const bookingData: CreateBookingData = {
      tourId,
      departureDate,
      guests,
      customerName,
      email,
      phone,
      guestDetails: [], // Will be collected in next step
    };

    const booking = await apiPost<Booking>('/bookings', bookingData);

    // Revalidate affected pages
    revalidateTag('bookings');
    revalidateTag(`tour-${tourId}`); // Update tour availability
    revalidatePath('/bookings');

    // Redirect to booking confirmation
    redirect(`/bookings/${booking.id}`);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Booking failed. Please try again.',
    };
  }
}

export async function cancelBooking(bookingId: string) {
  try {
    await apiPost(`/bookings/${bookingId}/cancel`, {});

    revalidateTag('bookings');
    revalidateTag(`booking-${bookingId}`);
    revalidatePath('/bookings');

    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Cancellation failed',
    };
  }
}
