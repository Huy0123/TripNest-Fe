import Image from 'next/image';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left side - Form */}
          <div className="p-8 lg:p-12">
            {children}
          </div>

          {/* Right side - Image & Branding */}
          <div className="hidden lg:block relative bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="absolute inset-0">
              <Image
                src="/images/auth-bg.jpg"
                alt="Travel destination"
                fill
                className="object-cover opacity-80"
                priority
              />
            </div>
            
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-white z-10">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold">JOURNO.</h1>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Explore the World,</h2>
                <p className="text-2xl font-light">One Destination at a Time</p>
                
                <div className="flex gap-2 justify-center mt-8">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
