"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { bookingService } from "@/services/bookingService";
import { paymentService } from "@/services/paymentService";
import { Loader2, CheckCircle2, CreditCard, ShieldCheck, ArrowLeft } from "lucide-react";
import BookingSteps from "@/components/tour/BookingSteps";
import { toast } from "react-toastify";

export default function PaymentConfirmPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.bookingId as string;

  const { data: bookingResponse, isLoading } = useSWR(
    bookingId ? `/bookings/${bookingId}` : null,
    () => bookingService.findOne(bookingId)
  );

  const booking = bookingResponse?.data || bookingResponse;

  const handlePayment = async () => {
    try {
      console.log('Initiating VNPay for booking:', bookingId);
      const res = await paymentService.createVNPayUrl({
        bookingId: bookingId,
        amount: booking.totalPrice,
      });
      
      const vnpUrl = res.data?.url || res.url || res.data;
      if (vnpUrl) {
        window.location.href = vnpUrl;
      } else {
        throw new Error("Could not get VNPay URL");
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  }

  if (!booking) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy đơn đặt tour.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 flex justify-center">
            <BookingSteps current={1} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 text-center border-b border-gray-50">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn hàng đã sẵn sàng!</h1>
            <p className="text-gray-500 text-lg">Vui lòng kiểm tra lại thông tin và tiến hành thanh toán.</p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Thông tin chuyến đi</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tour</p>
                    <p className="font-bold text-gray-900">{booking.tour?.name || "Chi tiết tour"}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Mã đơn hàng</p>
                      <p className="font-bold text-gray-900">#{(booking.id || "").slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Số khách</p>
                      <p className="font-bold text-gray-900">{booking.numberOfPeople} người</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Chi tiết thanh toán</h3>
                <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Tổng tiền tour</span>
                    <span>{booking.totalPrice.toLocaleString()} VND</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Cần thanh toán</span>
                    <span className="text-2xl font-bold text-[#ff5e1f]">{booking.totalPrice.toLocaleString()} VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col items-center">
              <div className="bg-blue-50/50 p-4 rounded-xl flex items-center gap-3 mb-8 w-full max-w-lg">
                <ShieldCheck className="w-6 h-6 text-blue-500 shrink-0" />
                <p className="text-sm text-blue-700">Thanh toán an toàn 100% qua cổng VNPay. Thông tin của bạn được bảo mật tuyệt đối.</p>
              </div>

              <button 
                onClick={handlePayment}
                className="w-full max-w-md h-16 bg-[#005ba1] hover:bg-[#004a85] text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3"
              >
                <CreditCard className="w-6 h-6" />
                Thanh toán qua VNPay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
