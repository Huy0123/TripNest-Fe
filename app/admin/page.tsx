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
        <span className="body-02-regular text-grey-600">so với tháng trước</span>
      </div>
    </div>
  );
}


export default function AdminDashboard() {
  const [revenueRange, setRevenueRange] = React.useState<'week' | 'month' | 'year'>('week');

  // Xử lý mock data cho từng loại range
  const rangesData = {
    'week': {
      values: [40, 65, 45, 80, 55, 90, 75],
      labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'],
      avgRevenue: '€6,461',
      peakDay: 'Thứ 7'
    },
    'month': {
      // Chia 30 ngày thành 6 khoảng, mỗi khoảng 5 ngày
      values: [50, 45, 60, 55, 75, 95],
      labels: ['1-5', '6-10', '11-15', '16-20', '21-25', '26-30'],
      avgRevenue: '€5,890',
      peakDay: 'Ngày 26-30'
    },
    'year': {
      // 12 tháng
      values: [40, 50, 45, 60, 70, 65, 85, 80, 75, 90, 95, 100],
      labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
      avgRevenue: '€61,105',
      peakDay: 'Tháng 12'
    }
  };

  const currentChartData = rangesData[revenueRange];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng doanh thu"
          value="€45,231"
          change="+12.5%"
          isPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Tổng lượt đặt"
          value="234"
          change="+8.2%"
          isPositive={true}
          icon={Calendar}
        />
        <StatCard
          title="Số lượng Tour"
          value="56"
          change="+3"
          isPositive={true}
          icon={MapPin}
        />
        <StatCard
          title="Tổng người dùng"
          value="1,429"
          change="-2.4%"
          isPositive={false}
          icon={Users}
        />
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-grey-200 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="header-05-bold text-grey-900">Tổng quan doanh thu</h3>
            <select 
              className="px-3 py-2 border border-grey-300 rounded-lg body-02-regular text-grey-700 focus-ring"
              value={revenueRange}
              onChange={(e) => setRevenueRange(e.target.value as 'week' | 'month' | 'year')}
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Năm này</option>
            </select>
          </div>
          
          {/* Simple bar chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {currentChartData.values.map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary-500 rounded-t-lg transition-all hover:bg-primary-600"
                  style={{ height: `${height}%` }}
                />
                <span className="caption-regular text-grey-600 text-xs">
                  {currentChartData.labels[index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-grey-200 flex items-center justify-between">
            <div>
              <p className="caption-regular text-grey-600 mb-1">Doanh thu trung bình</p>
              <p className="header-06-bold text-grey-900">{currentChartData.avgRevenue}</p>
            </div>
            <div>
              <p className="caption-regular text-grey-600 mb-1">Thời gian cao điểm</p>
              <p className="header-06-bold text-grey-900">{currentChartData.peakDay}</p>
            </div>
          </div>
        </div>


      </div>

      {/* Top Tours Table */}
      <div className="bg-white rounded-xl p-6 border border-grey-200 shadow-card">
        <h3 className="header-05-bold text-grey-900 mb-4">Tour hiệu quả nhất</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-grey-200">
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Tên Tour</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Điểm đến</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Lượt đặt</th>
                <th className="text-left py-3 px-4 body-02-medium text-grey-600">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Paris Discovery', destination: 'France', bookings: 45, revenue: '€112,455' },
                { name: 'Tokyo Experience', destination: 'Japan', bookings: 38, revenue: '€95,200' },
                { name: 'Rome Adventure', destination: 'Italy', bookings: 32, revenue: '€79,680' },
                { name: 'Amsterdam Tour', destination: 'Netherlands', bookings: 28, revenue: '€58,800' },
                { name: 'Barcelona Highlights', destination: 'Spain', bookings: 25, revenue: '€52,500' },
              ].map((tour, index) => (
                <tr key={index} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-3 px-4 body-01-medium text-grey-900">{tour.name}</td>
                  <td className="py-3 px-4 body-02-regular text-grey-700">{tour.destination}</td>
                  <td className="py-3 px-4 body-02-regular text-grey-700">{tour.bookings}</td>
                  <td className="py-3 px-4 body-02-bold text-grey-900">{tour.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
