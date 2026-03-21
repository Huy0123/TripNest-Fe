'use client';

import React from 'react';
import { Image as ImageIcon, Upload, Plus, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PriceInput } from '@/components/ui/price-input';
import { StayOption } from '@/types/tours';

interface TourBasicInfoSectionProps {
  formData: any;
  locations: any[];
  mainImagePreview: string | null;
  handleInputChange: (e: any) => void;
  handleArrayChange: (index: number, value: string, field: string) => void;
  addArrayItem: (field: string) => void;
  removeArrayItem: (index: number, field: string) => void;
  handleMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TourBasicInfoSection({
  formData,
  locations,
  mainImagePreview,
  handleInputChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  handleMainImageChange,
}: TourBasicInfoSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg flex items-center gap-2 pt-4 border-t">
        <Info className="w-5 h-5 text-gray-900" />
        Thông tin chung
      </h3>

      {/* Cover Image Quick Edit */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700">Ảnh đại diện Tour</label>
        <div 
          className="relative w-full rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 hover:border-gray-900 transition-all cursor-pointer group bg-gray-50/50"
          style={{ aspectRatio: '16/5' }}
          onClick={() => document.getElementById('basicMainImageInput')?.click()}
        >
          {mainImagePreview ? (
            <img src={mainImagePreview} alt="Cover" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon className="w-10 h-10 mb-2" />
              <p className="text-xs font-medium">Click để tải ảnh lên</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-bold uppercase tracking-wider">Đổi ảnh</span>
          </div>
          <input 
            id="basicMainImageInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleMainImageChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Tên Tour</label>
          <Input 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            placeholder="VD: Khám phá Vịnh Hạ Long"
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Giá</label>
          <PriceInput 
            name="price" 
            value={formData.price} 
            onChange={(val) => handleInputChange({ target: { name: 'price', value: val } })} 
            required 
            placeholder="VD: 1.000.000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Thời lượng (ngày)</label>
          <Input 
            name="duration" 
            type="number" 
            value={formData.duration} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Giảm giá (%)</label>
          <Input 
            name="discount" 
            type="number" 
            value={formData.discount} 
            onChange={handleInputChange} 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Điểm khởi hành</label>
          <select 
            name="departureLocationId" 
            value={formData.departureLocationId} 
            onChange={handleInputChange}
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Chọn điểm khởi hành</option>
            {locations?.map((loc: any) => (
              <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
            ))} 
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Lưu trú</label>
          <select 
            name="stayOption" 
            value={formData.stayOption} 
            onChange={handleInputChange}
            className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {Object.values(StayOption).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Dynamic Guide Services */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Dịch vụ đi kèm (Guiding)</label>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('guideService')} className="h-7 text-xs px-2">
            <Plus className="w-3 h-3 mr-1" /> Thêm
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {formData.guideService.map((service: string, idx: number) => (
            <div key={idx} className="flex gap-2">
              <Input 
                value={service} 
                onChange={(e) => handleArrayChange(idx, e.target.value, 'guideService')}
                placeholder="VD: Hướng dẫn viên địa phương"
              />
              {formData.guideService.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(idx, 'guideService')}>
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Destination */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Điểm đến</label>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('destinationIds')} className="h-7 text-xs px-2">
            <Plus className="w-3 h-3 mr-1" /> Thêm điểm đến
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {formData.destinationIds.map((destId: string, idx: number) => (
            <div key={idx} className="flex gap-2">
              <select 
                value={destId} 
                onChange={(e) => handleArrayChange(idx, e.target.value, 'destinationIds')}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Chọn điểm đến</option>
                {locations?.map((loc: any) => (
                  <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
                ))}
              </select>
              {formData.destinationIds.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(idx, 'destinationIds')}>
                  <X className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
