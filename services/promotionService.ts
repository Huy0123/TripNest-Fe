import apiClient from "@/lib/api-client";
import { serverFetch } from "@/lib/server-fetch";

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export interface Promotion {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// Client-side & Mutation Service
export const promotionService = {
  findAll: async () => {
    return apiClient.get(`/promotions`);
  },

  findOne: async (id: string) => {
    return apiClient.get(`/promotions/${id}`);
  },

  checkCode: async (code: string) => {
    return apiClient.get(`/promotions/check/${code}`);
  },

  create: async (data: Partial<Promotion>) => {
    return apiClient.post(`/promotions`, data);
  },

  update: async (id: string, data: Partial<Promotion>) => {
    return apiClient.patch(`/promotions/${id}`, data);
  },

  remove: async (id: string) => {
    return apiClient.delete(`/promotions/${id}`);
  },
};

// Server-side Fetch Functions
export const getPromotionsServer = () => serverFetch("/promotions");
export const checkPromotionCodeServer = (code: string) => serverFetch(`/promotions/check/${code}`);
