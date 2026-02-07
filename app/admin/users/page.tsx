'use client';

import React, { useState } from 'react';
import { Search, Filter, UserPlus, Mail, Phone, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  role: 'Customer' | 'Admin';
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 8900', joinDate: '2025-06-15', totalBookings: 5, totalSpent: 12495, status: 'Active', role: 'Customer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234 567 8901', joinDate: '2025-08-20', totalBookings: 3, totalSpent: 8997, status: 'Active', role: 'Customer' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 234 567 8902', joinDate: '2025-09-10', totalBookings: 2, totalSpent: 5698, status: 'Active', role: 'Customer' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+1 234 567 8903', joinDate: '2025-07-05', totalBookings: 4, totalSpent: 10196, status: 'Active', role: 'Customer' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', phone: '+1 234 567 8904', joinDate: '2025-10-12', totalBookings: 1, totalSpent: 2499, status: 'Inactive', role: 'Customer' },
  { id: 6, name: 'Diana Martinez', email: 'diana@example.com', phone: '+1 234 567 8905', joinDate: '2025-11-01', totalBookings: 6, totalSpent: 15894, status: 'Active', role: 'Customer' },
  { id: 7, name: 'Admin User', email: 'admin@tripnest.com', phone: '+1 234 567 8906', joinDate: '2025-01-01', totalBookings: 0, totalSpent: 0, status: 'Active', role: 'Admin' },
];

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-grey-200 text-grey-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-grey-100 text-grey-700';
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Users Management</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            Manage all registered users
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <UserPlus className="icon-sm" />
          Add New User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Total Users</p>
          <p className="header-05-bold text-grey-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Active Users</p>
          <p className="header-05-bold text-green-600">
            {users.filter(u => u.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">New This Month</p>
          <p className="header-05-bold text-blue-600">
            {users.filter(u => new Date(u.joinDate).getMonth() === new Date().getMonth()).length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-grey-200">
          <p className="caption-medium text-grey-600 mb-1">Total Revenue</p>
          <p className="header-05-bold text-grey-900">
            €{users.reduce((sum, u) => sum + u.totalSpent, 0).toLocaleString()}
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
              placeholder="Search by name or email..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">User</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Contact</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Join Date</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Bookings</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Total Spent</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Role</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Status</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="body-02-bold text-primary-700">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <p className="body-02-medium text-grey-900">{user.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="icon-xs text-grey-400" />
                        <p className="caption-regular text-grey-700">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="icon-xs text-grey-400" />
                        <p className="caption-regular text-grey-700">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{user.joinDate}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{user.totalBookings}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-bold text-grey-900">€{user.totalSpent.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="p-2 hover:bg-grey-100 rounded-lg transition-colors focus-ring">
                      <MoreVertical className="icon-sm text-grey-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-grey-200 bg-grey-50">
          <p className="body-02-regular text-grey-600">
            Showing {filteredUsers.length} of {users.length} users
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
