export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  txnRef: string;
  vnpayTxnNo?: string;
  bankCode?: string;
  payDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentUrlDto {
  bookingId: string;
  amount: number;
  locale?: 'vn' | 'en';
}
