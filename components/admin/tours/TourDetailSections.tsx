'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, ChevronRight, CheckCircle2, MinusCircle } from 'lucide-react';

interface TourDetailSectionsProps {
  formData: any;
  handleInputChange: (e: any) => void;
  handleItineraryChange: (index: number, field: string, value: string) => void;
  addItineraryItem: () => void;
  handleDetailArrayChange: (index: number, value: string, field: 'inclusions' | 'exclusions') => void;
  addDetailArrayItem: (field: 'inclusions' | 'exclusions') => void;
  removeDetailArrayItem: (index: number, field: 'inclusions' | 'exclusions') => void;
}

export function TourDetailSections({
  formData,
  handleInputChange,
  handleItineraryChange,
  addItineraryItem,
  handleDetailArrayChange,
  addDetailArrayItem,
  removeDetailArrayItem,
}: TourDetailSectionsProps) {
  return (
    <div className="space-y-8 pt-4 border-t">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <ChevronRight className="w-5 h-5 text-primary-500" />
        Chi tiết chương trình & Thông tin khác
      </h3>

      {/* Description & Experience */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Mô tả ngắn</label>
          <textarea
            name="detail.description"
            value={formData.detail?.description || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm min-h-24"
            placeholder="Mô tả tóm tắt về chuyến đi..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Chi tiết trải nghiệm</label>
          <textarea
            name="detail.experience"
            value={formData.detail?.experience || ''}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md text-sm min-h-24"
            placeholder="Những hoạt động chính, điểm nhấn của tour..."
          />
        </div>
      </div>

      {/* Itinerary */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Lịch trình
          <PlusCircle className="w-4 h-4 cursor-pointer text-primary-500" onClick={addItineraryItem} />
        </label>
        <div className="space-y-3">
          {(Array.isArray(formData.detail?.itinerary) ? formData.detail.itinerary : []).map((day: any, idx: number) => (
            <div key={idx} className="p-3 border rounded-lg bg-gray-50/50 space-y-2">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-primary-600 w-16">Ngày {day.day}</span>
                <Input
                  placeholder="Tiêu đề ngày (VD: Đón khách - Khởi hành)"
                  value={day.title}
                  onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                />
              </div>
              <textarea
                placeholder="Nội dung chi tiết ngày..."
                value={day.description}
                onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                className="w-full p-2 border rounded-md text-sm min-h-20"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Bao gồm
            </label>
            <button
              type="button"
              onClick={() => addDetailArrayItem('inclusions')}
              className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm
            </button>
          </div>
          <div className="space-y-2">
            {(Array.isArray(formData.detail?.inclusions) ? formData.detail.inclusions : []).map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-green-500 mt-0.5">•</span>
                <input
                  className="flex-1 p-2 border border-green-100 rounded-md text-sm focus:outline-none focus:border-green-300"
                  placeholder="VD: Vé máy bay khứ hồi"
                  value={item}
                  onChange={(e) => handleDetailArrayChange(idx, e.target.value, 'inclusions')}
                />
                <button type="button" onClick={() => removeDetailArrayItem(idx, 'inclusions')}>
                  <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <MinusCircle className="w-4 h-4 text-red-400" />
              Không bao gồm
            </label>
            <button
              type="button"
              onClick={() => addDetailArrayItem('exclusions')}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Thêm
            </button>
          </div>
          <div className="space-y-2">
            {(Array.isArray(formData.detail?.exclusions) ? formData.detail.exclusions : []).map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-red-400 mt-0.5">•</span>
                <input
                  className="flex-1 p-2 border border-red-100 rounded-md text-sm focus:outline-none focus:border-red-200"
                  placeholder="VD: Chi phí cá nhân"
                  value={item}
                  onChange={(e) => handleDetailArrayChange(idx, e.target.value, 'exclusions')}
                />
                <button type="button" onClick={() => removeDetailArrayItem(idx, 'exclusions')}>
                  <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
