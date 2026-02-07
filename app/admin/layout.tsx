'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';

interface AdminSidebarProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Tours',
    href: '/admin/tours',
    icon: MapPin,
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminLayout({ children }: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-grey-200 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-grey-200">
          <Link href="/admin" className="header-05-bold text-primary-600">
            Trip Nest Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-grey-100 rounded-md transition-colors"
          >
            <X className="icon-md" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-grey-700 hover:bg-grey-100'
                }`}
              >
                <Icon className="icon-md" />
                <span className="body-01-medium">{item.name}</span>
                {isActive && (
                  <ChevronRight className="icon-sm ml-auto text-primary-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-grey-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-grey-50">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="body-02-bold text-primary-700">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="body-02-bold text-grey-900 truncate">Admin User</p>
              <p className="caption-regular text-grey-600 truncate">admin@tripnest.com</p>
            </div>
          </div>
          <button className="mt-2 w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="icon-sm" />
            <span className="body-02-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-grey-200 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-grey-100 rounded-lg transition-colors"
          >
            <Menu className="icon-lg" />
          </button>
          <div className="flex-1 lg:ml-0 ml-4">
            <h1 className="header-05-bold text-grey-900">
              {menuItems.find((item) => item.href === pathname)?.name || 'Admin'}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
