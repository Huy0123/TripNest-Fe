"use client";

import React, { useState } from "react";
import { ProfileInput } from "./ProfileInput";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Camera, Calendar as CalendarIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import { userService } from "@/services/userService";
import { mutate } from "swr";
import { toast } from "react-toastify";

export default function ProfileForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [openDate, setOpenDate] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    birthDate: "",
  });

  // Sync local state when user data from useAuth changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.profile?.phone || user.phone || user.phoneNumber || "",
        address: user.profile?.address || (typeof user.address === 'string' ? user.address : "") || "",
        birthDate: user.profile?.birthDate ? user.profile.birthDate.split('T')[0] : (user.dateOfBirth ? user.dateOfBirth.split('T')[0] : ""),
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (!user?.id) throw new Error("Không tìm thấy ID người dùng");

      // Cập nhật thông tin cơ bản
      await userService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        address: formData.address,
        birthDate: formData.birthDate ? new Date(formData.birthDate).toISOString() : undefined
      });
      
      // Nếu có chọn ảnh đại diện mới, tải lên
      if (avatarFile) {
        await userService.uploadAvatar(user.id, avatarFile);
      }
      
      await mutate("/users/me");
      
      toast.success("Cập nhật thông tin cá nhân thành công");
    } catch (error: any) {
       toast.error(error?.data?.message || error?.message || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Thông tin cá nhân */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-200">
        <h2 className="header-05-bold text-grey-900 mb-6">Thông tin cá nhân</h2>
        
        {/* Tải lên ảnh đại diện */}
        <div className="mb-8 flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-grey-100 border border-grey-200 flex items-center justify-center">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <UserPlaceholder />
            )}
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isLoading} />
            </label>
          </div>
          <div>
            <h3 className="text-sm font-medium text-grey-900 mb-1">Ảnh đại diện</h3>
            <p className="text-sm text-grey-500 mb-3">Định dạng: JPG, PNG. Dung lượng tối đa: 2MB.</p>
            <label className="inline-block px-4 py-2 border border-grey-300 rounded-lg text-sm font-medium text-grey-700 bg-white hover:bg-grey-50 cursor-pointer disabled:opacity-50">
               Tải ảnh mới
               <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isLoading} />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput 
            label="Tên" 
            placeholder="VD: Huy" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <ProfileInput 
            label="Họ" 
            placeholder="VD: Võ" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-grey-700">Ngày sinh</span>
            <Popover open={openDate} onOpenChange={setOpenDate}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-3 px-4 h-12 w-full text-left transition-colors bg-grey-50 border border-grey-200 rounded-lg hover:border-primary-500 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10",
                    openDate && "border-primary-500 bg-white ring-4 ring-primary-500/10"
                  )}
                >
                  <CalendarIcon className={cn("w-5 h-5 shrink-0", openDate || formData.birthDate ? "text-primary-500" : "text-grey-400")} />
                  <span className={cn("font-medium", formData.birthDate ? "text-grey-900" : "text-grey-400")}>
                    {formData.birthDate ? format(parseISO(formData.birthDate), "dd/MM/yyyy") : "Chọn ngày sinh"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[100] bg-white rounded-xl shadow-xl border border-grey-200" align="start">
                <Calendar
                  mode="single"
                  selected={formData.birthDate ? parseISO(formData.birthDate) : undefined}
                  onSelect={(d) => {
                    setFormData(prev => ({ ...prev, birthDate: d ? format(d, "yyyy-MM-dd") : "" }));
                    setOpenDate(false);
                  }}
                  disabled={{ after: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <ProfileInput 
            label="Số điện thoại" 
            placeholder="VD: 0123456789" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Địa chỉ cá nhân */}
      <div className="bg-white rounded-lg p-8 shadow-sm border border-grey-200">
        <h2 className="header-05-bold text-grey-900 mb-6">Địa chỉ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInput 
            label="E-mail" 
            value={user.email}
            disabled
          />
          <ProfileInput 
            label="Địa chỉ" 
            placeholder="Số nhà, tên đường, quận/huyện..."
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
      
       {/* Thao tác */}
       <div className="flex justify-end gap-4">
           <Button 
              className="w-32 h-12 text-base bg-primary-600 text-white hover:bg-primary-700"
              onClick={handleSave}
              disabled={isLoading}
            >
               {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" /> : 'Lưu thay đổi'}
           </Button>
       </div>
    </div>
  );
}

function UserPlaceholder() {
  return (
    <svg className="w-12 h-12 text-grey-400" fill="currentColor" viewBox="0 0 24 24">
       <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
