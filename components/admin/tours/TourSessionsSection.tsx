'use client';

import React, { useState } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TourSessionCalendar } from './TourSessionCalendar';
import { TourSessionBulkModal } from './TourSessionBulkModal';
import { TourSessionCreateModal } from './TourSessionCreateModal';

interface TourSessionsSectionProps {
  tourId: string;
  sessions: any[];
  addSessionItem: (date?: Date) => void;
  updateSessionItem: (index: number, field: string, value: any) => void;
  removeSessionItem: (index: number) => void;
  mutateSessions: () => void;
  tourPrice?: number;
}

export function TourSessionsSection({
  tourId,
  sessions,
  mutateSessions,
  tourPrice
}: TourSessionsSectionProps) {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [sessionToEdit, setSessionToEdit] = useState<any>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSessionToEdit(null);
    setIsCreateModalOpen(true);
  };

  const handleSessionClick = (session: any) => {
    setSessionToEdit(session);
    setSelectedDate(new Date(session.startDate));
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setSessionToEdit(null);
    setSelectedDate(null);
  };

  return (
    <div className="space-y-6 pt-4 border-t">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-900" />
          Lịch khởi hành (Sessions)
        </h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          className="bg-primary-50 border-primary-100 text-primary-700 hover:bg-primary-100 font-bold px-4"
          onClick={() => setIsBulkModalOpen(true)}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Tạo lịch định kỳ (Bulk)
        </Button>
      </div>
      
      <div className="p-6 border-2 border-gray-50 rounded-3xl bg-white shadow-sm">
        <TourSessionCalendar 
          sessions={sessions}
          onDateClick={handleDateClick}
          onSessionClick={handleSessionClick}
        />
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
        <p className="text-xs text-gray-500 font-medium leading-relaxed">
          <span className="font-bold text-gray-900">Mẹo:</span> Nhấn trực tiếp vào một ngày trên lịch để mở phiên khởi hành cho ngày đó. 
          Sử dụng nút "Tạo lịch định kỳ" để mở bán cho cả tháng hoặc cả quý chỉ trong tích tắc.
        </p>
      </div>

      <TourSessionBulkModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        tourId={tourId}
        onSuccess={mutateSessions}
        tourPrice={tourPrice}
      />

      <TourSessionCreateModal 
        key={sessionToEdit ? sessionToEdit.id : 'create'}
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        tourId={tourId}
        selectedDate={selectedDate}
        onSuccess={mutateSessions}
        tourPrice={tourPrice}
        sessionData={sessionToEdit}
      />
    </div>
  );
}
