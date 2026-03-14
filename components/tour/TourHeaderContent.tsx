import React from 'react';
import { MapPin, Calendar, Clock, BookOpen, Share2, Tag } from 'lucide-react';

interface TourHeaderContentProps {
  title: string;
  location: string;
  duration: number;
}

export default function TourHeaderContent({
  title,
  location,
  duration
}: TourHeaderContentProps) {
  return (
    <div className="w-full bg-white pt-6 pb-4">
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-[#141414] leading-snug">
          {title}
        </h1>
        <div className="flex gap-2 shrink-0">
           <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <BookOpen className="w-5 h-5 text-blue-600" />
           </button>
           <button className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <Share2 className="w-5 h-5 text-blue-600" />
           </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6">
        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 bg-gray-50/50">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="truncate max-w-[200px] md:max-w-none">{location}</span>
          <span className="text-[#0194f3] font-medium ml-1 cursor-pointer hover:underline">Xem bản đồ</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 bg-gray-50/50">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>Thời gian tour | {duration} ngày</span>
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 bg-gray-50/50">
          <Tag className="w-4 h-4 text-gray-500" />
          <span className="truncate max-w-[250px] md:max-w-none">Thông tin liên hệ, Tiện ích, Dịch vụ ng...</span>
          <span className="text-[#0194f3] font-medium ml-1 cursor-pointer hover:underline">Xem chi tiết</span>
        </div>
      </div>
    </div>
  );
}
