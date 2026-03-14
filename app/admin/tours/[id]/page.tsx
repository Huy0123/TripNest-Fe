"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { 
  ArrowLeft, Save, Loader2, Image as ImageIcon, 
  MapPin, Calendar, Info, ListChecks, Video, 
  Trash2, Plus, Clock, Users, CheckCircle2, X, Upload
} from "lucide-react";
import { StayOption } from "@/types/tours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tourService } from "@/services/tourService";
import { tourDetailService } from "@/services/tourDetailService";
import { tourSessionService, TourSession } from "@/services/tourSessionService";
import { DepartureStatus } from "@/types/tour-session";
import { locationService } from "@/services/locationService";
import { toast } from "react-toastify";
import { TourMediaSection } from "@/components/admin/tours/TourMediaSection";
import { TourDetailSections } from "@/components/admin/tours/TourDetailSections";
import { TourSessionsSection } from "@/components/admin/tours/TourSessionsSection";
import { TourBasicInfoSection } from "@/components/admin/tours/TourBasicInfoSection";

type TabType = "basic" | "media" | "details" | "sessions";

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [isSaving, setIsSaving] = useState(false);

  // Media pending states
  const [pendingMainImage, setPendingMainImage] = useState<File | null>(null);
  const [pendingVideo, setPendingVideo] = useState<File | null>(null);
  const [currentGallery, setCurrentGallery] = useState<{url: string, publicId?: string, file?: File}[]>([]);
  
  // Preview states
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const getErrorMessage = (error: any) => {
    if (typeof error === 'string') return error;
    return error.response?.data?.message || error.message || "Đã có lỗi xảy ra";
  };

  // Fetch data
  const { data: tourRes, isLoading: tourLoading } = useSWR(
    tourId ? `/tours/${tourId}` : null,
    () => tourService.findOne(tourId)
  );
  const { data: locationsRes } = useSWR("/locations", () => locationService.findAll());
  const { data: sessionsRes, mutate: mutateSessions } = useSWR(
    tourId ? `/tour-sessions/tour/${tourId}` : null,
    () => tourSessionService.findByTour(tourId)
  );

  const tour = tourRes?.data || tourRes;
  const locations = locationsRes?.data || [];
  const sessions = sessionsRes?.data || [];

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (tour && !formData) {
      setFormData({
        ...tour,
        departureLocationId: tour.departureLocation?.id || tour.departureLocationId || "",
        destinationIds: tour.destinations?.length > 0 
          ? tour.destinations.map((d: any) => d.id || d)
          : tour.destinationIds || [""],
        guideService: tour.guideService || [""],
        detail: {
          description: tour.detail?.description || "",
          experience: tour.detail?.experience || "",
          itinerary: tour.detail?.itinerary || [{ day: "1", title: "", description: "" }],
          moreInfo: tour.detail?.moreInfo || [{ title: "", subtitle: "", items: [""] }]
        }
      });
      
      // Initialize previews from tour data
      setMainImagePreview(tour.image || null);
      setVideoPreview(tour.detail?.video || null);
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

  const handleMoreInfoChange = (index: number, field: string, value: string) => {
    const newMoreInfo = [...formData.detail.moreInfo];
    newMoreInfo[index] = { ...newMoreInfo[index], [field]: value };
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, moreInfo: newMoreInfo }
    }));
  };

  const addMoreInfoItem = () => {
    setFormData((prev: any) => ({
      ...prev,
      detail: {
        ...prev.detail,
        moreInfo: [...prev.detail.moreInfo, { title: "", subtitle: "", items: [""] }]
      }
    }));
  };

  const removeMoreInfoItem = (index: number) => {
    const newMoreInfo = formData.detail.moreInfo.filter((_: any, i: number) => i !== index);
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, moreInfo: newMoreInfo }
    }));
  };

  const handleMoreInfoSubItemChange = (infoIdx: number, itemIdx: number, value: string) => {
    const newMoreInfo = [...formData.detail.moreInfo];
    const newItems = [...newMoreInfo[infoIdx].items];
    newItems[itemIdx] = value;
    newMoreInfo[infoIdx] = { ...newMoreInfo[infoIdx], items: newItems };
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, moreInfo: newMoreInfo }
    }));
  };

  const addMoreInfoSubItem = (infoIdx: number) => {
    const newMoreInfo = [...formData.detail.moreInfo];
    newMoreInfo[infoIdx] = { 
      ...newMoreInfo[infoIdx], 
      items: [...newMoreInfo[infoIdx].items, ""] 
    };
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, moreInfo: newMoreInfo }
    }));
  };

  const removeMoreInfoSubItem = (infoIdx: number, itemIdx: number) => {
    const newMoreInfo = [...formData.detail.moreInfo];
    const newItems = newMoreInfo[infoIdx].items.filter((_: any, i: number) => i !== itemIdx);
    newMoreInfo[infoIdx] = { ...newMoreInfo[infoIdx], items: newItems };
    setFormData((prev: any) => ({
      ...prev,
      detail: { ...prev.detail, moreInfo: newMoreInfo }
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const submissionData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        discount: Number(formData.discount) || 0,
        guideService: formData.guideService.filter((s: string) => s.trim() !== ""),
        destinationIds: formData.destinationIds.filter((id: string) => id.trim() !== ""),
        detail: {
          ...formData.detail,
          itinerary: formData.detail.itinerary.filter((i: any) => i.title.trim() !== ""),
          moreInfo: formData.detail.moreInfo
            .filter((m: any) => m.title.trim() !== "")
            .map((m: any) => ({
              ...m,
              items: m.items.filter((item: string) => item.trim() !== "")
            }))
        }
      };
      await tourService.update(tourId, submissionData);

      if (pendingMainImage) {
        await tourService.uploadImage(tourId, pendingMainImage);
      }

      const pendingFiles = currentGallery.filter(item => item.file).map(item => item.file as File);
      if (pendingFiles.length > 0) {
        await tourDetailService.uploadImages(tourId, pendingFiles);
      }

      if (pendingVideo) {
        await tourDetailService.uploadVideo(tourId, pendingVideo);
      }

      const remainingPublicIds = currentGallery
        .filter(item => item.publicId)
        .map(item => item.publicId as string);
      
      const originalPublicIds = (tour.detail?.images?.map((img: any) => img.publicId) as string[]) || [];
      const publicIdsToDelete = originalPublicIds.filter((id: string) => !remainingPublicIds.includes(id));
      
      if (publicIdsToDelete.length > 0) {
        await Promise.all(publicIdsToDelete.map((id: string) => tourDetailService.deleteImage(tourId, id)));
      }

      toast.success("Cập nhật tour thành công");
      
      // Clear pending states
      setPendingMainImage(null);
      setPendingVideo(null);
      
      mutate(`/tours/${tourId}`);
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

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const removeGalleryPreviewItem = (index: number) => {
    setCurrentGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Session Handlers
  const addSessionItem = async (date?: Date) => {
    // Standard ISO strings are usually safer for backends
    const startDate = date ? new Date(date.setHours(8, 0, 0, 0)).toISOString() : new Date().toISOString();

    const defaultSession: Partial<TourSession> = {
      tourId,
      startDate,
      capacity: 20,
      adultPrice: formData.price || 0,
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
            <h1 className="text-2xl font-bold text-gray-900">{tour.name}</h1>
            <p className="text-sm text-gray-500">ID: #{tourId.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <div className="flex gap-3">
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
            Hình ảnh & Video
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
              handleMainImageChange={handleMainImageChange}
              handleGalleryChange={handleGalleryChange}
              handleVideoChange={handleVideoChange}
              removeGalleryPreviewItem={removeGalleryPreviewItem}
              mainImagePreview={mainImagePreview}
              galleryPreviews={currentGallery.map(item => item.url)}
              videoPreview={videoPreview}
            />
          )}

          {activeTab === "details" && (
            <TourDetailSections 
              formData={formData}
              handleInputChange={handleInputChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              handleItineraryChange={handleItineraryChange}
              addItineraryItem={addItineraryItem}
              handleMoreInfoChange={handleMoreInfoChange}
              addMoreInfoItem={addMoreInfoItem}
              removeMoreInfoItem={removeMoreInfoItem}
              handleMoreInfoSubItemChange={handleMoreInfoSubItemChange}
              addMoreInfoSubItem={addMoreInfoSubItem}
              removeMoreInfoSubItem={removeMoreInfoSubItem}
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
