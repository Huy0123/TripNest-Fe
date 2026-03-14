'use client';

import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Search, Filter, Download, Calendar, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { bookingService, Booking } from '@/services/bookingService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

export default function BookingsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Data fetching
  const { data: bookingsResponse, isLoading } = useSWR(['/bookings', statusFilter], () => {
    console.log('Fetching bookings with status:', statusFilter);
    return bookingService.findAll({ status: statusFilter === 'all' ? undefined : statusFilter });
  });

  const bookings = Array.isArray(bookingsResponse?.data) 
    ? bookingsResponse.data 
    : (Array.isArray(bookingsResponse) ? bookingsResponse : []);

  const filteredBookings = bookings.filter((booking: Booking) => {
    return (
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDelete = async (id: string) => {
    if (confirm('Xác nhận xóa đơn đặt chỗ này?')) {
      console.log('Deleting booking:', id);
      try {
        await bookingService.remove(id);
        toast.success('Xóa đơn đặt chỗ thành công');
        mutate(['/bookings', statusFilter]);
      } catch (error: any) {
        toast.error(error.message || 'Xóa thất bại');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PAID':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-orange-100 text-orange-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-grey-100 text-grey-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="header-04-bold text-grey-900">Quản lý Đặt chỗ</h2>
          <p className="body-02-regular text-grey-600 mt-1">Xem và quản lý tất cả đơn đặt của khách hàng</p>
        </div>
        <Button size="lg" variant="outline" className="gap-2">
          <Download className="icon-sm" /> Xuất file CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md text-grey-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã, tên khách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="sm:w-48 h-12 px-4 border border-grey-300 rounded-lg body-01-regular focus-ring"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="CONFIRMED">Đã xác nhận</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="CANCELLED">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-grey-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-50 border-b border-grey-200">
              <tr>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Mã</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Khách hàng</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Tour</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Người</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Tổng tiền</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Trạng thái</th>
                <th className="text-left py-4 px-6 body-02-bold text-grey-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="py-10 text-center">Đang tải...</td></tr>
              ) : filteredBookings.map((booking: any) => (
                <tr key={booking.id} className="border-b border-grey-100 hover:bg-grey-50">
                  <td className="py-4 px-6 text-primary-600 font-bold">{booking.id.slice(-6).toUpperCase()}</td>
                  <td className="py-4 px-6">
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-xs text-grey-500">{booking.customerEmail}</p>
                  </td>
                  <td className="py-4 px-6">{booking.tour?.name || 'N/A'}</td>
                  <td className="py-4 px-6">{booking.numberOfPeople}</td>
                  <td className="py-4 px-6 font-bold">${booking.totalPrice}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                       <button onClick={() => { setSelectedBooking(booking); setIsViewOpen(true); }} className="p-2 hover:bg-grey-100 rounded">
                        <Eye className="w-4 h-4 text-grey-600" />
                       </button>
                       <button onClick={() => handleDelete(booking.id)} className="p-2 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Chi tiết Đặt chỗ</DialogTitle></DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4 text-sm">
              <div className="flex justify-between border-b pb-2"><span>Mã đơn:</span> <span className="font-bold">{selectedBooking.id}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Khách hàng:</span> <span>{selectedBooking.customerName}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Email:</span> <span>{selectedBooking.customerEmail}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Số điện thoại:</span> <span>{selectedBooking.customerPhone}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Tour:</span> <span>{selectedBooking.tour?.name}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Số người:</span> <span>{selectedBooking.numberOfPeople}</span></div>
              <div className="flex justify-between border-b pb-2 text-lg"><span>Tổng cộng:</span> <span className="font-bold text-primary-600">${selectedBooking.totalPrice}</span></div>
              <div className="flex justify-between border-b pb-2"><span>Trạng thái:</span> <span className="font-bold">{selectedBooking.status}</span></div>
              <div className="flex justify-between"><span>Ngày đặt:</span> <span>{format(new Date(selectedBooking.createdAt), 'dd/MM/yyyy HH:mm')}</span></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
