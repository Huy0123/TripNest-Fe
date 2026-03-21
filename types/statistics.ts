export interface OverviewStats {
  totalRevenue: number;
  revenueChange: number;
  totalBookings: number;
  bookingsChange: number;
  totalTours: number;
  toursChange: number;
  totalUsers: number;
  usersChange: number;
  bookingsByStatus: Record<string, number>;
}

export interface RevenueData {
  month?: string;
  day?: string;
  revenue: number;
}

export interface RevenueStats {
  averageRevenue: number;
  peakPeriod: string;
  data: RevenueData[];
}

export interface TopTourStats {
  tourId: string;
  tourName: string;
  destination: string;
  bookingCount: number;
  revenue: number;
}

export interface BookingStats {
  status: string;
  count: number;
  totalAmount: number;
}

export interface NewUserStats {
  month: string;
  newUsers: number;
}
