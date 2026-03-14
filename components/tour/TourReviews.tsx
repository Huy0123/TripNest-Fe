'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
}

interface TourReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export default function TourReviews({ rating, reviewCount, reviews }: TourReviewsProps) {
  return (
    <div className="bg-white  rounded-b-2xl py-8 mt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-[22px] font-bold text-[#141414] mb-2 flex items-center gap-2">
            Đánh giá của khách hàng
          </h2>
          <div className="flex items-center gap-3">
             <div className="bg-[#1e88e5] text-white font-bold px-3 py-1 rounded-lg text-[18px]">
               {rating}/10
             </div>
             <div className="flex flex-col">
               <span className="text-[#141414] font-semibold text-[15px]">Tuyệt vời</span>
               <span className="text-gray-500 text-[13px]">Dựa trên {reviewCount} đánh giá</span>
             </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  {review.avatar ? (
                     <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-[#e5f4ff] text-[#0194f3]">
                        {review.author.charAt(0).toUpperCase()}
                     </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-[#141414] text-[15px]">{review.author}</div>
                  <div className="text-gray-500 text-[12px]">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-[#fff8e1] px-2 py-1 rounded-md">
                 <Star className="w-3.5 h-3.5 fill-[#f5a623] text-[#f5a623]" />
                 <span className="text-[#f5a623] font-bold text-[13px]">{review.rating}/10</span>
              </div>
            </div>
            
            <p className="text-[#4b4b4b] text-[14.5px] leading-relaxed mb-4">
              {review.content}
            </p>

            <button className="flex items-center gap-1.5 text-gray-500 hover:text-[#0194f3] transition-colors text-[13px] font-medium border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
               <ThumbsUp className="w-3.5 h-3.5" />
               Hữu ích ({review.helpfulCount})
            </button>
          </div>
        ))}
      </div>

       {reviews.length > 0 && (
          <button className="w-full mt-6 py-3 border border-gray-200 text-[#0194f3] font-semibold rounded-xl hover:bg-gray-50 transition-colors">
            Xem tất cả {reviewCount} đánh giá
          </button>
       )}
    </div>
  );
}
