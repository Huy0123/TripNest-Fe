"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { 
  ArrowLeft, Save, Loader2, Image as ImageIcon, 
  MapPin, Calendar, Info, ListChecks, 
  Trash2, Plus, Clock, Users, CheckCircle2, X, Upload
} from "lucide-react";
import { StayOption } from "@/types/tours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tourService } from "@/services/tourService";
import { tourDetailService } from "@/services/tourDetailService";
import { tourSessionService } from "@/services/tourSessionService";
import { seedService } from "@/services/seedService";
import { DepartureStatus, CreateTourSessionDto, TourSession } from "@/types/tour-session";
import { toast } from "react-toastify";
import { TourMediaSection } from "@/components/admin/tours/TourMediaSection";
import { TourDetailSections } from "@/components/admin/tours/TourDetailSections";
import { TourSessionsSection } from "@/components/admin/tours/TourSessionsSection";
import { TourBasicInfoSection } from "@/components/admin/tours/TourBasicInfoSection";
import { useTour } from "@/hooks/queries/useTours";
import { useLocations } from "@/hooks/queries/useLocations";
import { useTourSessionsByTour } from "@/hooks/queries/useTourSessions";

type TabType = "basic" | "media" | "details" | "sessions";

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [isSaving, setIsSaving] = useState(false);

  // Media pending states
  const [pendingMainImage, setPendingMainImage] = useState<File | null>(null);
  const [currentGallery, setCurrentGallery] = useState<{url: string, publicId?: string, file?: File}[]>([]);
  
  // Preview states
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);

  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    return error.response?.data?.message || error.message || "Đã có lỗi xảy ra";
  };

  // Fetch data
  const { tour, isLoading: tourLoading, mutate: mutateTour } = useTour(tourId);
  const { locations } = useLocations();
  const { sessions, mutate: mutateSessions } = useTourSessionsByTour(tourId);

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (tour && !formData) {
      // Handle legacy or malformed detail
      let detailObj = tour.detail;
      if (typeof detailObj === 'string') {
        try {
          detailObj = JSON.parse(detailObj);
        } catch (e) {
          detailObj = {};
        }
      }

      setFormData({
        ...tour,
        departureLocationId: tour.departureLocation?.id || (tour as any).departureLocationId || "",
        destinationIds: Array.isArray(tour.destinations) && tour.destinations.length > 0
          ? tour.destinations.map((d: any) => d.id || d)
          : (Array.isArray((tour as any).destinationIds) ? (tour as any).destinationIds : [""]),
        guideService: Array.isArray(tour.guideService) ? tour.guideService : [""],
        detail: {
          description: detailObj?.description || "",
          experience: detailObj?.experience || "",
          itinerary: Array.isArray(detailObj?.itinerary) && detailObj.itinerary.length > 0 
            ? detailObj.itinerary 
            : [{ day: "1", title: "", description: "" }],
          inclusions: Array.isArray(detailObj?.inclusions) && detailObj.inclusions.length > 0 
            ? detailObj.inclusions 
            : [""],
          exclusions: Array.isArray(detailObj?.exclusions) && detailObj.exclusions.length > 0 
            ? detailObj.exclusions 
            : [""],
        }
      });
      
      setMainImagePreview(tour.image || null);
      
      setCurrentGallery(tour.detail?.images?.map((img: any) => ({ 
        url: img.url, 
        publicId: img.publicId 
      })) || []);
    }
  }, [tour]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };


  const handleArrayChange = (index: number, value: string, field: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: string) => {
    const newArray = formData[field].filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({ ...prev, [field]: newArray }));
  };

  const handleItineraryChange = (index: number, field: string, value: string) => {
    const newItinerary = [...formData.detail.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, itinerary: newItinerary }
    }));
  };

  const addItineraryItem = () => {
    const newDay = (formData.detail.itinerary.length + 1).toString();
    setFormData((prev: any) => ({
      ...prev,
      detail: {
        ...prev.detail,
        itinerary: [...prev.detail.itinerary, { day: newDay, title: "", description: "" }]
      }
    }));
  };

  const handleDetailArrayChange = (index: number, value: string, field: 'inclusions' | 'exclusions') => {
    const newArr = [...(formData.detail[field] || [])];
    newArr[index] = value;
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, [field]: newArr }
    }));
  };

  const addDetailArrayItem = (field: 'inclusions' | 'exclusions') => {
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, [field]: [...(prev.detail[field] || []), ""] }
    }));
  };

  const removeDetailArrayItem = (index: number, field: 'inclusions' | 'exclusions') => {
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, [field]: (prev.detail[field] || []).filter((_: any, i: number) => i !== index) }
    }));
  };

  const handleSeedData = async () => {
    try {
      setIsSaving(true);
      await seedService.seedTourData(tourId);
      toast.success("Đã tạo data mẫu thành công (Detail, Session, Review)");
      mutateTour();
      mutateSessions();
    } catch (error: any) {
      toast.error(`Lỗi tạo data mẫu: ${getErrorMessage(error)}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const basicInfo = {
        name: formData.name,
        duration: parseInt(formData.duration),
        price: parseInt(formData.price),
        discount: parseInt(formData.discount) || 0,
        stayOption: formData.stayOption,
        guideService: formData.guideService.filter((s: string) => s && s.trim() !== ""),
        departureLocationId: formData.departureLocationId,
        destinationIds: formData.destinationIds.filter((id: string) => id && id.trim() !== ""),
      };

      const detailData = {
        description: formData.detail?.description || "",
        experience: formData.detail?.experience || "",
        itinerary: (Array.isArray(formData.detail?.itinerary) ? formData.detail.itinerary : [])
          .filter((i: any) => i && typeof i.title === 'string' && i.title.trim() !== ""),
        inclusions: (Array.isArray(formData.detail?.inclusions) ? formData.detail.inclusions : [])
          .filter((s: string) => s && s.trim() !== ""),
        exclusions: (Array.isArray(formData.detail?.exclusions) ? formData.detail.exclusions : [])
          .filter((s: string) => s && s.trim() !== ""),
      };

      await tourService.update(tourId, basicInfo);
      
      let detailId = tour?.detail?.id;
      if (!tour?.detail) {
        const res = await tourDetailService.create({ ...detailData, tourId });
        detailId = (res as any).data?.id || (res as any).id;
      } else {
        await tourDetailService.update(detailId!, detailData);
      }
      
      if (pendingMainImage) {
        await tourService.uploadImage(tourId, pendingMainImage);
      }

      const pendingFiles = currentGallery.filter(item => item.file).map(item => item.file as File);
      if (pendingFiles.length > 0 && detailId) {
        await tourDetailService.uploadImages(detailId, pendingFiles);
      }

      const remainingPublicIds = currentGallery
        .filter(item => item.publicId)
        .map(item => item.publicId as string);
      
      const originalPublicIds = tour?.detail?.images?.map((img: any) => img.publicId) as string[] || [];
      const publicIdsToDelete = originalPublicIds.filter((id: string) => !remainingPublicIds.includes(id));
      
      if (publicIdsToDelete.length > 0 && detailId) {
        await Promise.all(publicIdsToDelete.map((pid: string) => tourDetailService.deleteImage(detailId, pid)));
      }

      toast.success("Cập nhật tour thành công");
      
      // Clear pending states
      setPendingMainImage(null);
      
      mutateTour();
    } catch (error: any) {
      console.error('Update tour error:', error);
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map(file => ({
        url: URL.createObjectURL(file),
        file: file
      }));
      setCurrentGallery(prev => [...prev, ...newItems]);
    }
  };

  const removeGalleryPreviewItem = (index: number) => {
    setCurrentGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Session Handlers
  const addSessionItem = async (date?: Date) => {
    // Standard ISO strings are usually safer for backends
    const startDate = date ? new Date(date.setHours(8, 0, 0, 0)).toISOString() : new Date().toISOString();

    const defaultSession: CreateTourSessionDto = {
      tourId,
      startDate,
      capacity: 20,
      adultPrice: Number(formData.price) || 0,
      status: DepartureStatus.OPEN
    };
    
    console.log("Attempting to create session with payload:", defaultSession);

    try {
      const res = await tourSessionService.create(defaultSession);
      console.log("Session created successfully:", res);
      toast.success("Đã thêm session mới");
      mutateSessions();
    } catch (error: any) {
      console.error("Add session error details:", error);
      toast.error(`Không thể thêm session: ${getErrorMessage(error)}`);
    }
  };

  const updateSessionItem = async (index: number, field: string, value: any) => {
    const sessionId = sessions[index]?.id;
    if (sessionId) {
      try {
        // If it's a date field from datetime-local, convert to ISO
        let finalValue = value;
        if (field === 'startDate' && value) {
          finalValue = new Date(value).toISOString();
        }

        await tourSessionService.update(sessionId, { [field]: finalValue } as Partial<TourSession>);
        mutateSessions();
      } catch (error: any) {
        console.error("Update session error:", error);
        toast.error(getErrorMessage(error));
      }
    }
  };

  const removeSessionItem = async (index: number) => {
    const sessionId = sessions[index]?.id;
    if (sessionId && confirm("Xác nhận xóa session này?")) {
      try {
        await tourSessionService.remove(sessionId);
        toast.success("Đã xóa session");
        mutateSessions();
      } catch (error) {
        toast.error("Lỗi khi xóa session");
      }
    }
  };

  if (tourLoading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/tours")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{tour?.name}</h1>
            <p className="text-sm text-gray-500">ID: #{tourId.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleSeedData} 
            disabled={isSaving} 
            className="flex items-center gap-2 px-6 h-11 rounded-xl border-dashed"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Tạo data mẫu
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-gray-900 hover:bg-black text-white gap-2 px-6 h-11 rounded-xl">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab("basic")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "basic" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Info className="w-5 h-5" />
            Thông tin cơ bản
          </button>
          <button 
            onClick={() => setActiveTab("media")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "media" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <ImageIcon className="w-5 h-5" />
            Hình ảnh
          </button>
          <button 
            onClick={() => setActiveTab("details")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "details" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <ListChecks className="w-5 h-5" />
            Lịch trình & Chi tiết
          </button>
          <button 
            onClick={() => setActiveTab("sessions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "sessions" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Calendar className="w-5 h-5" />
            Quản lý Session
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm min-h-[600px]">
          {activeTab === "basic" && (
            <TourBasicInfoSection 
              formData={formData}
              locations={locations}
              mainImagePreview={mainImagePreview}
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              handleMainImageChange={handleMainImageChange}
            />
          )}

          {activeTab === "media" && (
            <TourMediaSection 
              handleGalleryChange={handleGalleryChange}
              removeGalleryPreviewItem={removeGalleryPreviewItem}
              galleryPreviews={currentGallery.map(item => item.url)}
            />
          )}

          {activeTab === "details" && (
            <TourDetailSections 
              formData={formData}
              handleInputChange={handleInputChange}
              handleItineraryChange={handleItineraryChange}
              addItineraryItem={addItineraryItem}
              handleDetailArrayChange={handleDetailArrayChange}
              addDetailArrayItem={addDetailArrayItem}
              removeDetailArrayItem={removeDetailArrayItem}
            />
          )}

          {activeTab === "sessions" && (
            <TourSessionsSection 
              tourId={tourId}
              sessions={sessions}
              addSessionItem={addSessionItem}
              updateSessionItem={updateSessionItem}
              removeSessionItem={removeSessionItem}
              mutateSessions={mutateSessions}
              tourPrice={formData.price}
            />
          )}
        </div>
      </div>
    </div>
  );
}
