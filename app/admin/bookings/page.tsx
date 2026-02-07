'use client';

import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Booking {
  id: number;
  bookingId: string;
  customerName: string;
  email: string;
  tourName: string;
  date: string;
  guests: number;
  totalAmount: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

const bookings: Booking[] = [
  { id: 1, bookingId: 'BK-001', customerName: 'John Doe', email: 'john@example.com', tourName: 'Paris Discovery', date: '2026-02-15', guests: 2, totalAmount: 4998, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 2, bookingId: 'BK-002', customerName: 'Jane Smith', email: 'jane@example.com', tourName: 'Tokyo Experience', date: '2026-03-20', guests: 1, totalAmount: 3299, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 3, bookingId: 'BK-003', customerName: 'Bob Johnson', email: 'bob@example.com', tourName: 'Rome Adventure', date: '2026-02-28', guests: 4, totalAmount: 7596, status: 'Pending', paymentStatus: 'Pending' },
  { id: 4, bookingId: 'BK-004', customerName: 'Alice Brown', email: 'alice@example.com', tourName: 'Amsterdam Tour', date: '2026-01-10', guests: 2, totalAmount: 3198, status: 'Completed', paymentStatus: 'Paid' },
  { id: 5, bookingId: 'BK-005', customerName: 'Charlie Wilson', email: 'charlie@example.com', tourName: 'Barcelona Highlights', date: '2026-04-05', guests: 3, totalAmount: 6297, status: 'Cancelled', paymentStatus: 'Refunded' },
  { id: 6, bookingId: 'BK-006', customerName: 'Diana Martinez', email: 'diana@example.com', tourName: 'London Explorer', date: '2026-03-12', guests: 2, totalAmount: 4398, status: 'Confirmed', paymentStatus: 'Paid' },
];

export default function BookingsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-grey-100 text-grey-700';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Refunded':
        return 'bg-grey-200 text-grey-700';
      default:
        return 'bg-grey-100 text-grey-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Bookings Management</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            View and manage all customer bookings
          </p>
        </div>
        <Button size="lg" variant="outline" className="gap-2">
          <Download className="icon-sm" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Total Bookings</p>
          <p className="header-05-bold text-grey-900">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Confirmed</p>
          <p className="header-05-bold text-green-600">
            {bookings.filter(b => b.status === 'Confirmed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Pending</p>
          <p className="header-05-bold text-orange-600">
            {bookings.filter(b => b.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Total Revenue</p>
          <p className="header-05-bold text-grey-900">
            €{bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md text-grey-400" />
            <input
              type="text"
              placeholder="Search by booking ID, customer, or tour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
            />
          </div>
          <div className="flex items-center gap-2 sm:w-48">
            <Filter className="icon-md text-grey-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 h-12 px-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Booking ID</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Customer</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Tour</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Date</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Guests</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Amount</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Payment</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="body-01-bold text-primary-600">{booking.bookingId}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-medium text-grey-900">{booking.customerName}</p>
                    <p className="caption-regular text-grey-600">{booking.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{booking.tourName}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="icon-sm text-grey-400" />
                      <p className="body-02-regular text-grey-700">{booking.date}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{booking.guests}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-bold text-grey-900">€{booking.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getPaymentColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-grey-200 bg-grey-50">
          <p className="body-02-regular text-grey-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
