"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  basePrice: number;
}

const WEEKDAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

// Helpers to start week on Monday
const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

// 0: Monday, 6: Sunday
const getStartDayOfWeek = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

// Format price to "237,11K" format typical in VN (using mock based on screenshot)
const formatShortPrice = (price: number) => {
  const inK = price / 1000;
  // We want to format something like 237.11K. We can force it or just use commas
  return inK.toLocaleString("vi-VN", { maximumFractionDigits: 2 }) + "K";
};

export default function CalendarModal({
  isOpen,
  onClose,
  onSelectDate,
  basePrice,
}: CalendarModalProps) {
  // Using March 2026 as the base to match screenshot
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 8)); // March is month 2

  if (!isOpen) return null;

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Right calendar dates
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
  const nextMonth = nextMonthDate.getMonth();
  const nextYear = nextMonthDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // 8th of March 2026 is Today in the screenshot
  const today = new Date(2026, 2, 8); 
  
  // Hardcoded holidays matching screenshot
  const holidays: Record<string, string> = {
    "2026-3-26": "Giỗ tổ Hùng Vương",
    "2026-3-27": "Ngày nghỉ Giỗ tổ Hùng Vương",
    "2026-3-30": "Ngày thống nhất Đất Nước",
  };

  const isToday = (year: number, month: number, day: number) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  // Mock static price for demo matching screenshot
  // Usually this would be passed down or calculated per date
  const staticPriceText = "237,11K"; // formatShortPrice(basePrice);

  const renderMonthGrid = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDayOfWeek(year, month);
    const previousMonthDays = getDaysInMonth(year, month - 1);

    const rows: { type: 'empty' | 'day'; day: number; date?: Date }[][] = [];
    let cells: { type: 'empty' | 'day'; day: number; date?: Date }[] = [];

    // Empty cells for prior month
    for (let i = 0; i < startDay; i++) {
       // Optional: we can display greyed out numbers from prev month if we want, but screenshot shows blank.
      cells.push({ type: 'empty', day: previousMonthDays - startDay + i + 1 });
    }

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({ type: 'day', day: i, date: new Date(year, month, i) });
      if (cells.length === 7) {
        rows.push(cells);
        cells = [];
      }
    }

    // Remaining empty cells for next month
    if (cells.length > 0) {
      const remaining = 7 - cells.length;
      for (let i = 1; i <= remaining; i++) {
        cells.push({ type: 'empty', day: i });
      }
      rows.push(cells);
    }

    return (
      <div className="flex flex-col">
        {/* Days of week header line */}
        <div className="grid grid-cols-7 border-b border-gray-100 pb-2 mb-2">
          {WEEKDAYS.map((wd, i) => (
            <div
              key={wd}
              className={`text-center text-[13px] font-medium ${
                i === 6 ? "text-[#d32f2f]" : "text-[#4b4b4b]"
              }`}
            >
              {wd}
            </div>
          ))}
        </div>

        {/* Calendar Rows */}
        <div className="flex flex-col">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-7 border-b border-gray-100 last:border-0 relative">
              {row.map((cell, cIdx) => {
                const isWeekend = cIdx === 6; // Sunday based on our 0=Mon, 6=Sun
                const checkIsToday = cell.type === 'day' && isToday(year, month, cell.day);
                
                // Ensure date is after today to show prices (simplification based on screenshot)
                const isPast = false; // Add logic if needed
                
                const dateKey = cell.type === 'day' ? `${year}-${month + 1}-${cell.day}` : '';
                const isHoliday = holidays[dateKey];

                return (
                  <button
                    key={cIdx}
                    disabled={cell.type === 'empty' || isPast}
                    onClick={() => {
                      if (cell.type === 'day' && cell.date) {
                        onSelectDate(cell.date);
                      }
                    }}
                    className={`relative py-3 flex flex-col items-center justify-start min-h-[64px] hover:bg-gray-50 transition-colors ${
                      cell.type === 'empty' ? 'invisible' : ''
                    } ${
                      checkIsToday ? 'border-b-2 border-[#0194f3] -mb-[1px] z-10' : '' // overlap bottom border
                    }`}
                  >
                    {/* "Hôm nay" label */}
                    {checkIsToday && (
                      <span className="text-[10px] text-[#0194f3] absolute top-0 leading-none">
                        Hôm nay
                      </span>
                    )}
                    
                    {/* Date Number */}
                    <span 
                      className={`text-[16px] font-bold ${checkIsToday ? 'mt-2.5' : 'mt-1'} ${
                        checkIsToday || isWeekend || isHoliday ? 'text-[#d32f2f]' : 'text-[#141414]'
                      }`}
                    >
                      {cell.type === 'day' ? cell.day : ''}
                    </span>
                    
                    {/* Price */}
                    {cell.type === 'day' && !isPast && (
                      <span className="text-[10px] text-[#6b6b6b] mt-auto">
                        {staticPriceText}
                      </span>
                    )}

                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const formatMonthYear = (month: number, year: number) => {
    return `tháng ${String(month + 1).padStart(2, "0")} ${year}`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      {/* Modal Container */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[900px] overflow-hidden flex flex-col animate-fade-in relative max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2 relative z-10">
          <h2 className="text-[24px] font-bold text-[#141414]">Chọn ngày</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 pt-4 overflow-y-auto overflow-x-hidden relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Calendar */}
            <div>
              {/* Month Header Controller */}
              <div className="flex items-center justify-between mb-6 relative">
                <button
                  onClick={handlePrevMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors relative z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-[20px] text-[#014296] font-medium">
                    {formatMonthYear(currentMonth, currentYear)}
                  </div>
                </div>
              </div>

              {renderMonthGrid(currentYear, currentMonth)}
            </div>

            {/* Right Calendar */}
            <div className="mt-8 md:mt-0">
               {/* Month Header Controller */}
               <div className="flex items-center justify-end mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-[20px] text-[#014296] font-medium">
                    {formatMonthYear(nextMonth, nextYear)}
                  </div>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e5f4ff] hover:bg-[#d0edff] transition-colors relative z-10"
                >
                  <ChevronRight className="w-5 h-5 text-[#0194f3]" />
                </button>
              </div>

              {renderMonthGrid(nextYear, nextMonth)}

              {/* Holidays Legend Remobed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
