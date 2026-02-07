"use client";

import React, { useState } from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const bookings = [
  {
    id: 1,
    title: "Italy in 21 Days",
    price: 37240.00,
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1883&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Netherlands",
    price: 11250.00,
    status: "Past Trips",
    image: "https://images.unsplash.com/photo-1550586678-f7225f9d790b?q=80&w=1770&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Kauai Island",
    price: 35250.00,
    status: "Past Trips",
    image: "https://images.unsplash.com/photo-1542259698-b7a4be09f53e?q=80&w=1978&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Paris",
    price: 21250.00,
    status: "Canceled",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1773&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Hawaii Island",
    price: 15020.10,
    status: "Past Trips",
    image: "https://images.unsplash.com/photo-1542259698-b7a4be09f53e?q=80&w=1978&auto=format&fit=crop",
  },
];

export default function BookingsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-grey-50 pt-[var(--header-height)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Sidebar */}
           <div className="lg:col-span-3">
              <ProfileSidebar />
           </div>

           {/* Main Content */}
           <div className="lg:col-span-9 space-y-6">
              <h1 className="header-05-bold text-grey-900">Booking history</h1>

              <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id} 
                      className="bg-white rounded-lg border border-grey-200 overflow-hidden shadow-sm"
                    >
                        <div className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                   <Image 
                                      src={booking.image}
                                      alt={booking.title}
                                      fill
                                      className="object-cover"
                                   />
                                </div>
                                <span className="body-01-medium text-grey-900">{booking.title}</span>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="body-01-medium text-grey-900">
                                    €{booking.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                                
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-semibold",
                                    booking.status === "Upcoming" && "bg-green-100 text-green-700",
                                    booking.status === "Past Trips" && "bg-indigo-100 text-indigo-700",
                                    booking.status === "Canceled" && "bg-red-100 text-red-700"
                                )}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                        
                        {/* Accordion Trigger Area - Separated by line as per screenshot? 
                            Actually screenshot shows "Show more" text button at bottom of card.
                        */}
                        <div className="px-6 py-4 border-t border-grey-100 flex justify-between items-center cursor-pointer hover:bg-grey-50 transition-colors"
                             onClick={() => toggleOpen(booking.id)}
                        >
                             <span className="text-sm text-grey-400">Show more</span>
                             <ChevronDown className={cn("w-4 h-4 text-grey-400 transition-transform", openId === booking.id && "rotate-180")} />
                        </div>

                         {/* Expanded Content Placeholder */}
                         {openId === booking.id && (
                             <div className="px-6 py-4 border-t border-grey-100 bg-grey-50">
                                 <p className="text-sm text-grey-600">Additional booking details go here...</p>
                             </div>
                         )}
                    </div>
                  ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
