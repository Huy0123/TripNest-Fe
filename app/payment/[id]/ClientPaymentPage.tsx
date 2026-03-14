"use client";

import React, { useState } from "react";
import { ArrowLeft, Shield, Wallet, ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import BookingSteps from "@/components/tour/BookingSteps";

const MOCK_ORDER = {
  tourName: "[COMBO] Vé Cáp Treo Khứ Hồi Tuyến Chùa Hang + Vân Sơn",
  tourImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=800&auto=format&fit=crop",
  date: "Hôm nay, 8 thg 3 2026",
  adults: 2,
  children: 1,
  adultPrice: 618557,
  childPrice: 474227,
};

type PaymentMethod = "vnpay";

export default function ClientPaymentPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vnpay");
  const [orderExpanded, setOrderExpanded] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  // 15:00 countdown
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalAdults = MOCK_ORDER.adults * MOCK_ORDER.adultPrice;
  const totalChildren = MOCK_ORDER.children * MOCK_ORDER.childPrice;
  const subtotal = totalAdults + totalChildren;
  const discount = Math.round(subtotal * 0.05);
  const total = subtotal - discount;

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 2000);
  };

  // Success screen
  if (isDone) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Đặt vé thành công!</h2>
          <p className="text-gray-500 text-[15px]">
            Cảm ơn bạn đã đặt vé. Thông tin xác nhận đã được gửi về email của bạn.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 w-full text-left mt-2">
            <div className="flex justify-between text-[14px] mb-2">
              <span className="text-gray-500">Mã đặt vé</span>
              <span className="font-bold text-gray-900">#TN-2026-0308</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-500">Tổng thanh toán</span>
              <span className="font-bold text-[#ff5e1f]">{total.toLocaleString("vi-VN")} VND</span>
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center px-4 md:px-8 py-4 gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 flex justify-center">
            <BookingSteps current={2} />
          </div>
          <div className="w-9 shrink-0" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        {/* ===== LEFT: Form ===== */}
        <div className="flex flex-col gap-6">

          {/* Payment Method */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Countdown Badge */}
            <div className="absolute top-0 right-0 bg-[#fff5f2] text-[#ff5e1f] px-4 py-2 rounded-bl-2xl font-bold flex items-center gap-1.5 text-[14px]">
              <Clock className="w-4 h-4" />
              Thanh toán trong {formatTime(timeLeft)}
            </div>

            <h2 className="text-[18px] font-bold text-gray-900 mb-5">Phương thức thanh toán</h2>
            <div className="flex flex-col gap-3">
              {/* VNPay */}
              <label
                className={`flex items-center gap-4 border-2 rounded-xl px-5 py-4 cursor-pointer transition-all border-[#0194f3] bg-[#f0f8ff]`}
              >
                <input
                  type="radio"
                  name="payment"
                  className="sr-only"
                  checked={true}
                  readOnly
                />
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center border-[#0194f3]`}>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0194f3]" />
                </div>
                <Wallet className={`w-5 h-5 text-[#0194f3]`} />
                <div>
                  <div className="font-semibold text-[15px] text-gray-800">Thanh toán qua VNPay</div>
                  <div className="text-[12px] text-gray-500 mt-0.5">Quét mã QR hoặc dùng thẻ ATM/Visa</div>
                </div>
                <div className="ml-auto shrink-0 w-[50px] h-[30px] rounded bg-white p-1 border border-gray-100 flex items-center justify-center">
                  <span className="font-bold text-[12px] text-blue-700">VNPAY</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* ===== RIGHT: Order Summary ===== */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Tour info header */}
            <div className="relative h-[180px] w-full">
              <Image
                src={MOCK_ORDER.tourImage}
                alt={MOCK_ORDER.tourName}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-[15px] leading-tight line-clamp-2">{MOCK_ORDER.tourName}</p>
              </div>
            </div>

            <div className="p-5">
              {/* Collapsible order details */}
              <button
                onClick={() => setOrderExpanded(!orderExpanded)}
                className="flex items-center justify-between w-full mb-4 text-[15px] font-bold text-gray-800"
              >
                Chi tiết đơn hàng
                {orderExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>

              {orderExpanded && (
                <div className="space-y-3 text-[14px] mb-4 border-b border-gray-100 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Ngày tham quan</span>
                    <span className="font-semibold text-gray-800">{MOCK_ORDER.date}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Người lớn × {MOCK_ORDER.adults}</span>
                    <span className="font-semibold text-gray-800">{totalAdults.toLocaleString("vi-VN")} VND</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Trẻ em × {MOCK_ORDER.children}</span>
                    <span className="font-semibold text-gray-800">{totalChildren.toLocaleString("vi-VN")} VND</span>
                  </div>
                </div>
              )}

              {/* Discount */}
              <div className="flex justify-between text-[14px] mb-2">
                <span className="text-green-600 font-medium">Giảm giá (5%)</span>
                <span className="font-semibold text-green-600">- {discount.toLocaleString("vi-VN")} VND</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                <span className="text-[17px] font-bold text-gray-900">Tổng cộng</span>
                <span className="text-[22px] font-bold text-[#ff5e1f]">{total.toLocaleString("vi-VN")} VND</span>
              </div>
            </div>
          </div>

          {/* Coupon code */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <label className="block text-[14px] font-semibold text-gray-700 mb-2">Mã giảm giá</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã coupon..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0194f3]/30 focus:border-[#0194f3] transition-all"
              />
              <button className="bg-[#0194f3] hover:bg-[#007ce8] text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-[14px] shrink-0">
                Áp dụng
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full h-[56px] bg-[#ff5e1f] hover:bg-[#e04f16] disabled:bg-gray-300 text-white font-extrabold text-[17px] rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Đang xử lý...
              </>
            ) : (
              "Tiếp tục"
            )}
          </button>

          <p className="text-center text-[12px] text-gray-400 px-4">
            Bằng cách nhấn xác nhận, bạn đồng ý với{" "}
            <span className="text-[#0194f3] underline cursor-pointer">Điều khoản sử dụng</span>
            {" "}và{" "}
            <span className="text-[#0194f3] underline cursor-pointer">Chính sách bảo mật</span>
            {" "}của TripNest.
          </p>
        </div>
      </div>
    </div>
  );
}
