"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronRight, Ticket, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSteps from "@/components/tour/BookingSteps";
import useSWR from "swr";
import { tourSessionService } from "@/services/tourSessionService";
import { promotionService } from "@/services/promotionService";
import { bookingService } from "@/services/bookingService";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/format";

interface ClientBookingPageProps {
  tourId: string;
  tourName: string;
  tourImage: string;
  basePrice: number;
}

export default function ClientBookingPage({
  tourId,
  tourName,
  tourImage,
  basePrice,
}: ClientBookingPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  
  const [currentStep, setCurrentStep] = useState(0); // 0: Select tickets, 1: Guest Info

  // Fetch session details
  const { data: sessionResponse, isLoading: isSessionLoading } = useSWR(
    sessionId ? `/tour-sessions/${sessionId}` : null,
    () => tourSessionService.findOne(sessionId!)
  );
  
  const tourSession: any = (sessionResponse as any)?.data || sessionResponse;

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  
  // Promotion State
  const [promoCode, setPromoCode] = useState("");
  const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Customer Information State
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Price calculation
  const adultPrice = tourSession?.adultPrice || basePrice;
  const childPrice = tourSession?.childrenPrice || (adultPrice * 0.7);

  const subtotal = useMemo(() => {
    return (adultCount * adultPrice) + (childCount * childPrice);
  }, [adultCount, childCount, adultPrice, childPrice]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountType === 'PERCENTAGE') {
      let amount = (subtotal * appliedPromo.discountValue) / 100;
      if (appliedPromo.maxDiscount) amount = Math.min(amount, appliedPromo.maxDiscount);
      return amount;
    }
    return Math.min(appliedPromo.discountValue, subtotal);
  }, [subtotal, appliedPromo]);

  const totalPrice = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsVerifyingPromo(true);
    setPromoError("");
    try {
      const res: any = await promotionService.checkCode(promoCode);
      const promo = res.data || res;
      
      if (subtotal < promo.minOrderValue) {
        setPromoError(`Đơn hàng tối thiểu ${formatCurrency(promo.minOrderValue)} để áp dụng mã này.`);
        setAppliedPromo(null);
      } else {
        setAppliedPromo(promo);
        toast.success("Áp dụng mã giảm giá thành công!");
      }
    } catch (error: any) {
      setPromoError(error.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      setAppliedPromo(null);
    } finally {
      setIsVerifyingPromo(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBooking = async () => {
    if (!sessionId) {
      toast.error("Vui lòng chọn phiên tour!");
      return;
    }

    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin liên hệ!");
      return;
    }
    
    
    const bookingData = {
      sessionId,
      tourId,
      adults: adultCount,
      children: childCount,
      promoCode: appliedPromo?.code || undefined,
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
    };

    setIsSubmitting(true);
    try {
      const res: any = await bookingService.create(bookingData);
      console.log('Booking Response:', res);
      
      const newBooking = res.data || res;
      const bookingId = newBooking?.id || newBooking?.data?.id || res?.id;

      if (!bookingId) {
        throw new Error("Không tìm thấy mã đơn hàng (ID) trong phản hồi từ server.");
      }
      
      toast.success("Đã tạo đơn đặt tour! Chuyển đến thanh toán...");
      router.push(`/payment/confirm/${bookingId}`);
    } catch (error: any) {
      console.error('Booking Error:', error);
      const serverMessage = error.message || error.response?.data?.message;
      const displayMessage = Array.isArray(serverMessage) 
        ? serverMessage.join(", ") 
        : (serverMessage || "Có lỗi xảy ra khi đặt tour.");
        
      toast.error(displayMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  if (isSessionLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center px-4 md:px-8 py-4">
          <button onClick={handleBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors shrink-0 mr-2">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 flex justify-center">
            <BookingSteps current={currentStep as any} />
          </div>
          <div className="w-9 shrink-0" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Left Column - Tour Info */}
        <div className="w-full lg:w-[380px] shrink-0 lg:border-r border-gray-100 p-6 lg:p-8 flex flex-col gap-4 bg-gray-50/30">
          <div className="relative w-full h-[220px] rounded-xl overflow-hidden shadow-sm">
            <Image 
              src={tourImage || "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800&auto=format&fit=crop"} 
              alt={tourName} 
              fill 
              className="object-cover"
            />
          </div>
          
          <h3 className="font-bold text-[18px] text-[#141414] leading-tight mt-2">{tourName}</h3>
          
          {tourSession && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-2 mt-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase">
                <CalendarIcon className="w-4 h-4" />
                Ngày khởi hành
              </div>
              <p className="text-[#141414] font-bold text-lg">
                {format(new Date(tourSession.startDate), 'EEEE, dd/MM/yyyy')}
              </p>
              <p className="text-gray-600 text-sm">Giờ khởi hành: {tourSession.startTime || "08:00"}</p>
            </div>
          )}

          <div className="border-t border-dashed border-gray-300 my-4"></div>
          
          <div className="space-y-3">
             <div className="flex justify-between text-gray-600"><span>Người lớn × {adultCount}</span> <span>{formatCurrency(adultCount * adultPrice)}</span></div>
             {childCount > 0 && <div className="flex justify-between text-gray-600"><span>Trẻ em × {childCount}</span> <span>{formatCurrency(childCount * childPrice)}</span></div>}
             {appliedPromo && <div className="flex justify-between text-green-600 font-medium"><span>Giảm giá:</span> <span>-{formatCurrency(discountAmount)}</span></div>}
             <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
               <span className="font-bold">Tổng cộng:</span>
               <span className="text-xl font-bold text-[#ff5e1f]">{formatCurrency(totalPrice)}</span>
             </div>
          </div>
        </div>

        {/* Right Column - Selection/Form */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col">
          {currentStep === 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-8">Số lượng khách</h2>

              <div className="space-y-10 flex-1">
                {/* Adult Ticket */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 border-b border-gray-100 pb-10">
                  <div>
                    <div className="text-[14px] text-[#888888] font-bold uppercase mb-2">Người lớn</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[24px] font-bold text-[#141414]">{formatCurrency(adultPrice)}</span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <button 
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-l-xl bg-white hover:bg-gray-50 text-[#0194f3] text-[24px]"
                    >-</button>
                    <div className="w-14 h-12 flex items-center justify-center border-y border-gray-200 bg-white text-[16px] font-bold">{adultCount}</div>
                    <button 
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-r-xl bg-white hover:bg-gray-50 text-[#0194f3] text-[24px]"
                    >+</button>
                  </div>
                </div>

                {/* Child Ticket */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 pb-10 border-b border-gray-100">
                  <div>
                    <div className="text-[14px] text-[#888888] font-bold uppercase mb-2">Trẻ em</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[24px] font-bold text-[#141414]">{formatCurrency(childPrice)}</span>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0">
                    <button 
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-l-xl bg-white hover:bg-gray-50 text-[#0194f3] text-[24px]"
                    >-</button>
                    <div className="w-14 h-12 flex items-center justify-center border-y border-gray-200 bg-white text-[16px] font-bold">{childCount}</div>
                    <button 
                      onClick={() => setChildCount(childCount + 1)}
                      className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-r-xl bg-white hover:bg-gray-50 text-[#0194f3] text-[24px]"
                    >+</button>
                  </div>
                </div>

                {/* Promotion Section */}
                <div className="pt-4">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary-500" /> Mã giảm giá
                  </h3>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã giảm giá..."
                      className="flex-1 h-12 px-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      disabled={appliedPromo || isVerifyingPromo}
                    />
                    <button 
                      onClick={appliedPromo ? () => {setAppliedPromo(null); setPromoCode("");} : handleApplyPromo}
                      disabled={!promoCode && !appliedPromo || isVerifyingPromo}
                      className={`px-6 h-12 font-bold rounded-xl transition-all ${
                        appliedPromo 
                          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                          : 'bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50'
                      }`}
                    >
                      {isVerifyingPromo ? <Loader2 className="w-5 h-5 animate-spin" /> : appliedPromo ? 'Huỷ' : 'Áp dụng'}
                    </button>
                  </div>
                  {promoError && <p className="mt-2 text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {promoError}</p>}
                </div>

                <div className="mt-12">
                  <button 
                    onClick={handleNextStep}
                    className="w-full h-[60px] bg-[#ff5e1f] hover:bg-[#e04f16] text-white rounded-xl font-bold text-[20px] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    Tiếp tục →
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-8">Thông tin liên hệ</h2>
              <div className="space-y-6 flex-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Họ và tên *</label>
                    <input 
                      type="text" 
                      value={customerInfo.fullName}
                      onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email *</label>
                      <input 
                        type="email" 
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="example@gmail.com"
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="0912 345 678"
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-primary-800">
                      <p className="font-bold mb-1">Xác nhận nhanh chóng</p>
                      <p>Vui lòng kiểm tra kỹ thông tin trước khi xác nhận. Vé điện tử và thông báo sẽ được gửi qua email và số điện thoại trên.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={handleBooking}
                    disabled={isSubmitting}
                    className={`w-full h-[60px] rounded-xl font-bold text-[20px] transition-all flex items-center justify-center gap-2 ${
                      isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ff5e1f] hover:bg-[#e04f16] text-white shadow-lg'
                    }`}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : "Xác nhận đặt tour →"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
