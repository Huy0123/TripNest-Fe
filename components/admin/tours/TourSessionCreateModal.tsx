'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PriceInput } from '@/components/ui/price-input';
import { NumericInput } from '@/components/ui/numeric-input';
import { Calendar as CalendarIcon, Loader2, Clock, Users, Tag, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { tourSessionService } from '@/services/tourSessionService';
import { DepartureStatus } from '@/types/tour-session';
import { format } from 'date-fns';

interface TourSessionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: string;
  selectedDate: Date | null;
  onSuccess: () => void;
  tourPrice?: number;
  sessionData?: any; // Dữ liệu khi chỉnh sửa
}

export function TourSessionCreateModal({ 
  isOpen, 
  onClose, 
  tourId, 
  selectedDate, 
  onSuccess, 
  tourPrice,
  sessionData
}: TourSessionCreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    startDate: '',
    capacity: 20 as number | '',
    adultPrice: (tourPrice || 0) as number | '',
    childrenPrice: Math.floor((tourPrice || 0) * 0.7) as number | '',
    discount: 0 as number | '',
    status: DepartureStatus.OPEN
  });

  const isEdit = !!sessionData;

  useEffect(() => {
    // Vì Modal được remount bằng 'key' ở component cha, 
    // useEffect này sẽ chạy như một trình khởi tạo (initializer) sạch sẽ mỗi lần mở.
    if (isEdit && sessionData) {
      setFormData({
        startDate: format(new Date(sessionData.startDate), "yyyy-MM-dd'T'HH:mm"),
        capacity: sessionData.capacity ?? 20,
        adultPrice: sessionData.adultPrice ?? tourPrice ?? 0,
        childrenPrice: sessionData.childrenPrice ?? 0,
        discount: sessionData.discount ?? 0,
        status: (sessionData.status as DepartureStatus) || DepartureStatus.OPEN
      });
    } else if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd') + 'T08:00';
      setFormData({
        startDate: dateStr,
        capacity: 20,
        adultPrice: tourPrice ?? 0,
        childrenPrice: Math.floor((tourPrice ?? 0) * 0.7),
        discount: 0,
        status: DepartureStatus.OPEN
      });
    }
  }, [isOpen]); // Chỉ chạy khi modal được mở (mặc dù key cũng đã lo phần remount)

  const handleDelete = async () => {
    if (!sessionData?.id) return;
    
    if (window.confirm("Bạn có chắc chắn muốn xóa session này không? Hành động này không thể hoàn tác.")) {
      try {
        setLoading(true);
        await tourSessionService.remove(sessionData.id);
        toast.success("Đã xóa session thành công");
        onSuccess();
        onClose();
      } catch (error: any) {
        console.error("Delete Session Error:", error);
        toast.error(error.response?.data?.message || "Lỗi khi xóa session");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.startDate) {
      toast.error("Vui lòng chọn ngày khởi hành");
      return;
    }

    try {
      setLoading(true);
      
      const commonData = {
        startDate: new Date(formData.startDate).toISOString(),
        capacity: Number(formData.capacity) || 0,
        adultPrice: Number(formData.adultPrice) || 0,
        discount: Number(formData.discount) || 0,
        status: formData.status
      };

      if (isEdit && sessionData?.id) {
        // Cập nhật: Chỉ gửi data cần thiết
        await tourSessionService.update(sessionData.id, commonData);
        toast.success("Đã cập nhật session thành công");
      } else {
        // Tạo mới: Phải có tourId
        await tourSessionService.create({ 
          tourId, 
          ...commonData 
        });
        toast.success("Đã tạo session thành công");
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Session Action Error:", error);
      toast.error(error.response?.data?.message || `Lỗi khi ${isEdit ? 'cập nhật' : 'tạo'} session`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            <CalendarIcon className="w-6 h-6 text-primary-500" />
            {isEdit ? 'Cập nhật lịch khởi hành' : `Thêm lịch cho ngày ${selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}`}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {/* Ẩn input chọn ngày nếu là thêm mới từ lịch, nhưng cho hiện nếu là edit hoặc để kiểm tra */}
          {isEdit && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                <Clock className="w-4 h-4 text-primary-500" /> Thời gian khởi hành
              </label>
              <Input 
                type="datetime-local" 
                value={formData.startDate} 
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <NumericInput 
              id="capacity"
              label="Số chỗ (Capacity)"
              value={formData.capacity}
              onChange={(val) => setFormData({ ...formData, capacity: val ?? 0 })}
              icon={<Users className="w-4 h-4 text-primary-500" />}
            />
            <NumericInput 
              id="discount"
              label="Giảm giá (%)"
              value={formData.discount}
              onChange={(val) => setFormData({ ...formData, discount: val ?? 0 })}
              icon={<Tag className="w-4 h-4 text-primary-500" />}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <NumericInput 
              id="adultPrice"
              label="Giá người lớn"
              value={formData.adultPrice}
              onChange={(val) => setFormData({ ...formData, adultPrice: val ?? 0 })}
              thousandSeparator
            />
            <NumericInput 
              id="childrenPrice"
              label="Giá trẻ em"
              value={formData.childrenPrice}
              onChange={(val) => setFormData({ ...formData, childrenPrice: val ?? 0 })}
              thousandSeparator
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Trạng thái</label>
            <select 
              className="w-full flex h-10 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as DepartureStatus })}
            >
              <option value={DepartureStatus.OPEN}>Đang mở bán (OPEN)</option>
              <option value={DepartureStatus.SOLDOUT}>Hết chỗ (SOLDOUT)</option>
              <option value={DepartureStatus.CLOSED}>Đã đóng (CLOSED)</option>
            </select>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between gap-2">
          <div className="flex gap-2">
            {isEdit && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={handleDelete} 
                disabled={loading}
                className="rounded-xl px-4"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa Session
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} disabled={loading} className="rounded-xl">Hủy</Button>
            <Button onClick={handleSubmit} disabled={loading} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 shadow-lg shadow-primary-200">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isEdit ? 'Lưu thay đổi' : 'Tạo Session'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
