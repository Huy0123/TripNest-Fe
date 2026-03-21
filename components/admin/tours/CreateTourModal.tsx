'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, X, Upload, Image as ImageIcon, Loader2, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { StayOption } from '@/types/tours';
import { Location } from '@/types/location';
import { toast } from 'react-toastify';
import { tourService } from '@/services/tourService';
import { tourDetailService } from '@/services/tourDetailService';

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  locations: Location[];
}

const initialFormState = {
  name: '',
  duration: 1,
  price: '',
  discount: '',
  departureLocationId: '',
  stayOption: StayOption.HOTEL,
  guideService: [''],
  destinationIds: [''],
};

export function CreateTourModal({ isOpen, onClose, onSuccess, locations }: CreateTourModalProps) {
  const [formData, setFormData] = useState<any>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        ...initialFormState,
        departureLocationId: locations[0]?.id || '',
      });
      setMainImageFile(null);
      setMainImagePreview(null);
    }
  }, [isOpen, locations]);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

      if (tourId) {
        try {
          await tourDetailService.create({
            tourId,
            description: '',
            experience: '',
            itinerary: [],
            moreInfo: []
          });
        } catch (detailError) {
          console.error('Failed to initialize tour details:', detailError);
        }
      }

      if (tourId && mainImageFile) {
        await tourService.uploadImage(tourId, mainImageFile);
      }
      
      toast.success('Thêm Tour thành công');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Create tour error:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo tour');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Thêm Tour Mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-2">
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
            <Button type="button" variant="ghost" onClick={onClose} disabled={isUploading} className="rounded-xl px-6">
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={isUploading} className="bg-gray-900 hover:bg-black text-white px-8 h-11 rounded-xl font-bold shadow-lg shadow-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98] min-w-44">
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Đang tạo...
                </>
              ) : 'Lưu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
