'use client';

import React from 'react';
import useSWR from 'swr';
import { tourSessionService } from '@/services/tourSessionService';
import { DepartureStatus } from '@/types/tour-session';

interface TourSessionStatsProps {
  tourId: string;
  totalBooked?: number;
  totalCapacity?: number;
  upcomingSessionsCount?: number;
  firstUpcomingSession?: any;
}

export function TourSessionStats({ 
  tourId, 
  totalBooked, 
  totalCapacity, 
  upcomingSessionsCount, 
  firstUpcomingSession 
}: TourSessionStatsProps) {
  const { data: sessionsRes, isLoading } = useSWR(
    totalBooked === undefined ? `/tour-sessions/tour/${tourId}` : null,
    () => tourSessionService.findByTourId(tourId)
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

  let allSessions: any[] = [];
  if (Array.isArray(sessionsRes)) {
    allSessions = sessionsRes;
  } else if (sessionsRes && Array.isArray((sessionsRes as any).data)) {
    allSessions = (sessionsRes as any).data;
  }
  
  // Use props if provided, otherwise derive from SWR data
  const finalActiveCount = upcomingSessionsCount !== undefined 
    ? upcomingSessionsCount 
    : allSessions.filter((s: any) => s.status === DepartureStatus.OPEN || s.status === DepartureStatus.SOLDOUT).length;

  const sessionsForStatus = totalBooked !== undefined ? [] : allSessions; // Placeholder if props used

  // Status mapping
  let statusText = "Chưa có lịch";
  let statusClass = "bg-gray-50 text-gray-400";

  if (totalBooked !== undefined) {
    if (finalActiveCount > 0) {
      statusText = "Đang mở bán";
      statusClass = "bg-green-50 text-green-600";
    } else {
      statusText = "Đã kết thúc";
      statusClass = "bg-gray-100 text-gray-500";
    }
  } else if (allSessions.length > 0) {
    const activeSessions = allSessions.filter((s: any) => 
      s.status === DepartureStatus.OPEN || s.status === DepartureStatus.SOLDOUT
    );
    if (activeSessions.length > 0) {
      const hasOpen = activeSessions.some((s: any) => s.status === DepartureStatus.OPEN);
      if (hasOpen) {
        statusText = "Đang mở bán";
        statusClass = "bg-green-50 text-green-600";
      } else {
        statusText = "Hết chỗ";
        statusClass = "bg-red-50 text-red-600";
      }
    } else {
      statusText = "Đã kết thúc";
      statusClass = "bg-gray-100 text-gray-500";
    }
  }

  return (
    <>
      <div className="text-center w-24">
        <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Lịch trình</p>
        <p className="text-xs font-bold text-gray-700">
          {finalActiveCount} Phiên
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
