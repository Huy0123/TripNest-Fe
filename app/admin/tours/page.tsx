'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { 
  Search, Plus, Edit, Trash2, X, Upload, Image as ImageIcon, 
  Loader2, MapPin, ChevronLeft, ChevronRight, Star, 
  Building, Calendar, Users, Coffee, Bed, Plane, Car, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { tourService } from '@/services/tourService';
import { locationService } from '@/services/locationService';
import { toast } from 'react-toastify';
import { StayOption } from '@/types/tours';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { TourSessionStats } from '@/components/admin/tours/TourSessionStats';

export default function ToursManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  const initialFormState = {
    name: '',
    duration: 1,
    price: '',
    discount: '',
    departureLocationId: '',
    stayOption: StayOption.HOTELS,
    guideService: [''],
    destinationIds: [''],
  };

  const [formData, setFormData] = useState<any>(initialFormState);
  
  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Data fetching
  const { data: toursData, isLoading: toursLoading, mutate: mutateTours } = useSWR(
    ['/tours', searchQuery, currentPage, pageSize], 
    () => tourService.findAll(searchQuery, currentPage, pageSize)
  ) as any;
  const { data: locationsData } = useSWR('/locations', () => locationService.findAll());
  
  const locations = locationsData?.data || []
  const tours = toursData?.data || []
  const totalTours = toursData?.total || tours.length;
  const totalPages = Math.ceil(totalTours / pageSize);

  const handleOpenCreate = useCallback(() => {
    setFormData({
      ...initialFormState,
      departureLocationId: locations[0]?.id || '',
    });
    setMainImageFile(null);
    setMainImagePreview(null);
    setIsFormOpen(true);
  }, [locations]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'price') {
      const rawValue = value.replace(/\./g, '');
      if (/^\d*$/.test(rawValue)) {
        setFormData((prev: any) => ({ ...prev, [name]: rawValue }));
      }
      return;
    }
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const formatWithDots = (value: string | number) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleArrayChange = (index: number, value: string, field: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index: number, field: string) => {
    const newArray = formData[field].filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setMainImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      
      const submissionData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        discount: Number(formData.discount) || 0,
        guideService: formData.guideService?.filter((s: string) => s.trim() !== '') || [],
        destinationIds: formData.destinationIds?.filter((id: string) => id.trim() !== '') || [],
      };

      const res = await tourService.create(submissionData);
      
      const newTour = (res as any)?.data || res;
      const tourId = newTour?.id;

      if (tourId && mainImageFile) {
        await tourService.uploadImage(tourId, mainImageFile);
      }
      setIsFormOpen(false);
      mutateTours();
      toast.success('Thêm Tour thành công');
    } catch (error: any) {
      console.error('Create tour error:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo tour');
    } finally {
      setIsUploading(false);
    }
  };

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

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Tour</h1>
          <p className="text-gray-500 text-sm">Quản lý các tour du lịch nhanh chóng</p>
        </div>
        <Button onClick={handleOpenCreate} className="bg-gray-900 hover:bg-black text-white gap-2">
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
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Giá bán</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-gray-900">{tour.price?.toLocaleString('vi-VN')} VNĐ</span>
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

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Thêm Tour Mới
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Media & Services */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    Ảnh đại diện Tour
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-gray-400 hover:bg-white transition-all relative h-72 flex flex-col items-center justify-center overflow-hidden bg-white"
                    onClick={() => document.getElementById('mainImageInput')?.click()}
                  >
                    {mainImagePreview || formData.image ? (
                      <img 
                        src={mainImagePreview || formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-300 mb-3" />
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600 font-semibold">Tải lên ảnh bìa</p>
                          <p className="text-xs text-gray-400 italic">JPG, PNG. Max 5MB</p>
                        </div>
                      </>
                    )}
                    <input 
                      id="mainImageInput" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleMainImageChange} 
                    />
                  </div>
                </div>

                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-gray-400" />
                      Dịch vụ đi kèm (Guiding)
                    </label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('guideService')} className="h-7 text-xs px-2 rounded-lg bg-white">
                      <Plus className="w-3 h-3 mr-1" /> Thêm
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.guideService.map((service: string, idx: number) => (
                      <div key={idx} className="flex gap-2 group">
                        <Input 
                          value={service} 
                          onChange={(e) => handleArrayChange(idx, e.target.value, 'guideService')}
                          placeholder="VD: Hướng dẫn viên địa phương"
                          className="bg-white border-gray-200 focus:border-gray-900 rounded-xl"
                        />
                        {formData.guideService.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(idx, 'guideService')} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Basic Info & Destinations */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-gray-700">Tên Tour</label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="VD: Khám phá Vịnh Hạ Long"
                      required 
                      className="h-11 rounded-xl border-gray-200 focus:border-gray-900"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Giá</label>
                    <Input 
                      name="price" 
                      type="text" 
                      value={formatWithDots(formData.price)} 
                      onChange={handleInputChange} 
                      required 
                      placeholder="VD: 1.000.000"
                      className="h-11 rounded-xl border-gray-200 focus:border-gray-900"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Thời lượng (ngày)</label>
                    <Input 
                      name="duration" 
                      type="number" 
                      value={formData.duration} 
                      onChange={handleInputChange} 
                      required 
                      className="h-11 rounded-xl border-gray-200 focus:border-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Giảm giá (%)</label>
                    <Input 
                      name="discount" 
                      type="number" 
                      value={formData.discount} 
                      onChange={handleInputChange} 
                      className="h-11 rounded-xl border-gray-200 focus:border-gray-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Loại chỗ ở</label>
                    <select 
                      name="stayOption" 
                      value={formData.stayOption} 
                      onChange={handleInputChange}
                      className="w-full h-11 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-900 outline-none transition-all"
                    >
                      {Object.values(StayOption).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-gray-700">Điểm khởi hành</label>
                    <select 
                      name="departureLocationId" 
                      value={formData.departureLocationId} 
                      onChange={handleInputChange}
                      className="w-full h-11 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-900 outline-none transition-all"
                    >
                      {locations?.map((loc: any) => (
                        <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Điểm đến (Destinations)
                    </label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('destinationIds')} className="h-7 text-xs px-2 rounded-lg bg-white">
                      <Plus className="w-3 h-3 mr-1" /> Thêm điểm đến
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData.destinationIds.map((destId: string, idx: number) => (
                      <div key={idx} className="flex gap-2 group items-center">
                        <select 
                          value={destId} 
                          onChange={(e) => handleArrayChange(idx, e.target.value, 'destinationIds')}
                          className="flex-1 h-10 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm focus:border-gray-900 outline-none transition-all"
                        >
                          <option value="">Chọn điểm đến...</option>
                          {locations?.map((loc: any) => (
                            <option key={loc.id} value={loc.id}>{loc.city}, {loc.country}</option>
                          ))}
                        </select>
                        {formData.destinationIds.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem(idx, 'destinationIds')} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between sm:justify-end gap-3 rounded-b-2xl">
              <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)} disabled={isUploading} className="rounded-xl px-6">
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isUploading} className="bg-gray-900 hover:bg-black text-white px-8 h-11 rounded-xl font-bold shadow-lg shadow-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] min-w-44">
                {isUploading ? 'Đang tạo...' : 'Lưu'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}

