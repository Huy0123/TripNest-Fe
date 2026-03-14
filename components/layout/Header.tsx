"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import UserMenuContent from "./UserMenuContent";

const navbarItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Gói tour", href: "/tour" },
  { name: "Tin tức", href: "/blog" },
  { name: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-grey-200 z-50 py-4 font-inter">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary-600 tracking-tight">
          Trip Nest
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navbarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-all py-1 relative ${
                  isActive ? "text-primary-600" : "text-grey-700 hover:text-primary-600"
                }`}
              >
                {item.name}
                {isActive && (
                  <div className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/help"
              className={`flex items-center text-sm font-semibold transition-all relative ${
                pathname === "/help" ? "text-primary-600" : "text-grey-700 hover:text-primary-600"
              }`}
            >
              <span>Trợ giúp</span>
              {pathname === "/help" && (
                <div className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-primary-600 rounded-full" />
              )}
            </Link>

            {!user ? (
              <Link
                href="/signin"
                className="py-2 px-5 text-sm font-bold bg-primary-600 text-white hover:bg-primary-700 transition-all rounded-full shadow-sm"
              >
                Đăng nhập
              </Link>
            ) : (
              /* Logged In - User Menu */
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 py-1 px-1 rounded-full border border-grey-200 hover:border-primary-200 transition-all cursor-pointer bg-grey-50"
                  aria-expanded={showUserMenu}
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold overflow-hidden">
                    {(user as any).avatar ? (
                      <Image
                        src={(user as any).avatar}
                        alt={user.firstName}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm">{user.firstName?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-grey-500 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-grey-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <UserMenuContent 
                      user={user} 
                      onLogout={handleLogout} 
                      onItemClick={() => setShowUserMenu(false)} 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-grey-50 border border-grey-100 transition-all"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6 text-grey-800" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
}
