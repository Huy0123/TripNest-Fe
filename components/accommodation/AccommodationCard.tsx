"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccommodationCardProps {
  location: string;
  duration: string;
  hotelName: string;
  description: string;
  className?: string;
  defaultExpanded?: boolean;
}

export default function AccommodationCard({
  location = "Rome",
  duration = "4 Nights",
  hotelName = "Hotel Raphael",
  description,
  className,
  defaultExpanded = false,
}: AccommodationCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-grey-200 overflow-hidden w-full max-w-4xl transition-all",
        className
      )}
    >
      {/* Header / Trigger */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-grey-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-grey-900">{location}</span>
          <span className="text-grey-400">·</span>
          <span className="text-sm font-medium text-grey-500">({duration})</span>
        </div>
        <button className="text-grey-500 hover:text-grey-700 transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expanded Content */}
      <div
        className={cn(
          "px-6 pb-6 pt-0 animate-fade-in",
          !isExpanded && "hidden"
        )}
      >
        <div className="bg-grey-50 rounded-lg p-4 md:p-6 border border-grey-100">
          <h4 className="text-sm font-bold text-grey-900 mb-2">{hotelName}</h4>
          <p className="text-xs md:text-sm text-grey-600 leading-relaxed">
            {description ||
              "Located near Piazza Navona, this luxury hotel combines eco-friendly principles with elegant Roman charm. Enjoy its rooftop terrace for stunning city views and proximity to major landmarks like the Pantheon and Trevi Fountain."}
          </p>
        </div>
      </div>
    </div>
  );
}
