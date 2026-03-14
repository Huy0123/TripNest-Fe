"use client";

import Link from "next/link";
import Image from "next/image";
import { User, MapPin, Heart, LogOut } from "lucide-react";

interface UserMenuContentProps {
  user: any;
  onLogout: () => void;
  onItemClick?: () => void;
  variant?: "dropdown" | "mobile";
}

export default function UserMenuContent({
  user,
  onLogout,
  onItemClick,
  variant = "dropdown",
}: UserMenuContentProps) {
  const isMobile = variant === "mobile";

  const links = [
    { label: "Hồ sơ của tôi", href: "/profile", icon: User },
    { label: "Chuyến đi của tôi", href: "/bookings", icon: MapPin },
    { label: "Danh sách yêu thích", href: "/favorites", icon: Heart },
  ];

  if (isMobile) {
    return (
      <div className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className="flex items-center px-6 py-4 hover:bg-grey-50 transition-colors text-grey-800 font-semibold"
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => {
            onLogout();
            onItemClick?.();
          }}
          className="w-full flex items-center px-6 py-4 hover:bg-red-50 transition-colors text-red-600 font-bold"
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-4 border-b border-grey-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold shrink-0 overflow-hidden border border-primary-100">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.firstName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg">{user.firstName?.charAt(0) || "U"}</span>
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-grey-900 truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-grey-500 truncate mt-0.5">{user.email}</p>
        </div>
      </div>

      <div className="p-1.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-grey-50 transition-colors rounded-lg group"
          >
            <link.icon className="w-4 h-4 text-grey-400 group-hover:text-primary-600" />
            <span className="text-sm font-medium text-grey-700 group-hover:text-grey-900">
              {link.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="border-t border-grey-100 mt-1.5 p-1.5">
        <button
          onClick={() => {
            onLogout();
            onItemClick?.();
          }}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 transition-colors w-full text-left rounded-lg group"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold text-red-600">Đăng xuất</span>
        </button>
      </div>
    </>
  );
}
