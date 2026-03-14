'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { PlusCircle, X, ChevronRight } from 'lucide-react';

interface TourDetailSectionsProps {
  formData: any;
  handleInputChange: (e: any) => void;
  handleArrayChange: (index: number, value: string, field: string) => void;
  addArrayItem: (field: string) => void;
  removeArrayItem: (index: number, field: string) => void;
  handleItineraryChange: (index: number, field: string, value: string) => void;
  addItineraryItem: () => void;
  handleMoreInfoChange: (index: number, field: string, value: string) => void;
  addMoreInfoItem: () => void;
  removeMoreInfoItem: (index: number) => void;
  handleMoreInfoSubItemChange: (infoIdx: number, itemIdx: number, value: string) => void;
  addMoreInfoSubItem: (infoIdx: number) => void;
  removeMoreInfoSubItem: (infoIdx: number, itemIdx: number) => void;
}

export function TourDetailSections({
  formData,
  handleInputChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  handleItineraryChange,
  addItineraryItem,
  handleMoreInfoChange,
  addMoreInfoItem,
  removeMoreInfoItem,
  handleMoreInfoSubItemChange,
  addMoreInfoSubItem,
  removeMoreInfoSubItem
}: TourDetailSectionsProps) {
  return (
    <div className="space-y-6 pt-4 border-t">
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
            value={formData.detail.description} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-md text-sm min-h-24"
            placeholder="Mô tả tóm tắt về chuyến đi..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Chi tiết trải nghiệm</label>
          <textarea 
            name="detail.experience" 
            value={formData.detail.experience} 
            onChange={handleInputChange} 
            className="w-full p-2 border rounded-md text-sm min-h-24"
            placeholder="Những hoạt động chính, điểm nhấn của tour..."
          />
        </div>
      </div>

      {/* Guide Services */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Dịch vụ <PlusCircle className="w-4 h-4 cursor-pointer text-primary-500" onClick={() => addArrayItem('guideService')} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          {formData.guideService.map((item: string, idx: number) => (
            <div key={idx} className="flex gap-2 items-center">
              <Input 
                value={item} 
                onChange={(e) => handleArrayChange(idx, e.target.value, 'guideService')}
                className="flex-1"
                placeholder="VD: Hướng dẫn viên"
              />
              <X className="w-4 h-4 cursor-pointer text-red-500" onClick={() => removeArrayItem(idx, 'guideService')} />
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Lịch trình <PlusCircle className="w-4 h-4 cursor-pointer text-primary-500" onClick={addItineraryItem} />
        </label>
        <div className="space-y-3">
          {formData.detail.itinerary.map((day: any, idx: number) => (
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

      {/* More Info */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Thông tin thêm (Bao gồm/Không bao gồm...) <PlusCircle className="w-4 h-4 cursor-pointer text-primary-500" onClick={addMoreInfoItem} />
        </label>
        <div className="grid grid-cols-1 gap-4">
          {formData.detail.moreInfo.map((info: any, infoIdx: number) => (
            <div key={infoIdx} className="p-4 border rounded-lg bg-white shadow-sm space-y-3 relative group">
              <button 
                type="button" 
                onClick={() => removeMoreInfoItem(infoIdx)}
                className="absolute -top-2 -right-2 bg-white border border-red-200 text-red-500 rounded-full p-1.5 shadow-md hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 z-10"
              >
                <X className="w-3" />
              </button>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <Input 
                  placeholder="Tiêu đề (VD: Giá bao gồm)" 
                  value={info.title} 
                  onChange={(e) => handleMoreInfoChange(infoIdx, 'title', e.target.value)} 
                />
                <Input 
                  placeholder="Phụ đề" 
                  value={info.subtitle} 
                  onChange={(e) => handleMoreInfoChange(infoIdx, 'subtitle', e.target.value)} 
                />
              </div>
              <div className="space-y-2 pl-4 border-l-2 border-primary-100">
                <label className="text-xs font-bold text-gray-500 flex justify-between">
                  DANH SÁCH CHI TIẾT
                  <span className="text-primary-600 cursor-pointer flex items-center gap-1" onClick={() => addMoreInfoSubItem(infoIdx)}>
                    + THÊM DÒNG
                  </span>
                </label>
                {info.items.map((item: string, itemIdx: number) => (
                  <div key={itemIdx} className="flex gap-2 items-center">
                    <input 
                      className="flex-1 p-2 border rounded-md text-sm"
                      placeholder="Nhập nội dung..."
                      value={item}
                      onChange={(e) => handleMoreInfoSubItemChange(infoIdx, itemIdx, e.target.value)}
                    />
                    <X className="w-3 h-3 cursor-pointer text-gray-400" onClick={() => removeMoreInfoSubItem(infoIdx, itemIdx)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
