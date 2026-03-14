'use client';

import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Search, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { locationService, Location } from '@/services/locationService';
import { toast } from 'react-toastify';

export default function LocationsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Show 5 items per page for easier testing of pagination

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Data fetching
  const { data: locationsResponse, isLoading } = useSWR(
    ['/locations', debouncedSearch, currentPage, pageSize],
    () => locationService.findAll(debouncedSearch, currentPage, pageSize)
  ) as any;
  
  const locations = Array.isArray(locationsResponse?.data?.data) 
    ? locationsResponse.data.data 
    : (Array.isArray(locationsResponse?.data) ? locationsResponse.data : []);

  const totalLocations = locationsResponse?.total || locations.length;
  const totalPages = Math.ceil(totalLocations / pageSize);

  // State for modals
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Location>>({
    city: '',
    country: ''
  });

  const handleOpenView = (loc: Location) => {
    setSelectedLocation(loc);
    setIsViewOpen(true);
  };

  const handleOpenCreate = () => {
    setFormData({
      city: '',
      country: ''
    });
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (loc: Location) => {
    setSelectedLocation(loc);
    setFormData({
      city: loc.city,
      country: loc.country
    });
    setIsEdit(true);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && selectedLocation) {
        await locationService.update(selectedLocation.id, formData);
        toast.success('Cập nhật địa điểm thành công');
      } else {
        await locationService.create(formData);
        toast.success('Thêm địa điểm thành công');
      }
      mutate(['/locations', debouncedSearch, currentPage, pageSize]);
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Thao tác thất bại');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa địa điểm này không?')) {
      try {
        await locationService.remove(id);
        toast.success('Xóa địa điểm thành công');
        mutate(['/locations', debouncedSearch, currentPage, pageSize]);
      } catch (error: any) {
        toast.error(error.message || 'Xóa thất bại');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Quản lý địa điểm</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            Quản lý tất cả định điểm và địa danh
          </p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleOpenCreate}>
          <Plus className="icon-sm" />
          Thêm địa điểm mới
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md" />
            <Input
              type="text"
              placeholder="Tìm kiếm thành phố hoặc quốc gia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thành phố</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Quốc gia</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-8">Đang tải danh sách địa điểm...</td>
                </tr>
              ) : locations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8">Không tìm thấy địa điểm nào</td>
                </tr>
              ) : (
                locations.map((loc: any) => (
                  <tr key={loc.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="body-01-medium text-grey-900">{loc.city}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="body-02-regular text-grey-700">{loc.country}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenView(loc)}
                          className="p-2 hover:bg-grey-100 rounded-lg transition-colors focus-ring"
                          title="Xem"
                        >
                          <Eye className="icon-sm text-grey-600" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(loc)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors focus-ring"
                          title="Sửa"
                        >
                          <Edit className="icon-sm text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(loc.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors focus-ring"
                          title="Xóa"
                        >
                          <Trash2 className="icon-sm text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-grey-200 bg-grey-50">
          <div className="flex items-center gap-4">
            <p className="body-02-regular text-grey-600">
              Hiển thị {locations.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, totalLocations)} trong tổng số {totalLocations} địa điểm
            </p>
            <div className="flex items-center gap-2 border-l pl-4 border-grey-200">
              <span className="text-sm text-gray-500">Số hàng:</span>
              <select 
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                {[5, 10, 20, 50].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="body-02-regular text-grey-600">
              Trang {currentPage} / {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage <= 1 || isLoading}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Trước
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage >= totalPages || isLoading}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Sau
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chi tiết địa điểm</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Thành phố:</span>
                <span className="col-span-3">{selectedLocation.city}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Quốc gia:</span>
                <span className="col-span-3">{selectedLocation.country}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Form Modal (Create/Edit) */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <Input 
              id="city"
              label="Thành phố"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input 
              id="country" 
              label="Quốc gia"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Hủy</Button>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
