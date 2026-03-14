import apiClient from "@/lib/api-client";

export interface PaymentUrlRequest {
  bookingId: string;
  amount: number;
  bankCode?: string;
  language?: string;
}

export const paymentService = {
  createVNPayUrl: async (data: PaymentUrlRequest) => {
    // This calls the backend to generate the VNPay URL
    return apiClient.post(`/payments/vnpay/create-url`, data);
  },

  verifyVNPayPayment: async (queryParams: Record<string, string>) => {
    // This calls the backend to verify the hashes and update booking status
    return apiClient.get(`/payments/vnpay/callback`, { params: queryParams });
  },
};
