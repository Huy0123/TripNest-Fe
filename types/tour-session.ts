import { Tour } from './tours';

export enum DepartureStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  SOLDOUT = 'SOLDOUT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface TourSession {
  id: string;
  tourId: string;
  startDate: string;
  startTime: string;
  capacity: number;
  availableSeats: number;
  bookedCount: number;
  adultPrice: number;
  childrenPrice: number;
  discount: number;
  status: DepartureStatus;
  createdAt: string;
  updatedAt: string;
}

/** DTO used when creating a new session (tourId is the API request field, not the entity relation) */
export interface CreateTourSessionDto {
  tourId: string;
  startDate: string;
  startTime?: string;
  capacity: number;
  adultPrice: number;
  childrenPrice?: number;
  discount?: number;
  status?: DepartureStatus;
}