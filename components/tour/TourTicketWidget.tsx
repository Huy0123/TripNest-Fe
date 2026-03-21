'use client';

import React, { useState } from 'react';
import { useTourSessionsByTour } from '@/hooks/queries/useTourSessions';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import CalendarModal from './CalendarModal';
import { useRouter, useParams } from 'next/navigation';
import { tourSessionService } from '@/services/tourSessionService';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/format';
import { useSocket } from '@/hooks/useSocket';
import { TourSession } from '@/types/tour-session';


interface TourTicketWidgetProps {
  tourId: string;
  price: number;
  discountPrice?: number;
  initialSessions?: any[];
}

export default function TourTicketWidget({ tourId, price, discountPrice, initialSessions }: TourTicketWidgetProps) {
  const router = useRouter();
  const params = useParams();
  
  // Fetch real sessions for this tour via custom hook
  const { sessions, isLoading } = useTourSessionsByTour(tourId, initialSessions);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [localSessions, setLocalSessions] = useState<TourSession[]>([]);

  // Initialize and sync localSessions with hook sessions
  React.useEffect(() => {
    if (sessions.length > 0) {
      setLocalSessions(sessions);
    }
  }, [sessions]);

  // WebSocket for real-time updates
  const { on } = useSocket();

  React.useEffect(() => {
    const cleanup = on('sessionUpdated', (updatedData: { 
      sessionId: string, 
      bookedCount: number, 
      capacity: number, 
      status: string 
    }) => {
      setLocalSessions(prev => prev.map(s => 
        s.id === updatedData.sessionId 
          ? { ...s, bookedCount: updatedData.bookedCount, capacity: updatedData.capacity, status: updatedData.status as any }
          : s
      ));
    });

    return cleanup;
  }, [on]);

  // Filter upcoming sessions from local state
  const upcomingSessions = localSessions
    .filter((s: any) => {
      const sessionDate = new Date(s.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      return sessionDate >= today && s.status === 'OPEN';
    })
    .sort((a: any, b: any) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // Default selection to first upcoming session if not set
  React.useEffect(() => {
    if (!selectedSessionId && upcomingSessions.length > 0) {
      setSelectedSessionId(upcomingSessions[0].id);
    }
  }, [selectedSessionId, upcomingSessions]);

  const selectedSession = localSessions.find((s: any) => s.id === selectedSessionId);

  const displayPrice = discountPrice || price;
  const originalPrice = discountPrice && discountPrice < price ? price : null;

  return (
    <div id="ticket-selection" className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 my-10 scroll-mt-24">
      <h2 className="text-[20px] font-bold text-[#141414] mb-4">Có vé trống cho bạn</h2>
      
      {/* Date Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        
        <button 
          onClick={() => setIsCalendarOpen(true)}
          className="flex flex-col items-center justify-center min-w-[90px] h-[60px] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shrink-0"
        >
          <div className="flex items-center gap-1.5 text-[#0194f3] font-medium text-[14px]">
            <CalendarIcon className="w-4 h-4" />
            Xem lịch
          </div>
        </button>

        {upcomingSessions.slice(0, 7).map((s: any) => {
          const isSelected = selectedSessionId === s.id;
          const startDate = new Date(s.startDate);
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSessionId(s.id)}
              className={`flex flex-col items-center justify-center min-w-[80px] h-[60px] rounded-xl transition-all shrink-0 border ${
                isSelected 
                  ? 'bg-[#e5f4ff] border-[#0194f3] text-[#0194f3]' 
                  : 'bg-white border-gray-200 text-[#4b4b4b] hover:bg-gray-50'
              }`}
            >
              <div className={`text-[13px] ${isSelected ? 'font-semibold' : ''}`}>{format(startDate, 'eee')}</div>
              <div className={`text-[14px] ${isSelected ? 'font-bold' : ''}`}>{format(startDate, 'dd/MM')}</div>
            </button>
          );
        })}
      </div>

      {/* Ticket Selection Area */}
      {selectedSession ? (
        <div className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-[#141414] mb-1">
              Khởi hành: {format(new Date(selectedSession.startDate), 'HH:mm - dd/MM/yyyy')}
            </h3>
            <span className="text-[#0194f3] text-[13px] font-medium">Số lượng còn lại: {selectedSession.capacity - selectedSession.bookedCount}</span>
          </div>

          <div className="flex flex-col items-end w-full md:w-auto">
            <div className="flex items-center gap-2 mb-3 w-full justify-between md:justify-end">
              <span className="text-[20px] md:text-[22px] font-bold text-[#ff5e1f] leading-none">
                {formatCurrency(displayPrice)}
              </span>
              {originalPrice && (
                <span className="text-[13px] text-gray-400 line-through font-medium leading-none">
                  {formatCurrency(originalPrice)}
                </span>
              )}
            </div>
            <button 
              onClick={() => {
                router.push(`/booking/${tourId}?sessionId=${selectedSessionId}`);
              }}
              className="w-full md:w-[200px] bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold text-[15px] py-2.5 px-6 rounded-xl transition-colors shadow-sm"
            >
              Chọn vé
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-xl">
          {isLoading ? 'Đang kiểm tra vé trống...' : 'Hiện tại chưa có phiên nào sắp tới cho tour này.'}
        </div>
      )}
      
      <CalendarModal 
        isOpen={isCalendarOpen} 
        onClose={() => setIsCalendarOpen(false)} 
        onSelectDate={(date) => {
          // Find session matching this date if any
          const sessionOnDate = localSessions.find((s: any) => format(new Date(s.startDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
          if (sessionOnDate) setSelectedSessionId(sessionOnDate.id);
          setIsCalendarOpen(false);
        }}
        basePrice={price}
      />
    </div>
  );
}
