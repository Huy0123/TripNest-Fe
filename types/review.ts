import { Tour } from './tours';
import { User } from './user';

export interface Review {
  id: string;
  tour: Tour;
  user: User;
  rating: number;
  comment: string;
  title?: string;
  isVisible: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDto {
  tourId: string;
  userId: string;
  rating: number;
  comment?: string;
}
