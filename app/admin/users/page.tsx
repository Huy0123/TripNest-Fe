'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Search, Filter, UserPlus, Mail, Phone, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { userService } from '@/services/userService';
import { User, UserRole } from '@/types/user';

interface UserResponse {
  data: User[];
  total: number;
}

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useSWR(
    mounted ? [`/users`, page, limit] : null,
    async () => {
      const res = await userService.getAllUsers(page, limit);
      return (res as any).data || res;
    }
  );

  const users = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
  const total = data?.total || users.length;

  const filteredUsers = users.filter((user: User) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && user.isActive;
    if (statusFilter === 'inactive') return matchesSearch && !user.isActive;
    return matchesSearch;
  });

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-700' : 'bg-grey-200 text-grey-700';
  };

  const getStatusLabel = (isActive: boolean) => {
    return isActive ? 'Đang hoạt động' : 'Ngưng hoạt động';
  };

  const getRoleLabel = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'Quản trị viên' : 'Khách hàng';
  };

  const getRoleColor = (role: UserRole) => {
    return role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
  };

  if (!mounted) return null;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-grey-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Quản lý Người dùng</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            Quản lý tất cả người dùng đã đăng ký
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <UserPlus className="icon-sm" />
          Thêm người dùng mới
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md text-grey-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
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
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
              <option value="suspended">Bị khóa</option>
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
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Người dùng</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Liên hệ</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Ngày tham gia</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Lượt đặt</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Chi tiêu</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Vai trò</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Trạng thái</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: User) => (
                <tr key={user.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.firstName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="body-02-bold text-primary-700">
                            {user.firstName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <p className="body-02-medium text-grey-900">{user.firstName} {user.lastName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="icon-xs text-grey-400" />
                        <p className="caption-regular text-grey-700">{user.email}</p>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="icon-xs text-grey-400" />
                          <p className="caption-regular text-grey-700">{user.phone}</p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-regular text-grey-700">0</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="body-02-bold text-grey-900">{formatCurrency(0)}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${getStatusColor(user.isActive)}`}>
                      {getStatusLabel(user.isActive)}
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
            Hiển thị {filteredUsers.length} trên tổng số {total} người dùng
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Trước
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPage(p => p + 1)}
              disabled={page * limit >= total}
            >
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
