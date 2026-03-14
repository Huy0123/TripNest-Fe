"use client";

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, ChevronDown } from 'lucide-react';

interface BookingWidgetProps {
  price: number;
}

export default function BookingWidget({ price }: BookingWidgetProps) {
  const [guests, setGuests] = useState(2);
  const total = price * guests;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 w-full">
      <div className="mb-6">
        <span className="text-2xl font-bold text-[#e65100]">
          {formatPrice(price)}
        </span>
        <span className="text-gray-500 text-sm ml-1">/ khách</span>
      </div>

      <div className="space-y-4 mb-6">
        {/* Date Picker Dummy */}
        <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-primary-300 transition-colors">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Ngày đi</span>
             <div className="flex items-center text-gray-900 font-medium">
               <CalendarIcon className="w-4 h-4 mr-2 text-primary-500" />
               Chọn ngày
             </div>
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>

        {/* Guests Placeholder */}
        <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Số khách</span>
             <div className="flex items-center text-gray-900 font-medium">
               <Users className="w-4 h-4 mr-2 text-primary-500" />
               {guests} Khách
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
                aria-label="Decrease guests"
             >
               -
             </button>
             <button 
                onClick={() => setGuests(guests + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
                aria-label="Increase guests"
             >
               +
             </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6 font-bold text-gray-900">
        <span>Tổng cộng</span>
        <span className="text-xl">{formatPrice(total)}</span>
      </div>

      <button className="w-full bg-[#f26a21] hover:bg-[#e65100] text-white font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center shadow-md shadow-orange-500/20">
        Đặt Ngay
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Bạn chưa bị trừ tiền cho đến khi xác nhận giao dịch
      </p>
    </div>
  );
}
