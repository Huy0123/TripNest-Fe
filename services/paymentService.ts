import api from '@/lib/api-client';
import { CreatePaymentUrlDto } from '@/types/payment';

export const paymentService = {
  createPaymentUrl: async (data: CreatePaymentUrlDto): Promise<{ url: string }> => {
    const response = await api.post('/payments/create-url', data);
    return response.data;
  },
};
