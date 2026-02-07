import React from "react";
import SearchHeader from "../components/tours/SearchHeader";
import FilterSidebar from "../components/tours/FilterSidebar";
import TourList from "../components/tours/TourList";

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Background - reduced height for search page */}
      <div className="h-[300px] w-full relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero-bg.jpg')", // Ensure this asset exists or use a placeholder
            backgroundColor: "#e0e0e0", // Fallback
          }}
        >
          {/* Overlay to ensure text readability if we had text, but here mostly for style */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Search Header positioned to overlap the bottom of the hero */}
        <div className="absolute -bottom-10 left-0 right-0 px-4">
           <SearchHeader />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-20">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
               <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
               <TourList />
            </div>
         </div>
      </div>
    </div>
  );
}
