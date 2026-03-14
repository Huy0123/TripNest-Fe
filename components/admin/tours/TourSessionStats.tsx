'use client';

import React from 'react';
import useSWR from 'swr';
import { tourSessionService } from '@/services/tourSessionService';
import { DepartureStatus } from '@/types/tour-session';

interface TourSessionStatsProps {
  tourId: string;
}

export function TourSessionStats({ tourId }: TourSessionStatsProps) {
  const { data: sessionsRes, isLoading } = useSWR(
    tourId ? `/tour-sessions/tour/${tourId}` : null,
    () => tourSessionService.findByTour(tourId)
  );

  if (isLoading) {
    return (
      <>
        <div className="text-center w-24">
          <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Lịch trình</p>
          <div className="h-4 w-12 bg-gray-100 animate-pulse mx-auto rounded"></div>
        </div>
        <div className="text-center w-24">
          <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Trạng thái</p>
          <div className="h-4 w-16 bg-gray-100 animate-pulse mx-auto rounded-full"></div>
        </div>
      </>
    );
  }

  const allSessions = sessionsRes?.data || [];
  
  // Chỉ lấy các phiên đang hoạt động (Đang bán hoặc Hết chỗ)
  const activeSessions = allSessions.filter((s: any) => 
    s.status === DepartureStatus.OPEN || s.status === DepartureStatus.SOLDOUT
  );
  
  const activeCount = activeSessions.length;

  // Logic xác định trạng thái tổng quát dựa trên các phiên đang hoạt động
  let statusText = "Chưa có lịch";
  let statusClass = "bg-gray-50 text-gray-400";

  if (activeCount > 0) {
    const hasOpen = activeSessions.some((s: any) => s.status === DepartureStatus.OPEN);
    
    if (hasOpen) {
      statusText = "Đang mở bán";
      statusClass = "bg-green-50 text-green-600";
    } else {
      // Nếu có phiên active mà không cái nào OPEN thì chắc chắn là SOLDOUT
      statusText = "Hết chỗ";
      statusClass = "bg-red-50 text-red-600";
    }
  } else if (allSessions.length > 0) {
    // Nếu có phiên nhưng tất cả đã Đóng/Hủy
    statusText = "Đã kết thúc";
    statusClass = "bg-gray-100 text-gray-500";
  }

  return (
    <>
      <div className="text-center w-24">
        <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Lịch trình</p>
        <p className="text-xs font-bold text-gray-700">
          {activeCount} Phiên
        </p>
      </div>
      <div className="text-center w-24">
        <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Trạng thái</p>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusClass}`}>
          {statusText}
        </span>
      </div>
    </>
  );
}
