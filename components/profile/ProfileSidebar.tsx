"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CalendarDays,
  Users,
  Heart,
  LifeBuoy,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    icon: User,
    label: "Personal data",
    href: "/profile",
  },
  {
    icon: CalendarDays,
    label: "Booking history",
    href: "/bookings",
  },
  {
    icon: Users,
    label: "Companions",
    href: "/companions",
  },
  {
    icon: Heart,
    label: "Favourites",
    href: "/favorites",
  },
  {
    icon: LifeBuoy,
    label: "Help",
    href: "/help",
  },
  {
    icon: Settings,
    label: "Account settings",
    href: "/settings",
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* User Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-200 flex items-center gap-4">
        <div className="relative w-12 h-12">
            <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
            alt="Anna Smith"
            fill
            className="rounded-full object-cover"
            />
        </div>
        
        <div className="overflow-hidden">
          <h3 className="header-06-bold text-grey-900 truncate">Anna Smith</h3>
          <p className="body-02-regular text-grey-500 truncate">
            Anna.smith@gmail.com
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-grey-200 overflow-hidden">
        <nav className="flex flex-col">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-6 py-4 transition-colors border-b border-grey-100 last:border-0",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-grey-600 hover:bg-grey-50 hover:text-grey-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-grey-500")} />
                  <span className="body-01-medium">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
         <div className="bg-white rounded-lg shadow-sm border border-grey-200 overflow-hidden">
        <button className="w-full flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="body-01-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}
