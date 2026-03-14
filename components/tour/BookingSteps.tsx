"use client";

import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { label: "Chọn vé" },
  { label: "Thông tin khách" },
  { label: "Thanh toán" },
];

interface BookingStepsProps {
  current: 0 | 1 | 2; // 0-indexed
}

export default function BookingSteps({ current }: BookingStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md mx-auto py-2">
      {STEPS.map((step, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all border-2 ${
                  isDone
                    ? "border-[#0194f3] bg-[#0194f3] text-white"
                    : isActive
                    ? "border-[#0194f3] bg-white text-[#0194f3]"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : i + 1}
              </div>
              {/* Label */}
              <span
                className={`text-[12px] font-semibold whitespace-nowrap ${
                  isDone || isActive ? "text-[#0194f3]" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`h-[2px] w-16 mb-4 mx-1 transition-all ${
                  i < current ? "bg-[#0194f3]" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
