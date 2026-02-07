'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Users, MapPin, Calendar, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

function StatCard({ title, value, change, isPositive, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-grey-200 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="body-02-regular text-grey-600 mb-1">{title}</p>
          <h3 className="header-03-bold text-grey-900">{value}</h3>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center">
          <Icon className="icon-lg text-primary-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="icon-sm text-green-600" />
        ) : (
          <TrendingDown className="icon-sm text-red-600" />
        )}
        <span
          className={`body-02-medium ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change}
        </span>
        <span className="body-02-regular text-grey-600">vs last month</span>
      </div>
    </div>
  );
}

interface RecentActivity {
  id: number;
  type: 'booking' | 'tour' | 'user';
  title: string;
  subtitle: string;
  time: string;
}

const recentActivities: RecentActivity[] = [
  {
    id: 1,
    type: 'booking',
    title: 'New booking for Paris Tour',
    subtitle: 'John Doe - €2,499',
    time: '5 minutes ago',
  },
  {
    id: 2,
    type: 'tour',
    title: 'Tour "Tokyo Experience" updated',
    subtitle: 'Price changed to €1,899',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'user',
    title: 'New user registered',
    subtitle: 'Jane Smith',
    time: '2 hours ago',
  },
  {
    id: 4,
    type: 'booking',
    title: 'Booking cancelled',
    subtitle: 'Rome Tour - Refund processed',
    time: '3 hours ago',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="€45,231"
          change="+12.5%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Total Bookings"
          value="234"
          change="+8.2%"
          isPositive={true}
          icon={Calendar}
        />
        <StatCard
          title="Active Tours"
          value="56"
          change="+3"
          isPositive={true}
          icon={MapPin}
        />
        <StatCard
          title="Total Users"
          value="1,429"
          change="-2.4%"
          isPositive={false}
          icon={Users}
        />
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-grey-200 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="header-05-bold text-grey-900">Revenue Overview</h3>
            <select className="px-3 py-2 border border-grey-300 rounded-lg body-02-regular text-grey-700 focus-ring">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Simple bar chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 65, 45, 80, 55, 90, 75].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary-500 rounded-t-lg transition-all hover:bg-primary-600"
                  style={{ height: `${height}%` }}
                />
                <span className="caption-regular text-grey-600">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-grey-200 flex items-center justify-between">
            <div>
              <p className="caption-regular text-grey-600 mb-1">Average Daily Revenue</p>
              <p className="header-06-bold text-grey-900">€6,461</p>
            </div>
            <div>
              <p className="caption-regular text-grey-600 mb-1">Peak Day</p>
              <p className="header-06-bold text-grey-900">Saturday</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-grey-200 shadow-card">
          <h3 className="header-05-bold text-grey-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                    activity.type === 'booking'
                      ? 'bg-blue-500'
                      : activity.type === 'tour'
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="body-02-medium text-grey-900 truncate">
                    {activity.title}
                  </p>
                  <p className="caption-regular text-grey-600 truncate">
                    {activity.subtitle}
                  </p>
                  <p className="caption-regular text-grey-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-center body-02-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>

      {/* Top Tours Table */}
      <div className="bg-white rounded-xl p-6 border border-grey-200 shadow-card">
        <h3 className="header-05-bold text-grey-900 mb-4">Top Performing Tours</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-grey-200">
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Tour Name</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Destination</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Bookings</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Revenue</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Paris Discovery', destination: 'France', bookings: 45, revenue: '€112,455', status: 'Active' },
                { name: 'Tokyo Experience', destination: 'Japan', bookings: 38, revenue: '€95,200', status: 'Active' },
                { name: 'Rome Adventure', destination: 'Italy', bookings: 32, revenue: '€79,680', status: 'Active' },
                { name: 'Amsterdam Tour', destination: 'Netherlands', bookings: 28, revenue: '€58,800', status: 'Active' },
                { name: 'Barcelona Highlights', destination: 'Spain', bookings: 25, revenue: '€52,500', status: 'Active' },
              ].map((tour, index) => (
                <tr key={index} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-3 px-4 body-01-medium text-grey-900">{tour.name}</td>
                  <td className="py-3 px-4 body-02-regular text-grey-700">{tour.destination}</td>
                  <td className="py-3 px-4 body-02-regular text-grey-700">{tour.bookings}</td>
                  <td className="py-3 px-4 body-02-bold text-grey-900">{tour.revenue}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 rounded-full bg-green-100 text-green-700 caption-medium">
                      {tour.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
