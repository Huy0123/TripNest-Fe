import React from "react";
import { Star, ChevronUp, ChevronDown } from "lucide-react";

export default function FilterSidebar() {
  return (
    <div className="space-y-6">
      {/* Compare Tours */}
      <div className="bg-white rounded-xl border border-grey-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="header-06-bold text-grey-900">Compare tours</h3>
          <p className="body-02-regular text-grey-500">Compare 5 tours side by side</p>
        </div>
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-grey-300"/>
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-grey-300 cursor-pointer"></label>
        </div>
      </div>

      {/* Filter By */}
      <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Filter By</h3>
            <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="space-y-3">
            {["Discover tours by type", "Nature and Outdoors", "Urban and City life", "Cultural and Heritage", "Family Friendly", "Luxury and Exclusive"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-grey-300 text-primary-500 focus:ring-primary-500" />
                    <span className="body-02-regular text-grey-700 group-hover:text-primary-600 transition-colors">{label}</span>
                </label>
            ))}
        </div>
      </div>

       {/* Price */}
       <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Price</h3>
            <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="flex gap-4 mb-4">
             <div className="border border-grey-300 rounded-lg p-2 flex-1">
                 <span className="block text-[10px] text-grey-500 uppercase">Min</span>
                 <input type="text" value="0 $" className="w-full outline-none text-sm text-grey-900 font-medium" readOnly />
             </div>
             <div className="border border-grey-300 rounded-lg p-2 flex-1">
                 <span className="block text-[10px] text-grey-500 uppercase">Max</span>
                 <input type="text" value="0 $" className="w-full outline-none text-sm text-grey-900 font-medium" readOnly />
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
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 text-grey-400 fill-transparent hover:text-yellow-400 hover:fill-yellow-400 cursor-pointer transition-colors" />
            ))}
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
      
       {/* Accessibility */}
       <div className="bg-white rounded-xl border border-grey-200 p-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer">
            <h3 className="header-06-bold text-grey-900">Accessibility</h3>
             <ChevronUp className="w-5 h-5 text-grey-600" />
        </div>
        <div className="space-y-3">
            {["Wheelchair Accessible", "Service Animal Friendly", "Assistive Listening Devices", "Accessible Restrooms"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-grey-300 text-primary-500 focus:ring-primary-500" />
                    <span className="body-02-regular text-grey-700 group-hover:text-primary-600 transition-colors">{label}</span>
                </label>
            ))}
        </div>
      </div>


    </div>
  );
}
