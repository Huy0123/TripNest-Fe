"use client";

import React, { useState } from "react";
import { Plane, ChevronDown, ChevronUp, Briefcase, Utensils, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FlightCardProps {
  originCode: string; // e.g., "LGW"
  originCity: string; // e.g., "London"
  destinationCode: string; // e.g., "FCO"
  destinationCity: string; // e.g., "Rome"
  departureTime: string; // e.g., "12:00"
  departureDate: string; // e.g., "5 Jan 2025"
  arrivalTime: string; // e.g., "15:25"
  arrivalDate: string; // e.g., "5 Jan 2025"
  duration: string; // e.g., "2 hours & 25 minutes"
  airline?: string;
  details?: {
    type: string; // e.g. "Basic Economy"
    baggage: string; // e.g. "1 Small bag, 1 Cabin carry-on..."
    fareIncluded: boolean;
    mealIncluded: boolean;
  };
  className?: string; // Support for custom classes
}

export default function FlightCard({
  originCode,
  originCity,
  destinationCode,
  destinationCity,
  departureTime,
  departureDate,
  arrivalTime,
  arrivalDate,
  duration,
  className,
  details = {
    type: "Basic Economy",
    baggage: "1 Small bag, 1 Cabin carry-on (8 Kg), and 1 check-in bag (25 Kg)",
    fareIncluded: true,
    mealIncluded: true,
  },
}: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-grey-200 overflow-hidden hover:shadow-sm transition-shadow w-full max-w-4xl",
        className
      )}
    >
      {/* Main Card Content */}
      <div className="p-6">
        {/* Top Row: Route & Plane */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <h3 className="text-lg md:text-xl font-bold text-grey-900">
              {originCity} <span className="text-grey-500 font-normal">({originCode})</span>
            </h3>
          </div>

          <div className="flex-1 px-4 md:px-12 flex items-center gap-4">
            <div className="h-px bg-grey-300 flex-1 border-t border-dashed border-grey-300"></div>
            <Plane className="w-5 h-5 text-grey-400 rotate-90 transform" />
            <div className="h-px bg-grey-300 flex-1 border-t border-dashed border-grey-300"></div>
          </div>

          <div className="text-right">
             <h3 className="text-lg md:text-xl font-bold text-grey-900">
              {destinationCity} <span className="text-grey-500 font-normal">({destinationCode})</span>
            </h3>
          </div>
        </div>

        {/* Bottom Row: Times & Duration */}
        <div className="flex justify-between items-end">
          <div className="text-left">
            <p className="text-grey-900 font-medium text-lg mb-1">{departureTime}</p>
            <p className="text-grey-500 text-sm">{departureDate}</p>
          </div>

          <div className="text-center mb-1">
            <p className="text-grey-500 text-xs md:text-sm bg-white px-2 relative z-10">
              {duration}
            </p>
          </div>

          <div className="text-right">
            <p className="text-grey-900 font-medium text-lg mb-1">{arrivalTime}</p>
            <p className="text-grey-500 text-sm">{arrivalDate}</p>
          </div>
        </div>
      </div>

      {/* Expand/Collapse Trigger */}
      <div
        className="px-6 py-3 border-t border-grey-100 flex items-center justify-between cursor-pointer hover:bg-grey-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-xs md:text-sm font-medium text-grey-400">
          {isExpanded ? "Less detail" : "More detail"}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-grey-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-grey-400" />
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-grey-50 px-6 py-6 animate-fade-in border-t border-grey-100">
          <div className="space-y-3">
             {/* Class Type */}
            <div className="flex items-center gap-3">
               <Plane className="w-4 h-4 text-grey-500" />
               <span className="text-sm font-medium text-grey-700">{details.type}</span>
            </div>
            
            {/* Baggage */}
            <div className="flex items-start gap-3">
               <Briefcase className="w-4 h-4 text-grey-500 shrink-0 mt-0.5" />
               <span className="text-sm text-grey-600">{details.baggage}</span>
            </div>

            {/* Fare Included */}
             {details.fareIncluded && (
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-4 h-4 text-grey-500" />
                   <span className="text-sm text-grey-600">Flight fare and taxes included</span>
                </div>
             )}
            
            {/* Meal Included */}
            {details.mealIncluded && (
                <div className="flex items-center gap-3">
                   <Utensils className="w-4 h-4 text-grey-500" />
                   <span className="text-sm text-grey-600">1 meal included</span>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
