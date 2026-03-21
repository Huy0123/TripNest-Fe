'use client';

import React from 'react';
import { Images, X, Plus } from 'lucide-react';

interface TourMediaSectionProps {
  handleGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeGalleryPreviewItem: (index: number) => void;
  galleryPreviews: string[];
}

export function TourMediaSection({
  handleGalleryChange,
  removeGalleryPreviewItem,
  galleryPreviews,
}: TourMediaSectionProps) {
  return (
    <div className="space-y-6 pt-4 border-t">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Images className="w-5 h-5 text-primary-500" />
        Bộ sưu tập ảnh
      </h3>

      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Hình ảnh Gallery
          <span className="text-xs text-gray-400 font-normal">Có thể chọn nhiều ảnh</span>
        </label>
        <div className="grid grid-cols-4 gap-3">
          {galleryPreviews.map((preview, idx) => (
            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group border border-gray-100 shadow-sm">
              <img src={preview} alt="Gallery" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeGalleryPreviewItem(idx); }}
                className="absolute top-1.5 right-1.5 bg-white/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            </div>
          ))}
          <div
            className="aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors gap-1"
            onClick={() => document.getElementById('galleryInput')?.click()}
          >
            <Plus className="w-6 h-6 text-gray-300" />
            <span className="text-[10px] text-gray-400">Thêm ảnh</span>
            <input
              id="galleryInput"
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleGalleryChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
