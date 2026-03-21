import api from '@/lib/api-client';
import { serverFetch } from "@/lib/server-fetch";
import { Promotion, CreatePromotionDto, DiscountType } from '@/types/promotion';

export { DiscountType };

export const promotionService = {
  findAll: async (): Promise<Promotion[]> => {
    const response = await api.get('/promotions');
    return response.data;
  },

  findOne: async (id: string): Promise<Promotion> => {
    const response = await api.get(`/promotions/${id}`);
    return response.data;
  },

  checkCode: async (code: string): Promise<Promotion> => {
    const response = await api.get(`/promotions/check/${code}`);
    return response.data;
  },

  create: async (data: CreatePromotionDto): Promise<Promotion> => {
    const response = await api.post('/promotions', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreatePromotionDto>): Promise<Promotion> => {
    const response = await api.patch(`/promotions/${id}`, data);
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/promotions/${id}`);
  },
};

export const getPromotionsServer = () => serverFetch("/promotions");
export const getPromotionServer = (id: string) => serverFetch(`/promotions/${id}`);
