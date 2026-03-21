'use client';

import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Search, Plus, Edit, Trash2, Eye, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/format';
import { Input } from '@/components/ui/input';
import { NumericInput } from '@/components/ui/numeric-input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { promotionService, Promotion, DiscountType } from '@/services/promotionService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function PromotionsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Data fetching
  const { data: promosResponse, isLoading } = useSWR(
    '/promotions',
    () => promotionService.findAll()
  );

  const promos = Array.isArray(promosResponse?.data) 
    ? promosResponse.data 
    : (Array.isArray(promosResponse) ? promosResponse : []);

  // Filtering (server-side for promos isn't implemented in the service yet, so we'll do client-side for now or just wait for backend update)
  const filteredPromos = promos.filter((promo: Promotion) => {
    const matchesSearch = promo.code.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesSearch;
  });

  // State for modals
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Promotion>>({
    code: '',
    discountType: DiscountType.PERCENTAGE,
    discountValue: 0,
    minOrderValue: 0,
    maxDiscount: 0,
    usageLimit: 0,
    startDate: '',
    endDate: '',
    isActive: true
  });

  const handleOpenView = (promo: Promotion) => {
    setSelectedPromo(promo);
    setIsViewOpen(true);
  };

  const handleOpenCreate = () => {
    setFormData({
      code: '',
      discountType: DiscountType.PERCENTAGE,
      discountValue: 0,
      minOrderValue: 0,
      maxDiscount: undefined,
      usageLimit: 0,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
      isActive: true
    });
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (promo: Promotion) => {
    setSelectedPromo(promo);
    setFormData({
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      minOrderValue: promo.minOrderValue,
      maxDiscount: promo.maxDiscount,
      usageLimit: promo.usageLimit,
      startDate: format(new Date(promo.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(promo.endDate), 'yyyy-MM-dd'),
      isActive: promo.isActive
    });
    setIsEdit(true);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && selectedPromo) {
        await promotionService.update(selectedPromo.id, formData);
        toast.success('Cập nhật khuyến mãi thành công');
      } else {
        await promotionService.create(formData);
        toast.success('Tạo khuyến mãi thành công');
      }
      mutate('/promotions');
      setIsFormOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Thao tác thất bại');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa khuyến mãi này không?')) {
      try {
        await promotionService.remove(id);
        toast.success('Xóa khuyến mãi thành công');
        mutate('/promotions');
      } catch (error: any) {
        toast.error(error.message || 'Xóa thất bại');
      }
    }
  };

  const getStatusLabel = (promo: Promotion) => {
    const now = new Date();
    const start = new Date(promo.startDate);
    const end = new Date(promo.endDate);

    if (!promo.isActive) return { label: 'Ngưng hoạt động', color: 'bg-grey-100 text-grey-700' };
    if (now < start) return { label: 'Đã lên lịch', color: 'bg-blue-100 text-blue-700' };
    if (now > end) return { label: 'Hết hạn', color: 'bg-red-100 text-red-700' };
    return { label: 'Hoạt động', color: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Quản lý Khuyến mãi</h2>
          <p className="body-02-regular text-grey-600 mt-1">
            Quản lý mã giảm giá và các chiến dịch khuyến mãi
          </p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleOpenCreate}>
          <Plus className="icon-sm" />
          Thêm Khuyến mãi mới
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md text-grey-400" />
            <Input
              placeholder="Tìm kiếm theo mã khuyến mãi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white h-12"
            />
          </div>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Mã</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Giá trị</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Hạn dùng</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Lượt dùng</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Trạng thái</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">Đang tải danh sách khuyến mãi...</td>
                </tr>
              ) : filteredPromos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">Không tìm thấy khuyến mãi nào</td>
                </tr>
              ) : (
                filteredPromos.map((promo: Promotion) => {
                  const status = getStatusLabel(promo);
                  return (
                    <tr key={promo.id} className="group border-b border-grey-100 hover:bg-grey-50/80 transition-all cursor-default">
                      <td className="py-4 px-6">
                        <span className="inline-flex px-2 py-1 rounded bg-grey-100 border border-grey-200 font-mono text-sm text-grey-900">
                          {promo.code}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="body-02-bold text-grey-900">
                          {promo.discountType === DiscountType.PERCENTAGE 
                            ? `${promo.discountValue}%` 
                            : `${promo.discountValue.toLocaleString('vi-VN')} VNĐ`}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="body-02-regular text-grey-700">{format(new Date(promo.endDate), 'dd/MM/yyyy')}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="body-02-regular text-grey-700">{promo.usedCount} / {promo.usageLimit || '∞'}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full caption-bold ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenView(promo)}
                            className="p-2 hover:bg-grey-100 rounded-lg transition-colors focus-ring"
                            title="Xem"
                          >
                            <Eye className="icon-sm text-grey-600" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(promo)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors focus-ring"
                            title="Sửa"
                          >
                            <Edit className="icon-sm text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(promo.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors focus-ring"
                            title="Xóa"
                          >
                            <Trash2 className="icon-sm text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chi tiết khuyến mãi</DialogTitle>
          </DialogHeader>
          {selectedPromo && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Mã:</span>
                <span className="col-span-3 font-mono text-grey-900 bg-grey-100 px-2 py-1 rounded">{selectedPromo.code}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Loại:</span>
                <span className="col-span-3">{selectedPromo.discountType === DiscountType.PERCENTAGE ? 'Phần trăm (%)' : 'Số tiền cố định (€)'}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-grey-500">Giá trị:</span>
                <span className="col-span-3 font-bold text-gray-900">
                  {selectedPromo.discountType === DiscountType.PERCENTAGE 
                    ? `${selectedPromo.discountValue}%` 
                    : `${selectedPromo.discountValue.toLocaleString('vi-VN')} VNĐ`}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Bắt đầu:</span>
                <span className="col-span-3">{format(new Date(selectedPromo.startDate), 'dd/MM/yyyy')}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Kết thúc:</span>
                <span className="col-span-3">{format(new Date(selectedPromo.endDate), 'dd/MM/yyyy')}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium text-grey-500">Tối thiểu:</span>
                <span className="col-span-3">{formatCurrency(selectedPromo.minOrderValue || 0)}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Đã dùng:</span>
                <span className="col-span-3">{selectedPromo.usedCount} / {selectedPromo.usageLimit || '∞'}</span>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Chỉnh sửa khuyến mãi' : 'Thêm mới khuyến mãi'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4 overflow-y-auto max-h-[70vh] px-1">
            <Input 
              id="code"
              label="Mã khuyến mãi"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block body-02-medium text-grey-700">Loại giảm giá</label>
                <select 
                  className="w-full h-12 px-4 rounded-lg border border-grey-200 focus:ring-2 focus:ring-primary-500 bg-white"
                  value={formData.discountType}
                  onChange={(e) => setFormData({ ...formData, discountType: e.target.value as DiscountType })}
                >
                  <option value={DiscountType.PERCENTAGE}>Phần trăm (%)</option>
                  <option value={DiscountType.FIXED_AMOUNT}>Số tiền cố định (VNĐ)</option>
                </select>
              </div>
              <NumericInput 
                id="discountValue"
                label="Giá trị"
                value={formData.discountValue}
                onChange={(val) => setFormData({ ...formData, discountValue: val ?? 0 })}
                thousandSeparator={formData.discountType === DiscountType.FIXED_AMOUNT}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NumericInput 
                id="minOrderValue"
                label="Đơn hàng tối thiểu (VNĐ)"
                placeholder="0"
                value={formData.minOrderValue}
                onChange={(val) => setFormData({ ...formData, minOrderValue: val })}
                thousandSeparator
              />
              <NumericInput 
                id="maxDiscount"
                label="Giảm tối đa (VNĐ)"
                placeholder="Không giới hạn"
                value={formData.maxDiscount}
                onChange={(val) => setFormData({ ...formData, maxDiscount: val })}
                disabled={formData.discountType === DiscountType.FIXED_AMOUNT}
                thousandSeparator
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                id="startDate"
                label="Ngày bắt đầu"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              <Input 
                id="endDate"
                label="Ngày kết thúc"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <NumericInput 
              id="usageLimit"
              label="Giới hạn sử dụng (0 là không giới hạn)"
              value={formData.usageLimit}
              onChange={(val) => setFormData({ ...formData, usageLimit: val ?? 0 })}
            />
            <div className="flex items-center gap-2">
              <input 
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <label htmlFor="isActive" className="body-02-medium text-grey-700">Đang hoạt động</label>
            </div>
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
