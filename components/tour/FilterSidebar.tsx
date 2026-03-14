"use client";

import React, { useState } from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";

export default function FilterSidebar() {
  const [stayRating, setStayRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  return (
    <div className="space-y-6">

       {/* Price */}
       <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Price</h3>
            <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="flex gap-4 mb-4">
             <div className="border border-grey-300 rounded-lg p-2 flex-1">
                 <span className="block text-[10px] text-grey-500 uppercase">Min</span>
                 <input type="text" placeholder="0 VNĐ" className="w-full outline-none text-sm text-grey-900 font-medium" />
             </div>
             <div className="border border-grey-300 rounded-lg p-2 flex-1">
                 <span className="block text-[10px] text-grey-500 uppercase">Max</span>
                 <input type="text" placeholder="50.000.000 VNĐ" className="w-full outline-none text-sm text-grey-900 font-medium" />
             </div>
        </div>
        <div className="relative h-2 bg-grey-200 rounded-full">
            <div className="absolute left-0 right-0 h-full bg-grey-200 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-grey-400 rounded-full shadow cursor-pointer"></div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-grey-400 rounded-full shadow cursor-pointer"></div>
        </div>
      </div>

      {/* Length */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Length</h3>
            <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
         <div className="flex justify-between text-xs text-grey-500 mb-2">
            <span>min. 3 days</span>
            <span>21+ days</span>
        </div>
        <div className="relative h-2 bg-grey-200 rounded-full">
             <div className="absolute left-0 w-1/3 h-full bg-grey-400 rounded-l-full"></div>
             <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-grey-400 rounded-full shadow cursor-pointer"></div>
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-grey-400 rounded-full shadow cursor-pointer"></div>
        </div>
      </div>

       {/* Stay Rating */}
       <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Stay rating</h3>
             <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
            {[1, 2, 3, 4, 5].map((s) => {
                const isActive = s <= (hoverRating || stayRating);
                return (
                    <Star 
                        key={s} 
                        className={`w-6 h-6 cursor-pointer transition-colors ${isActive ? 'text-yellow-400 fill-yellow-400' : 'text-grey-300 fill-transparent'}`} 
                        onMouseEnter={() => setHoverRating(s)}
                        onClick={() => setStayRating(stayRating === s ? 0 : s)}
                    />
                );
            })}
        </div>
      </div>

      {/* Stay Option */}
       <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Stay option</h3>
             <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="space-y-3">
             <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="stay" defaultChecked className="w-5 h-5 border-grey-300 text-primary-500 focus:ring-primary-500" />
                <span className="body-02-regular text-grey-700">Any</span>
            </label>
            {["Hotels", "Lodges", "Resorts", "Inns"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="stay" className="w-5 h-5 border-grey-300 text-primary-500 focus:ring-primary-500" />
                    <span className="body-02-regular text-grey-700">{label}</span>
                </label>
            ))}
        </div>
      </div>
    </div>
  );
}
