'use client';

import React from 'react';
import { Image as ImageIcon, Upload, Video, FileVideo, X, Plus } from 'lucide-react';

interface TourMediaSectionProps {
  handleMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeGalleryPreviewItem: (index: number) => void;
  mainImagePreview: string | null;
  galleryPreviews: string[];
  videoPreview: string | null;
}

export function TourMediaSection({
  handleMainImageChange,
  handleGalleryChange,
  handleVideoChange,
  removeGalleryPreviewItem,
  mainImagePreview,
  galleryPreviews,
  videoPreview
}: TourMediaSectionProps) {
  return (
    <div className="space-y-6 pt-4 border-t">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary-500" />
        Hình ảnh & Video
      </h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Main Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">Ảnh chính (Banner)</label>
          <div 
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative h-40 flex flex-col items-center justify-center overflow-hidden"
            onClick={() => document.getElementById('mainImageInput')?.click()}
          >
            {mainImagePreview ? (
              <img src={mainImagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">Chạm để tải ảnh lên (JPG, PNG)</p>
              </>
            )}
            <input 
              id="mainImageInput" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleMainImageChange} 
            />
          </div>
        </div>

        {/* Video */}
        <div className="space-y-2">
          <label className="text-sm font-medium block">Video ngắn (Teaser)</label>
          <div 
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors relative h-40 flex flex-col items-center justify-center overflow-hidden"
            onClick={() => document.getElementById('videoInput')?.click()}
          >
            {videoPreview ? (
              <div className="flex flex-col items-center">
                <FileVideo className="w-10 h-10 text-primary-500 mb-2" />
                <p className="text-xs text-primary-600 font-medium truncate w-full px-2">Đã chọn video</p>
              </div>
            ) : (
              <>
                <Video className="w-10 h-10 text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">Tải clip ngắn (MP4)</p>
              </>
            )}
            <input 
              id="videoInput" 
              type="file" 
              className="hidden" 
              accept="video/*" 
              onChange={handleVideoChange} 
            />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex justify-between">
          Bộ sưu tập ảnh
          <span className="text-xs text-gray-400 font-normal">Có thể chọn nhiều ảnh</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
          {galleryPreviews.map((preview, idx) => (
            <div key={idx} className="relative aspect-square rounded-md overflow-hidden group border">
              <img src={preview} alt="Gallery" className="w-full h-full object-cover" />
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); removeGalleryPreviewItem(idx); }}
                className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            </div>
          ))}
          <div 
            className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('galleryInput')?.click()}
          >
            <Plus className="w-6 h-6 text-gray-300" />
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
