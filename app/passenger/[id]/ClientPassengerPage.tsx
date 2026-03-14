"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import BookingSteps from "@/components/tour/BookingSteps";

const MOCK_ORDER = {
  tourName: "[COMBO] Vé Cáp Treo Khứ Hồi Tuyến Chùa Hang + Vân Sơn",
  date: "Hôm nay, 8 thg 3 2026",
  adults: 2,
  children: 1,
  adultPrice: 618557,
  childPrice: 474227,
};

const TITLES = ["Anh", "Chị", "Ông", "Bà", "Khác"];

export default function ClientPassengerPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;

  const [isSelf, setIsSelf] = useState(true);
  const [contactSaved, setContactSaved] = useState(false);
  const [guestSaved, setGuestSaved] = useState(false);

  const [contact, setContact] = useState({ title: "Anh", fullName: "", phone: "", email: "" });
  const [guest, setGuest] = useState({ title: "Anh", fullName: "", phone: "", email: "", note: "" });

  const fillGuestFromContact = () => ({
    ...guest,
    title: contact.title,
    fullName: contact.fullName,
    phone: contact.phone,
    email: contact.email,
  });

  const handleSaveContact = () => {
    setContactSaved(true);
    if (isSelf) {
      setGuest(fillGuestFromContact());
    }
  };

  const handleSwitchToSelf = () => {
    setIsSelf(true);
    setGuest(fillGuestFromContact());
  };

  const handleSwitchToOther = () => {
    setIsSelf(false);
    setGuest({ title: "Anh", fullName: "", phone: "", email: "", note: "" });
    setGuestSaved(false);
  };

  const handleSaveGuest = () => setGuestSaved(true);

  const totalPrice =
    MOCK_ORDER.adults * MOCK_ORDER.adultPrice + MOCK_ORDER.children * MOCK_ORDER.childPrice;
  const totalAfterDiscount = Math.round(totalPrice * 0.95);

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0194f3]/30 focus:border-[#0194f3] transition-all bg-white";
  const labelCls = "block text-[13px] font-semibold text-gray-600 mb-1.5";

  const TitlePicker = ({
    value,
    onChange,
    disabled,
  }: {
    value: string;
    onChange: (t: string) => void;
    disabled?: boolean;
  }) => (
    <div className="flex gap-2 flex-wrap">
      {TITLES.map((t) => (
        <button
          key={t}
          type="button"
          disabled={disabled}
          onClick={() => onChange(t)}
          className={`px-4 py-2 rounded-xl border text-[14px] font-medium transition-all ${
            value === t
              ? "bg-[#e5f4ff] border-[#0194f3] text-[#0194f3]"
              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center px-4 md:px-8 py-4 gap-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 flex justify-center">
            <BookingSteps current={1} />
          </div>
          <div className="w-9 shrink-0" />
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="flex flex-col gap-6">

          {/* ── Contact section ── */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-gray-900">Thông tin liên hệ</h2>
              {contactSaved ? (
                <button type="button" onClick={() => setContactSaved(false)} className="text-[14px] font-bold text-[#0194f3] hover:text-[#007ce8] transition-colors">
                  Chỉnh sửa Chi tiết
                </button>
              ) : (
                <button type="button" onClick={handleSaveContact} className="text-[14px] font-bold text-[#0194f3] hover:text-[#007ce8] transition-colors">
                  Lưu
                </button>
              )}
            </div>

            {contactSaved ? (
              <div className="mb-5">
                <p className="font-bold text-[16px] text-gray-900 mb-3">{contact.title} {contact.fullName}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px]">
                  <div>
                    <p className="text-gray-400 mb-0.5">Số di động</p>
                    <p className="font-semibold text-gray-800">{contact.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-0.5">Email</p>
                    <p className="font-semibold text-gray-800">{contact.email || "—"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Xưng danh</label>
                  <TitlePicker value={contact.title} onChange={(t) => setContact({ ...contact, title: t })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" value={contact.fullName}
                    onChange={(e) => setContact({ ...contact, fullName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="0901 234 567" value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                  <input type="email" placeholder="example@email.com" value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })} className={inputCls} />
                </div>
              </div>
            )}

            {/* Radio toggle */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
              <label className={`flex items-center gap-3 border-2 rounded-xl px-5 py-3 cursor-pointer transition-all flex-1 ${isSelf ? "border-[#0194f3] bg-[#f0f8ff]" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <input type="radio" name="whoTravel" className="sr-only" checked={isSelf} onChange={handleSwitchToSelf} />
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${isSelf ? "border-[#0194f3]" : "border-gray-300"}`}>
                  {isSelf && <div className="w-2.5 h-2.5 rounded-full bg-[#0194f3]" />}
                </div>
                <span className={`text-[15px] font-semibold ${isSelf ? "text-[#0194f3]" : "text-gray-700"}`}>Tôi là khách tham quan</span>
              </label>
              <label className={`flex items-center gap-3 border-2 rounded-xl px-5 py-3 cursor-pointer transition-all flex-1 ${!isSelf ? "border-[#0194f3] bg-[#f0f8ff]" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                <input type="radio" name="whoTravel" className="sr-only" checked={!isSelf} onChange={handleSwitchToOther} />
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${!isSelf ? "border-[#0194f3]" : "border-gray-300"}`}>
                  {!isSelf && <div className="w-2.5 h-2.5 rounded-full bg-[#0194f3]" />}
                </div>
                <span className={`text-[15px] font-semibold ${!isSelf ? "text-[#0194f3]" : "text-gray-700"}`}>Tôi đặt cho người khác</span>
              </label>
            </div>
          </section>

          {/* ── Guest section (same style as contact) ── */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-gray-900">Thông tin khách</h2>
              {guestSaved ? (
                <button type="button" onClick={() => setGuestSaved(false)} className="text-[14px] font-bold text-[#0194f3] hover:text-[#007ce8] transition-colors">
                  Chỉnh sửa Chi tiết
                </button>
              ) : (
                <button type="button" onClick={handleSaveGuest}
                  disabled={isSelf && !contactSaved}
                  className="text-[14px] font-bold text-[#0194f3] hover:text-[#007ce8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Lưu
                </button>
              )}
            </div>

            {guestSaved ? (
              <div>
                <p className="font-bold text-[16px] text-gray-900 mb-3">{guest.title} {guest.fullName}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px]">
                  <div>
                    <p className="text-gray-400 mb-0.5">Số di động</p>
                    <p className="font-semibold text-gray-800">{guest.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-0.5">Email</p>
                    <p className="font-semibold text-gray-800">{guest.email || "—"}</p>
                  </div>
                </div>
                {guest.note && (
                  <div className="mt-3 text-[14px]">
                    <p className="text-gray-400 mb-0.5">Ghi chú</p>
                    <p className="text-gray-800">{guest.note}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Xưng danh</label>
                  <TitlePicker value={guest.title} onChange={(t) => setGuest({ ...guest, title: t })} disabled={isSelf} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" value={guest.fullName}
                    disabled={isSelf}
                    onChange={(e) => setGuest({ ...guest, fullName: e.target.value })}
                    className={inputCls + (isSelf ? " bg-gray-50 text-gray-500 cursor-not-allowed" : "")} />
                </div>
                <div>
                  <label className={labelCls}>Số điện thoại</label>
                  <input type="tel" placeholder="0901 234 567" value={guest.phone}
                    disabled={isSelf}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                    className={inputCls + (isSelf ? " bg-gray-50 text-gray-500 cursor-not-allowed" : "")} />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input type="email" placeholder="example@email.com" value={guest.email}
                    disabled={isSelf}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                    className={inputCls + (isSelf ? " bg-gray-50 text-gray-500 cursor-not-allowed" : "")} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Ghi chú (tuỳ chọn)</label>
                  <textarea rows={3} placeholder="Yêu cầu đặc biệt hoặc thông tin thêm..."
                    value={guest.note}
                    onChange={(e) => setGuest({ ...guest, note: e.target.value })}
                    className={inputCls + " resize-none"} />
                </div>
              </div>
            )}
          </section>

        </div>

        {/* RIGHT: Summary */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-6">
            <h3 className="font-bold text-[16px] text-gray-800 mb-4">Tóm tắt</h3>
            <div className="text-[14px] space-y-2.5 border-b border-gray-100 pb-4 mb-4">
              <p className="font-semibold text-gray-800 leading-snug text-[13px]">{MOCK_ORDER.tourName}</p>
              <div className="flex justify-between text-gray-500">
                <span>Ngày đi</span>
                <span className="font-semibold text-gray-700">{MOCK_ORDER.date}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Người lớn × {MOCK_ORDER.adults}</span>
                <span className="font-semibold text-gray-700">
                  {(MOCK_ORDER.adults * MOCK_ORDER.adultPrice).toLocaleString("vi-VN")} VND
                </span>
              </div>
              {MOCK_ORDER.children > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Trẻ em × {MOCK_ORDER.children}</span>
                  <span className="font-semibold text-gray-700">
                    {(MOCK_ORDER.children * MOCK_ORDER.childPrice).toLocaleString("vi-VN")} VND
                  </span>
                </div>
              )}
              <div className="flex justify-between text-green-600">
                <span>Giảm giá 5%</span>
                <span className="font-semibold">- {(totalPrice - totalAfterDiscount).toLocaleString("vi-VN")} VND</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              <span className="font-bold text-[15px] text-gray-800">Tổng cộng</span>
              <span className="font-bold text-[20px] text-[#ff5e1f]">{totalAfterDiscount.toLocaleString("vi-VN")} VND</span>
            </div>
            <button
              onClick={() => router.push(`/payment/${tourId}`)}
              className="w-full bg-[#ff5e1f] hover:bg-[#e04f16] text-white font-bold py-4 rounded-xl text-[16px] transition-all shadow-lg shadow-orange-500/20"
            >
              Tiếp theo: Thanh toán →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
