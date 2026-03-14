"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface TourImageGalleryProps {
  images: { id: string; imageUrl: string; isMain: boolean }[];
  tourName: string;
}

export default function TourImageGallery({ images, tourName }: TourImageGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback if no images
  const allImages = images.length > 0 ? images : [{ id: 'fallback', imageUrl: "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1200", isMain: true }];
  
  // Extract up to 5 images for the hero section
  const mainImage = allImages.find(img => img.isMain) || allImages[0];
  const galleryImages = allImages.filter(img => img.id !== mainImage?.id).slice(0, 4);

  // If there are less than 5 images total, we just pad them with the existing ones for the UI layout
  const paddedImages = [...galleryImages];
  while (paddedImages.length < 4 && allImages.length > 1) {
    paddedImages.push(allImages[paddedImages.length % allImages.length]);
  }

  const defaultImage = "https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1200";

  const openGallery = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="w-full bg-white md:bg-transparent">
        <div className="max-w-7xl mx-auto pt-6 md:pt-12 px-4 lg:px-8">
          {/* Mobile View - Just a main image or slider */}
          <div 
            className="block md:hidden relative w-full h-[250px] sm:h-[350px]"
            onClick={() => openGallery(0)}
          >
            <Image
              src={mainImage?.imageUrl || defaultImage}
              alt={tourName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-black/50 transition-colors">
               <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
              Xem Tất Cả Hình Ảnh {allImages.length}
            </div>
          </div>

          {/* Desktop View - 5 Grid Layout */}
          <div className="hidden md:block w-full">
            <div className="bg-white p-2 rounded-[20px] shadow-sm">
              <div className="flex flex-row gap-2 h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden">
                {/* Main Left Image */}
                <div 
                  className="relative w-1/2 h-full group cursor-pointer"
                  onClick={() => openGallery(0)}
                >
                  <Image
                    src={mainImage?.imageUrl || defaultImage}
                    alt={tourName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  {/* Play Button Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:bg-orange-500/80 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Right 4 Grid */}
                <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2">
                  {paddedImages.map((img, index) => {
                    // Find the actual index in allImages array
                    const realIndex = allImages.findIndex(i => i.id === img.id);
                    // If not found (fallback), default to index + 1
                    const targetIndex = realIndex !== -1 ? realIndex : index + 1;
                    
                    return (
                      <div 
                        key={`${img.id}-${index}`} 
                        className="relative w-full h-full group cursor-pointer overflow-hidden"
                        onClick={() => openGallery(targetIndex)}
                      >
                        <Image
                          src={img.imageUrl || defaultImage}
                          alt={tourName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        
                        {/* View All Overlay on the last image */}
                        {index === 3 && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                            <span className="text-white font-bold flex items-center gap-2">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 3H10V10H3V3ZM5 5V8H8V5H5Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14 3H21V10H14V3ZM16 5V8H19V5H16Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 14H10V21H3V14ZM5 16V19H8V16H5Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M14 14H21V21H14V14ZM16 16V19H19V16H16Z" fill="white"/>
                              </svg>
                              Xem Tất Cả Hình Ảnh
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal - Popup Style */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent aria-describedby="gallery-description" className="sm:max-w-5xl md:max-w-6xl w-[95vw] max-h-[90vh] p-0 bg-white border-0 flex flex-col focus:outline-none rounded-2xl overflow-hidden shadow-2xl z-[100]">
          <DialogTitle className="sr-only">Image Gallery</DialogTitle>
          <p id="gallery-description" className="sr-only">Tour image gallery popup</p>
          
          {/* Header Area inside Modal */}
          <div className="flex justify-between items-center p-4 bg-white z-10 border-b border-gray-100">
             <div className="text-lg font-bold text-gray-900">
                Hình ảnh Tour
             </div>
             <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Main Image Slider Area (Left/Top) */}
            <div className="relative flex-1 bg-white flex flex-col items-center justify-center p-4">
              
              {/* Main Current Image */}
              <div className="relative w-full h-full min-h-[300px] md:min-h-[500px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <Image
                  src={allImages[activeIndex]?.imageUrl || defaultImage}
                  alt={`Gallery Image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors z-10 group border border-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-orange-500" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors z-10 group border border-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800 group-hover:text-orange-500" />
                  </button>
                </>
              )}

              {/* Image Counter Badge overlayed on image */}
              <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2">
                Tất cả hình ảnh và video ({activeIndex + 1}/{allImages.length})
              </div>
            </div>

            {/* Right Sidebar Details */}
            <div className="w-full md:w-[320px] lg:w-[380px] h-full bg-white border-l border-gray-100 flex flex-col">
              <div className="p-6 overflow-y-auto flex-1">
                {/* Tour Title info */}
                <h2 className="text-[17px] font-bold text-gray-900 leading-snug mb-3">
                  {tourName}
                </h2>
                
                {/* Score / Rating */}
                <div className="flex items-center gap-2 pb-6 border-b border-gray-100">
                  <span className="font-bold text-gray-900">8.6/10</span>
                  <span className="text-sm text-gray-500">(Từ 2.790 đánh giá)</span>
                </div>
              </div>

              {/* Bottom Checkout / Ticket Area */}
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="text-orange-500 font-medium mb-3 text-sm">Kiểm tra ngay</div>
                <button className="w-full bg-[#fa5b32] hover:bg-[#e04f28] text-white font-bold py-3 px-4 rounded-xl transition-colors text-[15px]">
                  Xem vé
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails List */}
          <div className="w-full h-24 md:h-28 bg-white border-t border-gray-100 p-3 md:p-4 flex gap-2 md:gap-3 overflow-x-auto snap-x scrollbar-hide">
              {allImages.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-full w-[100px] md:w-[120px] flex-shrink-0 cursor-pointer rounded-lg overflow-hidden snap-center transition-all ${activeIndex === idx ? 'border-[3px] border-orange-500 opacity-100' : 'opacity-60 hover:opacity-100 border border-gray-200'}`}
                >
                  <Image src={img.imageUrl || defaultImage} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
