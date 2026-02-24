'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop",
    title: "Explore the World,",
    subtitle: "One Destination at a Time",
  },
  {
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1920&auto=format&fit=crop",
    title: "Discover Hidden Gems,",
    subtitle: "Embrace the Journey",
  },
  {
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1920&auto=format&fit=crop",
    title: "Unforgettable Experiences,",
    subtitle: "Create Memories Forever",
  }
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        if (credentialResponse.credential) {
          const res = await loginWithGoogle(credentialResponse.credential);
          if (res.accessToken && res.user) {
            setAuth(res.accessToken, res.user);
            router.push('/');
          }
        }
      } catch (error) {
        console.error("Google One Tap login failed:", error);
      }
    },
    onError: () => {
      console.error("Google One Tap login failed");
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Form */}
          <div className="p-8 lg:p-12 z-20 bg-white relative">
            {children}
          </div>

          {/* Right side - Image & Branding */}
          <div className="hidden md:block relative bg-gray-900 overflow-hidden">
            {/* Background Image Slider */}
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === index ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                }`}
              >
                <img
                  src={slide.image}
                  alt={`Travel destination ${index + 1}`}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            ))}
            
            <div className="relative h-full flex flex-col items-center justify-between p-12 text-white z-10 pointer-events-none">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h1 className="text-4xl font-bold">Trip Nest.</h1>
                </div>
              </div>

              <div className="text-center transition-all duration-500 transform">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">{slides[currentSlide].title}</h2>
                <p className="text-2xl font-light drop-shadow-md">{slides[currentSlide].subtitle}</p>
                
                <div className="flex gap-2 justify-center mt-8 pointer-events-auto">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
