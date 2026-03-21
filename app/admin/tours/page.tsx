'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit, Trash2, Image as ImageIcon, 
  Loader2, MapPin, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { tourService } from '@/services/tourService';
import { toast } from 'react-toastify';
import { TourSessionStats } from '@/components/admin/tours/TourSessionStats';
import { useLocations } from '@/hooks/queries/useLocations';
import { useTours } from '@/hooks/queries/useTours';
import { CreateTourModal } from '@/components/admin/tours/CreateTourModal';
import { formatCurrency } from '@/lib/format';

export default function ToursManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Data fetching
  const { tours, total: totalTours, isLoading: toursLoading, mutate: mutateTours } = useTours(searchQuery, currentPage, pageSize);
  const { locations } = useLocations();
  
  const totalPages = Math.ceil(totalTours / pageSize);

  const handleDelete = async (id: string) => {
    if (confirm('Xác nhận xóa tour này?')) {
      try {
        await tourService.remove(id);
        toast.success('Xóa Tour thành công');
        mutateTours();
      } catch (error: any) {
        console.error('Delete tour error:', error);
        toast.error(error.response?.data?.message || 'Xóa thất bại');
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Tour</h1>
          <p className="text-gray-500 text-sm">Quản lý các tour du lịch nhanh chóng</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gray-900 hover:bg-black text-white gap-2">
          <Plus className="w-4 h-4" />
          Thêm Tour Mới
        </Button>
      </div>

      <div className="bg-white rounded-xl p-4 border border-grey-200 shadow-card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 icon-md" />
            <Input 
              placeholder="Tìm kiếm tour theo tên..." 
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="p-3 space-y-2">
          {toursLoading ? (
            <div className="py-12 text-center text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              <p className="text-sm">Đang tải biểu danh sách...</p>
            </div>
          ) : tours.length === 0 ? (
            <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
              <p className="italic text-sm">Chưa có tour nào được tạo</p>
            </div>
          ) : tours.map((tour: any) => (
            <div 
              key={tour.id} 
              className="group bg-white rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex items-center p-3 gap-4"
              onClick={() => router.push(`/admin/tours/${tour.id}`)}
            >
              {/* Compact Thumbnail */}
              <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                {tour.image ? (
                  <img src={tour.image} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Core Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-gray-900 truncate max-w-[300px]">{tour.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono uppercase">ID: {tour.id.slice(-6)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="font-medium text-gray-700">{tour.departureLocation?.city || 'N/A'}</span>
                    <span className="text-gray-300">→</span>
                    <div className="flex gap-1">
                      <span className="text-gray-600">
                        {tour.destinations
                          ?.slice(0, 2)
                          .map((d: any) => d.city)
                          .join(", ")}
                      </span>
                      {tour.destinations?.length > 2 && <span className="text-gray-400">+{tour.destinations.length - 2}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                    <Clock className="w-3 h-3" /> {tour.duration} Ngày
                  </div>
                </div>
              </div>

              {/* Management Metrics */}
              <div className="hidden lg:flex items-center gap-8 px-4 flex-shrink-0">
                <TourSessionStats tourId={tour.id} />
              </div>

              {/* Price & Actions */}
              <div className="flex items-center gap-6 pl-4 border-l border-gray-100 flex-shrink-0">
                <div className="w-42 text-right">
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Giá bán</p>
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-lg font-black text-gray-900">{formatCurrency(tour.price)}</span>
                    {tour.discount > 0 && (
                      <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded">-{tour.discount}%</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => router.push(`/admin/tours/${tour.id}`)}
                    className="h-9 w-9 rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(tour.id)}
                    className="h-9 w-9 rounded-lg hover:bg-red-50 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl mt-4">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Hiển thị {tours.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} - {Math.min(currentPage * pageSize, totalTours)} trong {totalTours} tour
            </p>
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
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
            <span className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages || 1}
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage <= 1 || toursLoading}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="h-8 rounded-lg bg-white"
              >
                Trước
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage >= totalPages || toursLoading}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="h-8 rounded-lg bg-white"
              >
                Sau
              </Button>
            </div>
          </div>
        </div>

        <CreateTourModal 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={() => mutateTours()}
          locations={locations}
        />
    </div>
    </div>
  );
}

