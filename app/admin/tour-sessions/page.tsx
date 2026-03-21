'use client';

import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { Search, Plus, Edit, Trash2, Eye, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { tourSessionService, TourSession } from '@/services/tourSessionService';
import { tourService } from '@/services/tourService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/format';

export default function TourSessionsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data fetching
  const { data: sessionsResponse, isLoading } = useSWR('/tour-sessions', () => {
    console.log('Fetching all tour sessions...');
    return tourSessionService.findAll();
  });
  
  const { data: toursResponse } = useSWR('/tours', () => tourService.findAll());

  const sessions = Array.isArray(sessionsResponse?.data) 
    ? sessionsResponse.data 
    : (Array.isArray(sessionsResponse) ? sessionsResponse : []);

  const tours = Array.isArray(toursResponse?.data?.data)
    ? toursResponse.data.data
    : (Array.isArray(toursResponse?.data) ? toursResponse.data : []);

  // State for modals
  const [selectedSession, setSelectedSession] = useState<TourSession | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // Form state
  const [formData, setFormData] = useState<any>({
    tourId: '',
    startDate: '',
    capacity: 0,
    adultPrice: 0,
    childrenPrice: 0,
    discount: 0,
    status: 'OPEN' as any
  });

  const handleOpenCreate = () => {
    setFormData({
      tourId: tours[0]?.id || '',
      startDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      capacity: 20,
      adultPrice: 0,
      childrenPrice: 0,
      discount: 0,
      status: 'OPEN' as any
    });
    setIsEdit(false);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (session: any) => {
    setSelectedSession(session);
    setFormData({
      tourId: session.tourId || session.tour?.id,
      startDate: format(new Date(session.startDate || session.startTime || new Date()), "yyyy-MM-dd'T'HH:mm"),
      capacity: session.capacity || session.availableSeats || 0,
      adultPrice: session.adultPrice || parseInt(session.tour?.price || '0', 10),
      childrenPrice: session.childrenPrice || 0,
      discount: session.discount || 0,
      status: session.status || 'OPEN'
    });
    setIsEdit(true);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting session data:', formData);
    try {
      if (isEdit && selectedSession) {
        const res = await tourSessionService.update(selectedSession.id, formData);
        console.log('Update response:', res);
        toast.success('Cập nhật phiên thành công');
      } else {
        const res = await tourSessionService.create(formData as any);
        console.log('Create response:', res);
        toast.success('Tạo phiên thành công');
      }
      mutate('/tour-sessions');
      setIsFormOpen(false);
    } catch (error: any) {
      console.error('API Error:', error);
      toast.error(error.message || 'Thao tác thất bại');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Xác nhận xóa phiên này?')) {
      console.log('Deleting session:', id);
      try {
        const res = await tourSessionService.remove(id);
        console.log('Delete response:', res);
        toast.success('Xóa phiên thành công');
        mutate('/tour-sessions');
      } catch (error: any) {
        console.error('Delete error:', error);
        toast.error(error.message || 'Xóa thất bại');
      }
    }
  };

  const getTourName = (id: string) => {
    return tours.find((t: any) => t.id === id)?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Quản lý Phiên (Sessions)</h2>
          <p className="body-02-regular text-grey-600 mt-1">Quản lý ngày khởi hành và chỗ trống</p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleOpenCreate}>
          <Plus className="icon-sm" /> Thêm Phiên mới
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Tour</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Ngày đi</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Sức chứa</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Giá TT</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Trạng thái</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-8">Đang tải...</td></tr>
              ) : sessions.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8">Không có dữ liệu</td></tr>
              ) : (
                sessions.map((session: any) => (
                  <tr key={session.id} className="border-b border-grey-100 hover:bg-grey-50">
                    <td className="py-4 px-6 font-medium">{session.tour?.name || getTourName(session.tourId)}</td>
                    <td className="py-4 px-6">{format(new Date(session.startDate || session.startTime || new Date()), 'dd/MM/yyyy HH:mm')}</td>
                    <td className="py-4 px-6">{session.capacity || session.availableSeats || 0}</td>
                    <td className="py-4 px-6">{formatCurrency(session.adultPrice)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        session.status === 'OPEN' ? 'bg-blue-100 text-blue-700' : 
                        session.status === 'SOLDOUT' ? 'bg-red-100 text-red-700' : 'bg-grey-100 text-grey-700'
                      }`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button onClick={() => handleOpenEdit(session)} className="p-2 hover:bg-blue-50 text-blue-600 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(session.id)} className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader><DialogTitle>{isEdit ? 'Sửa Phiên' : 'Thêm Phiên'}</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Chọn Tour</label>
              <select 
                className="w-full p-2 border rounded"
                value={formData.tourId}
                onChange={(e) => setFormData({...formData, tourId: e.target.value})}
                required
              >
                <option value="">-- Chọn Tour --</option>
                {tours.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Ngày khởi hành" type="datetime-local" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
              <Input label="Số chỗ/Sức chứa" type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})} required />
              <Input label="Giá Người Lớn" type="number" value={formData.adultPrice} onChange={(e) => setFormData({...formData, adultPrice: Number(e.target.value)})} required />
              <Input label="Giá Trẻ Em" type="number" value={formData.childrenPrice} onChange={(e) => setFormData({...formData, childrenPrice: Number(e.target.value)})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Giảm giá (%)" type="number" value={formData.discount} onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})} />
              <div className="space-y-1">
                <label className="text-sm font-medium">Trạng thái</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="OPEN">OPEN</option>
                  <option value="SOLDOUT">SOLDOUT</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Hủy</Button>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
