import api from '@/lib/api-client';
import { 
  OverviewStats, 
  RevenueStats, 
  TopTourStats, 
  BookingStats, 
  NewUserStats 
} from '@/types/statistics';

export const statisticsService = {
  getOverview: async (): Promise<OverviewStats> => {
    const response = await api.get('/statistics/overview');
    return response.data;
  },

  getRevenueByMonth: async (year?: number): Promise<RevenueStats> => {
    const response = await api.get('/statistics/revenue/monthly', { params: { year } });
    return response.data;
  },

  getRevenueByDay: async (year?: number, month?: number): Promise<RevenueStats> => {
    const response = await api.get('/statistics/revenue/daily', { params: { year, month } });
    return response.data;
  },

  getTopTours: async (limit?: number): Promise<TopTourStats[]> => {
    const response = await api.get('/statistics/tours/top', { params: { limit } });
    return response.data;
  },

  getBookingStats: async (startDate?: string, endDate?: string): Promise<BookingStats[]> => {
    const response = await api.get('/statistics/bookings', { params: { startDate, endDate } });
    return response.data;
  },

  getNewUsersByMonth: async (year?: number): Promise<NewUserStats[]> => {
    const response = await api.get('/statistics/users/monthly', { params: { year } });
    return response.data;
  },
};
