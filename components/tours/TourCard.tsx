import React from "react";
import Image from "next/image";
import { Heart, Star, MapPin, Clock, Hotel, Plane, Bus, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourCardProps {
  image: string;
  title: string;
  tags?: string[];
  departureDates: { start: string; end: string }[];
  price: number;
  rating: number;
  reviews: number;
  stars: number;
  hotelName: string;
  duration: { nights: number; days: number };
  onlyLeft?: number;
}

export default function TourCard({
  image,
  title,
  tags = [],
  departureDates,
  price,
  rating,
  reviews,
  stars,
  hotelName,
  duration,
  onlyLeft,
}: TourCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-grey-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="relative w-full md:w-[300px] h-[240px] md:h-auto shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          aria-label="Add to favorites"
          title="Add to favorites"
        >
          <Heart className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
           <div className="flex justify-between items-start mb-2">
               <div>
                  <h3 className="header-04-bold text-grey-900 mb-2">{title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full flex items-center gap-1">
                              {tag === 'Family Friendly' && '👨‍👩‍👧‍👦'} 
                              {tag}
                          </span>
                      ))}
                  </div>
               </div>
           </div>

           <div className="mb-4">
               <p className="text-sm text-grey-500 mb-1">Available Departure Dates</p>
               <div className="flex flex-wrap gap-4 text-grey-800 text-sm font-medium">
                   {departureDates.map((date, i) => (
                       <span key={i} className="flex items-center gap-2">
                           {date.start} <span className="text-grey-400">|</span> {date.end}
                           {i === 0 && <span className="text-grey-500 font-normal">+3 more</span>}
                       </span>
                   ))}
               </div>
           </div>

           <div className="flex gap-4 mb-6">
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-lg text-primary-700 text-xs font-medium">
                   <Hotel className="w-3.5 h-3.5" /> Hotel
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-lg text-primary-700 text-xs font-medium">
                   <Plane className="w-3.5 h-3.5" /> Flight
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-lg text-primary-700 text-xs font-medium">
                   <Bus className="w-3.5 h-3.5" /> Transfer
               </div>
               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-lg text-primary-700 text-xs font-medium">
                   <Utensils className="w-3.5 h-3.5" /> Meal
               </div>
           </div>
        </div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-grey-100 gap-4">
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-grey-700">
                <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-grey-400" />
                    <span className="font-bold">{rating}</span> 
                    <span className="text-grey-500">({reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <Hotel className="w-4 h-4 text-grey-400" />
                   <span>{stars} Star Hotel</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-grey-400" />
                    <span>{hotelName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-grey-400" />
                    <span>{duration.nights} Nights and {duration.days} Days</span>
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                 {onlyLeft && (
                     <span className={cn(
                         "px-3 py-1 text-xs font-bold rounded-full",
                         onlyLeft <= 5 ? "bg-red-500 text-white" : // Very low - Red
                         onlyLeft <= 10 ? "bg-orange-500 text-white" : // Low - Orange
                         "bg-primary-100 text-primary-700" // Normal - Brand Color
                     )}>
                         {onlyLeft <= 10 ? `Only ${onlyLeft} left` : `${onlyLeft} Left`}
                     </span>
                 )}
                 <div className="text-right">
                     <span className="text-grey-500 text-xs font-medium">From </span>
                     <span className="text-primary-600 header-05-bold">€{price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
