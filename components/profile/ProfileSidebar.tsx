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
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

const sidebarItems = [
  {
    icon: User,
    label: "Thông tin cá nhân",
    href: "/profile",
  },
  {
    icon: CalendarDays,
    label: "Lịch sử đặt chỗ",
    href: "/bookings",
  },
  {
    icon: Heart,
    label: "Yêu thích",
    href: "/favorites",
  },
  {
    icon: LifeBuoy,
    label: "Trợ giúp",
    href: "/help",
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-grey-200 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center border border-primary-200 text-primary-700 font-bold">
          {user && (user as any).avatar ? (
             <Image
             src={(user as any).avatar}
             alt={user.name || user.firstName || "User"}
             fill
             className="rounded-full object-cover"
             />
          ) : (
             <span className="text-xl">{user?.firstName?.charAt(0) || 'U'}</span>
          )}
        </div>
        
        <div className="overflow-hidden">
          <h3 className="header-06-bold text-grey-900 truncate">
            {user ? (user.name || `${user.firstName} ${user.lastName}`) : 'Khách'}
          </h3>
          <p className="body-02-regular text-grey-500 truncate">
            {user ? user.email : 'Chưa đăng nhập'}
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
                    ? "text-primary-600 bg-primary-50"
                    : "text-grey-600 hover:bg-grey-50 hover:text-grey-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-grey-500")} />
                  <span className="body-01-medium">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="w-5 h-5 text-primary-600" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
         <div className="bg-white rounded-lg shadow-sm border border-grey-200 overflow-hidden">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-4 text-red-500 hover:bg-red-50 transition-colors"
        >
            <LogOut className="w-5 h-5" />
            <span className="body-01-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
