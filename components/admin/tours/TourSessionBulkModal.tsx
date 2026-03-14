'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PriceInput } from '@/components/ui/price-input';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { tourSessionService } from '@/services/tourSessionService';

interface TourSessionBulkModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: string;
  onSuccess: () => void;
  tourPrice?: number;
}

export function TourSessionBulkModal({ isOpen, onClose, tourId, onSuccess, tourPrice }: TourSessionBulkModalProps) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    startDateRange: '',
    endDateRange: '',
    daysOfWeek: [] as number[],
    capacity: 20,
    adultPrice: tourPrice || 0,
    childrenPrice: Math.floor((tourPrice || 0) * 0.7),
    discount: 0
  });

  const days = [
    { label: 'T2', value: 1 },
    { label: 'T3', value: 2 },
    { label: 'T4', value: 3 },
    { label: 'T5', value: 4 },
    { label: 'T6', value: 5 },
    { label: 'T7', value: 6 },
    { label: 'CN', value: 0 },
  ];

  const handleDayToggle = (value: number) => {
    setConfig(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(value)
        ? prev.daysOfWeek.filter(d => d !== value)
        : [...prev.daysOfWeek, value]
    }));
  };

  const handleSubmit = async () => {
    if (!config.startDateRange || !config.endDateRange) {
      toast.error("Vui lòng chọn khoảng ngày");
      return;
    }
    if (config.daysOfWeek.length === 0) {
      toast.error("Vui lòng chọn ít nhất một thứ trong tuần");
      return;
    }

    try {
      setLoading(true);
      await tourSessionService.bulkCreate({ tourId, ...config });
      toast.success("Đã tạo hàng loạt session thành công");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tạo hàng loạt session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary-500" />
            Tạo lịch khởi hành hàng loạt
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Từ ngày</label>
              <Input 
                type="date" 
                value={config.startDateRange} 
                onChange={(e) => setConfig({ ...config, startDateRange: e.target.value })} 
              />
            </div>
            <div className="space-y-2">
              <label>Đến ngày</label>
              <Input 
                type="date" 
                value={config.endDateRange} 
                onChange={(e) => setConfig({ ...config, endDateRange: e.target.value })} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label>Các thứ trong tuần</label>
            <div className="flex flex-wrap gap-2">
              {days.map(day => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => handleDayToggle(day.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    config.daysOfWeek.includes(day.value)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Số chỗ (Capacity)</label>
              <Input 
                type="number" 
                value={config.capacity} 
                onChange={(e) => setConfig({ ...config, capacity: parseInt(e.target.value) })} 
              />
            </div>
            <div className="space-y-2">
              <label>Giảm giá (%)</label>
              <Input 
                type="number" 
                value={config.discount} 
                onChange={(e) => setConfig({ ...config, discount: parseInt(e.target.value) })} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Giá người lớn (Adult)</label>
              <PriceInput 
                value={config.adultPrice} 
                onChange={(val) => setConfig({ ...config, adultPrice: val })} 
              />
            </div>
            <div className="space-y-2">
              <label>Giá trẻ em (Child)</label>
              <PriceInput 
                value={config.childrenPrice} 
                onChange={(val) => setConfig({ ...config, childrenPrice: val })} 
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>Hủy</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Tạo ngay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
