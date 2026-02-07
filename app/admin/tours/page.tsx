'use client';

import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tour {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  bookings: number;
  rating: number;
}

const tours: Tour[] = [
  { id: 1, name: 'Paris Discovery', destination: 'France', duration: '7 days', price: 2499, status: 'Active', bookings: 45, rating: 4.8 },
  { id: 2, name: 'Tokyo Experience', destination: 'Japan', duration: '10 days', price: 3299, status: 'Active', bookings: 38, rating: 4.9 },
  { id: 3, name: 'Rome Adventure', destination: 'Italy', duration: '5 days', price: 1899, status: 'Active', bookings: 32, rating: 4.7 },
  { id: 4, name: 'Amsterdam Tour', destination: 'Netherlands', duration: '4 days', price: 1599, status: 'Active', bookings: 28, rating: 4.6 },
  { id: 5, name: 'Barcelona Highlights', destination: 'Spain', duration: '6 days', price: 2099, status: 'Draft', bookings: 0, rating: 0 },
  { id: 6, name: 'London Explorer', destination: 'UK', duration: '5 days', price: 2199, status: 'Active', bookings: 23, rating: 4.5 },
  { id: 7, name: 'Dubai Luxury', destination: 'UAE', duration: '7 days', price: 3899, status: 'Active', bookings: 19, rating: 4.9 },
  { id: 8, name: 'Sydney Adventure', destination: 'Australia', duration: '12 days', price: 4299, status: 'Archived', bookings: 56, rating: 4.8 },
];

export default function ToursManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTours = tours.filter((tour) => {
    const matchesSearch = tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tour.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-orange-100 text-orange-700';
      case 'Archived':
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
          <h2 className="header-04-bold text-grey-900">Tours Management</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            Manage all tours and packages
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="icon-sm" />
          Add New Tour
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md text-grey-400" />
            <input
              type="text"
              placeholder="Search tours by name or destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 sm:w-48">
            <Filter className="icon-md text-grey-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 h-12 px-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Tour Name</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Destination</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Duration</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Price</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Bookings</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Rating</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Status</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-4 px-6">
                    <p className="body-01-medium text-grey-900">{tour.name}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{tour.destination}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{tour.duration}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-bold text-grey-900">€{tour.price.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{tour.bookings}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <span className="body-02-bold text-grey-900">{tour.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getStatusColor(tour.status)}`}>
                      {tour.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-grey-100 rounded-lg transition-colors focus-ring"
                        title="View"
                      >
                        <Eye className="icon-sm text-grey-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors focus-ring"
                        title="Edit"
                      >
                        <Edit className="icon-sm text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors focus-ring"
                        title="Delete"
                      >
                        <Trash2 className="icon-sm text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-grey-200 bg-grey-50">
          <p className="body-02-regular text-grey-600">
            Showing {filteredTours.length} of {tours.length} tours
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
