'use client';

import React from 'react';

interface TourIntroProps {
  title: string;
  description: string;
}

export default function TourIntro({ title, description }: TourIntroProps) {
  // Split description by newlines to render paragraphs if available
  const paragraphs = description.split('\n').filter(p => p.trim() !== '');

  return (
    <div className="bg-white">
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#141414] leading-snug mb-4">
        Về {title}
      </h2>
      <div className="space-y-4">
        {paragraphs.map((p, idx) => (
          <p key={idx} className="text-[#4b4b4b] text-[15px] leading-relaxed">
             {p}
          </p>
        ))}
      </div>
    </div>
  );
}
