"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronRight, Ticket, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BookingSteps from "@/components/tour/BookingSteps";
import useSWR from "swr";
import { tourSessionService } from "@/services/tourSessionService";
import { promotionService } from "@/services/promotionService";
import { bookingService, BookingStatus } from "@/services/bookingService";
import { format } from "date-fns";
import { toast } from "react-toastify";

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
  
  // Fetch session details
  const { data: sessionResponse, isLoading: isSessionLoading } = useSWR(
    sessionId ? `/tour-sessions/${sessionId}` : null,
    () => tourSessionService.findOne(sessionId!)
  );
  
  const tourSession = sessionResponse?.data || sessionResponse;

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  
  // Promotion State
  const [promoCode, setPromoCode] = useState("");
  const [isVerifyingPromo, setIsVerifyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculation
  const subtotal = useMemo(() => {
    // For simplicity, let's assume basePrice is for adults, child is 70% of basePrice
    return (adultCount * basePrice) + (childCount * basePrice * 0.7);
  }, [adultCount, childCount, basePrice]);

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
      console.log('Checking promo code:', promoCode);
      const res = await promotionService.checkCode(promoCode);
      console.log('Promo response:', res);
      const promo = res.data || res;
      
      if (subtotal < promo.minOrderValue) {
        setPromoError(`Đơn hàng tối thiểu ${promo.minOrderValue.toLocaleString()} VND để áp dụng mã này.`);
        setAppliedPromo(null);
      } else {
        setAppliedPromo(promo);
        toast.success("Áp dụng mã giảm giá thành công!");
      }
    } catch (error: any) {
      console.error('Promo error:', error);
      setPromoError(error.message || "Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      setAppliedPromo(null);
    } finally {
      setIsVerifyingPromo(false);
    }
  };

  const handleBooking = async () => {
    if (!sessionId) {
      toast.error("Vui lòng chọn phiên tour!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const bookingData = {
        tourId,
        sessionId,
        promotionId: appliedPromo?.id,
        numberOfPeople: adultCount + childCount,
        totalPrice,
        status: BookingStatus.PENDING,
        // Mocking customer info for now, usually would be in the next step or collected here
        customerName: "Khách hàng Thử nghiệm",
        customerEmail: "test@example.com",
        customerPhone: "0123456789",
      };
      
      console.log('Creating booking:', bookingData);
      const res = await bookingService.create(bookingData);
      console.log('Booking creation result:', res);
      const newBooking = res.data || res;
      
      toast.success("Đã tạo đơn đặt tour!");
      // Redirect to confirmation and payment page
      router.push(`/payment/confirm/${newBooking.id}`);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || "Có lỗi xảy ra khi đặt tour.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => router.back();

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
            <BookingSteps current={0} />
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
                {format(new Date(tourSession.startTime), 'EEEE, dd/MM/yyyy')}
              </p>
              <p className="text-gray-600 text-sm">Giờ khởi hành: {format(new Date(tourSession.startTime), 'HH:mm')}</p>
            </div>
          )}

          <div className="border-t border-dashed border-gray-300 my-4"></div>
        </div>

        {/* Right Column - Selection */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col">
          <h2 className="text-2xl font-bold mb-8">Số lượng khách</h2>

          <div className="space-y-10 flex-1">
            {/* Adult Ticket */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 border-b border-gray-100 pb-10">
              <div>
                <div className="text-[14px] text-[#888888] font-bold uppercase mb-2">Người lớn</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[24px] font-bold text-[#141414]">{basePrice.toLocaleString('vi-VN')} VND</span>
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
                  <span className="text-[24px] font-bold text-[#141414]">{(basePrice * 0.7).toLocaleString('vi-VN')} VND</span>
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
              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-xl border border-green-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Đã giảm <strong>{discountAmount.toLocaleString()} VND</strong> (Mã: {appliedPromo.code})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Summary and Order Action */}
            <div className="mt-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600"><span>Tạm tính:</span> <span>{subtotal.toLocaleString()} VND</span></div>
                {appliedPromo && <div className="flex justify-between text-green-600 font-medium"><span>Khuyến mãi ({appliedPromo.code}):</span> <span>-{discountAmount.toLocaleString()} VND</span></div>}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-xl font-bold">Tổng cộng:</span>
                  <span className="text-3xl font-bold text-[#ff5e1f]">{totalPrice.toLocaleString()} VND</span>
                </div>
              </div>

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
        </div>
      </div>
    </div>
  );
}
