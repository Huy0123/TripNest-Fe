'use client';

import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  isToday
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TourSessionCalendarProps {
  sessions: any[];
  onDateClick: (date: Date) => void;
  onSessionClick: (session: any) => void;
}

export function TourSessionCalendar({ sessions, onDateClick, onSessionClick }: TourSessionCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold text-gray-900 capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: vi })}
        </h4>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    return (
      <div className="grid grid-cols-7 mb-2 border-b border-gray-100 italic">
        {days.map((day, i) => (
          <div key={i} className="text-center py-2 text-xs font-bold text-gray-400">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {calendarDays.map((day, i) => {
          const daySessions = sessions.filter(s => isSameDay(new Date(s.startDate), day));
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div 
              key={i} 
              className={`min-h-[100px] bg-white p-2 transition-all hover:bg-gray-50 cursor-pointer flex flex-col gap-1 ${
                !isCurrentMonth ? 'text-gray-300 opacity-50' : 'text-gray-700'
              }`}
              onClick={() => onDateClick(day)}
            >
              <div className="flex justify-between items-start">
                <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday(day) ? 'bg-primary-500 text-white shadow-md' : ''
                }`}>
                  {format(day, 'd')}
                </span>
                {isCurrentMonth && (
                   <Plus className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
                )}
              </div>
              
              <div className="flex flex-col gap-1 mt-1 max-h-[60px] scrollbar-hide">
                {daySessions.map(session => (
                  <div 
                    key={session.id} 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSessionClick(session);
                    }}
                    className={`text-[10px] px-1.5 py-0.5 rounded-lg border flex items-center justify-center group shadow-sm transition-all hover:scale-[1.02] ${
                      session.status === 'SOLDOUT' ? 'bg-red-50 text-red-600 border-red-200' :
                      session.status === 'OPEN' ? 'bg-green-50 text-green-600 border-green-200' :
                      'bg-gray-100 text-gray-600 border-gray-300'
                    }`}
                  >
                    <span className="truncate font-bold tracking-tight">
                      {session.status === 'SOLDOUT' ? 'HẾT CHỖ' : 
                       session.status === 'OPEN' ? 'ĐANG BÁN' : 'ĐÃ ĐÓNG'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      {/* Legend */}
      <div className="flex gap-4 mt-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Đang mở bán
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Hết chỗ
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span> Đã kết thúc / Đóng
        </div>
      </div>
    </div>
  );
}
