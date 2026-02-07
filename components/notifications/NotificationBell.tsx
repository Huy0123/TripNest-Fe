"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Your trip to Italy has been confirmed!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "50% Off Offer",
      message: "Limited time offer for Paris tours.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      title: "Trip Reminder",
      message: "Don't forget to check your itinerary.",
      time: "2 days ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-grey-700 hover:text-primary-600 hover:bg-grey-50 rounded-full transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-grey-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
           <div className="px-4 py-3 border-b border-grey-100 flex justify-between items-center bg-grey-50">
               <h3 className="header-06-bold text-grey-900">Notifications</h3>
               {unreadCount > 0 && (
                   <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{unreadCount} New</span>
               )}
           </div>
           
           <div className="max-h-[300px] overflow-y-auto">
               {notifications.length > 0 ? (
                   notifications.map((notification) => (
                       <div key={notification.id} className={`p-4 border-b border-grey-50 hover:bg-grey-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}>
                           <div className="flex justify-between items-start mb-1">
                               <p className={`text-sm ${!notification.read ? 'font-bold text-grey-900' : 'font-medium text-grey-700'}`}>
                                   {notification.title}
                               </p>
                               <span className="text-xs text-grey-400 shrink-0">{notification.time}</span>
                           </div>
                           <p className="text-sm text-grey-500 line-clamp-2">{notification.message}</p>
                       </div>
                   ))
               ) : (
                   <div className="p-8 text-center text-grey-500 text-sm">
                       No notifications
                   </div>
               )}
           </div>
           
           <div className="p-2 border-t border-grey-100">
               <button className="w-full py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                   Mark all as read
               </button>
           </div>
        </div>
      )}
    </div>
  );
}
