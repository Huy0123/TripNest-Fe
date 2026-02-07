import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { FavoriteCard } from "@/components/profile/FavoriteCard";

const favorites = [
  {
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop",
    title: "Italy in 21 Days",
    rating: 4.9,
    dates: "Jan 5 - 26",
    price: 7500,
  },
  {
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    title: "Thailand Heaven",
    rating: 4.65,
    dates: "Jan 5 - 12",
    price: 1090,
    originalPrice: 1199,
  },
  {
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    title: "Japan's Experience",
    rating: 4.65,
    dates: "Jan 5 - 12",
    price: 1099,
    originalPrice: 1199,
  },
   {
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
    title: "A week in Budapest",
    rating: 4.65,
    dates: "Dec 24 - 29",
    price: 1090,
    originalPrice: 1199,
  },
];

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-grey-50 pt-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar */}
           <div className="lg:col-span-3">
              <ProfileSidebar />
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-200 h-full">
                  <h1 className="header-05-bold text-grey-900 mb-6">Favourites</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favorites.map((item) => (
                          <FavoriteCard key={item.title} {...item} />
                      ))}
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
