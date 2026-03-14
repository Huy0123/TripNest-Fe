import React from 'react';
import Link from 'next/link';

export default function TourBreadcrumb({
  tourName,
  location
}: {
  tourName: string;
  location?: { city: string; country: string };
}) {
  return (
    <div className="w-full py-3 px-4 bg-primary-300">
      <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-white overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link href="/" className="hover:text-gray-200 transition-colors font-medium">Trang chủ</Link>
        <span className="text-white/60">/</span>
        
        {location?.country && (
          <>
            <span className="hover:text-gray-200 cursor-pointer transition-colors font-medium">
              {location.country === "VN" ? "Việt Nam" : location.country}
            </span>
            <span className="text-white/60">/</span>
          </>
        )}
        
        {location?.city && (
          <>
            <span className="hover:text-gray-200 cursor-pointer transition-colors font-medium">
              {location.city}
            </span>
            <span className="text-white/60">/</span>
          </>
        )}
        
        <span className="text-white font-bold truncate max-w-[300px] sm:max-w-[400px] md:max-w-none">
          {tourName}
        </span>
      </div>
    </div>
  );
}
