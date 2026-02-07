import React from "react";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

interface FavoriteCardProps {
  image: string;
  title: string;
  rating: number;
  dates: string;
  price: number;
  originalPrice?: number;
}

export function FavoriteCard({
  image,
  title,
  rating,
  dates,
  price,
  originalPrice,
}: FavoriteCardProps) {
  return (
    <div className="group rounded-xl overflow-hidden bg-white border border-grey-200 hover:shadow-lg transition-all cursor-pointer">
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Helper heart icon (optional, often on Favorites page to Un-favorite) 
            Screenshot doesn't explicitly show it on the card, but it's common. 
            Actually, let's omit it if not in screenshot, but usually Favorites have a "remove" button.
            I will confirm if screenshot has it. Detailed look: I don't see a heart icon ON the image in the screenshot. 
            But standard Tour Cards usually have it. I'll stick to the screenshot clean look.
        */}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
           <h3 className="header-06-bold text-grey-900 line-clamp-1">{title}</h3>
           <div className="flex items-center gap-1 shrink-0">
               <Star className="w-3 h-3 fill-current text-grey-900" />
               <span className="text-xs font-bold text-grey-900">{rating}</span>
           </div>
        </div>
        
        <div className="flex items-end justify-between">
           <p className="text-sm text-grey-600">{dates}</p>
           
           <div className="text-right">
                <span className="text-xs text-grey-500 mr-1">From</span>
                {originalPrice && (
                    <span className="text-xs text-grey-400 line-through mr-1">€{originalPrice}</span>
                )}
                <span className="text-sm font-bold text-orange-600">€{price}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
