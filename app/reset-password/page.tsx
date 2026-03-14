'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/ui/error-state';
import Link from 'next/link';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const OTP_LENGTH = 6;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  
  // Step 1 State
  const [otpArray, setOtpArray] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Step 2 State
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam && !email) {
      setEmail(emailParam);
    }
  }, [searchParams, email]);

  // --- Step 1 Actions ---
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpArray];

    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH - index).split('');
      digits.forEach((d, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = d;
        }
      });
      setOtpArray(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      if (error) setError(null);
      return;
    }

    newOtp[index] = value;
    setOtpArray(newOtp);
    if (error) setError(null);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otpArray.join('');

    if (otpCode.length < OTP_LENGTH) {
      setError('Vui lòng nhập đầy đủ mã xác thực 6 chữ số.');
      return;
    }

    if (!email) {
      setError('Thiếu địa chỉ email.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyResetPasswordOtp({ email, otp: otpCode });
      setStep(2);
      toast.success('Xác thực mã OTP thành công!');
    } catch (err: any) {
      console.error('Verify OTP error:', err);
      setError(err?.data?.message || err?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step 2 Actions ---
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        email,
        otp: otpArray.join(''),
        newPassword: passwords.newPassword,
        confirmNewPassword: passwords.confirmNewPassword
      });
      toast.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.');
      router.push('/signin');
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err?.data?.message || err?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
            {step === 1 ? (
              <ShieldCheck className="icon-lg text-primary-600" />
            ) : (
              <KeyRound className="icon-lg text-primary-600" />
            )}
          </div>
          <h1 className="header-03-bold text-grey-900 mb-2">
            {step === 1 ? 'Xác thực mã OTP' : 'Thiết lập mật khẩu mới'}
          </h1>
          <p className="body-01-regular text-grey-600">
            {step === 1 
              ? `Chúng tôi đã gửi mã xác thực đến ${email || 'email của bạn'}`
              : 'Nhập mật khẩu mới của bạn bên dưới.'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          {error && <div className="mb-6"><FormError message={error} /></div>}

          {step === 1 ? (
            /* --- Step 1: OTP --- */
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Nhập mã đặt lại mật khẩu
                </label>
                <div className="flex gap-3 justify-center">
                  {otpArray.map((digit, index) => (
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
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                        transition-colors
                        ${error ? 'border-red-400 bg-red-50' : digit ? 'border-primary-400 bg-primary-50' : 'border-gray-300 bg-white'}`}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || otpArray.join('').length < OTP_LENGTH}
              >
                {isLoading ? 'Đang xác thực...' : 'Xác thực mã'}
              </Button>

              <Link
                href="/signin"
                className="block text-center body-02-medium text-grey-700 hover:text-grey-900 transition-colors"
              >
                Quay lại Đăng nhập
              </Link>
            </form>
          ) : (
            /* --- Step 2: New Password --- */
            <form onSubmit={handleResetPassword} className="space-y-6">
              <Input
                label="Mật khẩu mới"
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu mới (tối thiểu 8 ký tự)"
                required
                disabled={isLoading}
              />

              <Input
                label="Xác nhận mật khẩu mới"
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                placeholder="Nhập lại mật khẩu mới"
                required
                disabled={isLoading}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !passwords.newPassword || !passwords.confirmNewPassword}
              >
                {isLoading ? 'Đang đặt lại mật khẩu...' : 'Đặt lại mật khẩu'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
