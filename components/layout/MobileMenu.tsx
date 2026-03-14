"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
}


export default function MobileMenu({
  isOpen,
  onClose,
  user,
  onLogout,
}: MobileMenuProps) {
  const handleClose = () => {
    onClose();
  };

  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Gói tour", href: "/tour" },
    { name: "Tin tức", href: "/blog" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
          onClick={handleClose}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with User Info or Default Title */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-grey-100 bg-grey-50">
          {!user ? (
            <h2 className="text-xl font-bold text-grey-900">Menu</h2>
          ) : (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold overflow-hidden border-2 border-white shadow-sm shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">{user.firstName?.charAt(0) || "U"}</span>
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-base font-bold text-grey-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-grey-500 truncate mt-0.5">{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleClose} className="p-2 hover:bg-grey-100 rounded-lg transition-colors shrink-0">
            <X className="w-6 h-6 text-grey-800" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            {/* Main Navigation */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className="flex items-center justify-between px-6 py-4 hover:bg-grey-50 transition-colors group"
              >
                <span className="text-base font-semibold text-grey-800 group-hover:text-primary-600">
                  {item.name}
                </span>
                <ChevronRight className="w-5 h-5 text-grey-400 group-hover:text-primary-600" />
              </Link>
            ))}

            {/* User Specific Links - only if logged in */}
            {user && (
              <>
                <div className="mx-6 my-2 border-t border-grey-100"></div>
                <Link
                  href="/profile"
                  onClick={handleClose}
                  className="flex items-center justify-between px-6 py-4 hover:bg-grey-50 transition-colors group"
                >
                  <span className="text-base font-semibold text-grey-800 group-hover:text-primary-600">
                    Hồ sơ của tôi
                  </span>
                  <ChevronRight className="w-5 h-5 text-grey-400 group-hover:text-primary-600" />
                </Link>
                <Link
                  href="/bookings"
                  onClick={handleClose}
                  className="flex items-center justify-between px-6 py-4 hover:bg-grey-50 transition-colors group"
                >
                  <span className="text-base font-semibold text-grey-800 group-hover:text-primary-600">
                    Chuyến đi của tôi
                  </span>
                  <ChevronRight className="w-5 h-5 text-grey-400 group-hover:text-primary-600" />
                </Link>
                <Link
                  href="/favorites"
                  onClick={handleClose}
                  className="flex items-center justify-between px-6 py-4 hover:bg-grey-50 transition-colors group"
                >
                  <span className="text-base font-semibold text-grey-800 group-hover:text-primary-600">
                    Danh sách yêu thích
                  </span>
                  <ChevronRight className="w-5 h-5 text-grey-400 group-hover:text-primary-600" />
                </Link>
              </>
            )}

            {/* Login/Logout Button */}
            <div className="px-6 py-6 mt-2">
              {!user ? (
                <Link
                  href="/signin"
                  onClick={handleClose}
                  className="flex items-center justify-center py-3 bg-primary-600 text-white font-bold rounded-xl shadow-sm hover:bg-primary-700 transition-all w-full"
                >
                  Đăng nhập
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onLogout();
                    handleClose();
                  }}
                  className="flex items-center justify-center py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all w-full"
                >
                  Đăng xuất
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer Area */}
        <div className="border-t border-grey-100 px-6 py-6 bg-white">
          <Link
            href="/help"
            onClick={handleClose}
            className="flex items-center gap-2 text-sm text-grey-600 font-bold hover:text-primary-600 transition-colors"
          >
            Trợ giúp & Hỗ trợ
          </Link>
          <p className="text-[10px] text-grey-400 mt-4">© 2026 Trip Nest. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </>
  );
}
