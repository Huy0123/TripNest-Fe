'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyAccount, resendVerificationEmail } from '@/lib/api/auth';
import AuthLayout from '@/components/auth/AuthLayout';

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 60;

export default function VerifyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Đếm ngược resend
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Chỉ nhận số
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      // Paste nhiều ký tự — phân phối vào các ô
      const digits = value.slice(0, OTP_LENGTH - index).split('');
      digits.forEach((d, i) => {
        newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length < OTP_LENGTH) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      await verifyAccount(email, otpCode);
      setSuccess('Account verified successfully! Redirecting to sign in...');
      setTimeout(() => router.push('/signin'), 2000);
    } catch (err: any) {
      setError(err?.data?.message || err.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setError('');
    try {
      await resendVerificationEmail(email);
      setCountdown(RESEND_COUNTDOWN);
      setCanResend(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err?.data?.message || err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h2>
          <p className="text-gray-600 text-sm">
            We sent a 6-digit code to{' '}
            <span className="font-semibold text-gray-800">{email || 'your email'}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter verification code
            </label>
            <div className="flex gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleKeyDown(index, e)}
                  onFocus={e => e.target.select()}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors
                    ${error ? 'border-red-400 bg-red-50' : digit ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'}`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Success */}
            {success && (
              <div className="mt-3 flex items-center justify-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium">{success}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !!success}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium
              hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2
              focus:ring-blue-500 focus:ring-offset-2
              ${(isLoading || success) ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Verifying...' : 'Verify Account'}
          </button>

          {/* Resend */}
          <div className="text-center text-sm text-gray-600">
            Didn&apos;t receive the code?{' '}
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend code'}
              </button>
            ) : (
              <span className="text-gray-400">
                Resend in <span className="font-semibold text-gray-600">{countdown}s</span>
              </span>
            )}
          </div>

          {/* Back to Sign In */}
          <div className="text-center">
            <Link href="/signin" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
