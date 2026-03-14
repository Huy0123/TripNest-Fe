'use client';

import React from 'react';

interface TourBookingCardProps {
  price: number;
  discountPrice?: number;
}

export default function TourBookingCard({ price, discountPrice }: TourBookingCardProps) {
  const displayPrice = discountPrice || price;
  const originalPrice = discountPrice && discountPrice < price ? price : null;

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col justify-between h-auto md:min-h-[160px]">
      <div className="flex justify-between md:flex-col lg:flex-row items-center md:items-start lg:items-center mb-4 md:mb-6 lg:mb-0">
        <div>
          <div className="text-sm text-gray-600 font-medium mb-1">Bắt đầu từ</div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[24px] md:text-[28px] font-bold text-[#ff5e1f] leading-none">
              {(displayPrice || 0).toLocaleString()} VND
            </span>
            {originalPrice !== null && (
              <span className="text-[14px] text-gray-400 line-through font-medium">
                {(originalPrice || 0).toLocaleString()} VND
              </span>
            )}
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          document.getElementById('ticket-selection')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="w-full bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold text-[16px] py-3.5 px-6 rounded-xl transition-colors shadow-sm mt-auto md:mt-4"
      >
        Tìm tour
      </button>
    </div>
  );
}
