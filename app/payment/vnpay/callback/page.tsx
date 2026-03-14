"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { paymentService } from "@/services/paymentService";
import { Loader2, CheckCircle2, XCircle, Home, FileText } from "lucide-react";
import Link from "next/link";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState("Đang xác thực giao dịch...");

  useEffect(() => {
    const verifyPayment = async () => {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      try {
        console.log('Verifying VNPay callback:', params);
        const res = await paymentService.verifyVNPayPayment(params);
        console.log('Verification result:', res);
        
        if (res.data?.success || res.success) {
          setStatus('success');
          setMessage("Thanh toán thành công! Cảm ơn bạn đã lựa chọn TripNest.");
        } else {
          setStatus('error');
          setMessage(res.data?.message || res.message || "Giao dịch không thành công hoặc bị hủy.");
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage("Có lỗi xảy ra khi xác thực giao dịch. Vui lòng liên hệ hỗ trợ.");
      }
    };

    if (searchParams.toString()) {
      verifyPayment();
    }
  }, [searchParams]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl shadow-gray-100 border border-gray-50">
        {status === 'loading' && (
          <div className="space-y-6">
            <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Đang xử lý...</h1>
            <p className="text-gray-500">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Thanh toán hoàn tất!</h1>
            <p className="text-gray-500 text-lg leading-relaxed">{message}</p>
            
            <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/" className="px-8 h-12 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Home className="w-4 h-4" />
                Về trang chủ
              </Link>
              <Link href="/my-bookings" className="px-8 h-12 border border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4" />
                Xem đơn hàng
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Giao dịch thất bại</h1>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">{message}</p>
            
            <div className="pt-8">
              <Link href="/" className="inline-flex px-8 h-12 bg-gray-900 text-white rounded-xl font-bold items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <Home className="w-4 h-4" />
                Quay về trang chủ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VNPayCallbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Suspense fallback={<Loader2 className="w-10 h-10 animate-spin text-blue-500" />}>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
