/**
 * Forgot Password Page
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormError } from '@/components/ui/error-state';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword({ email });
      setSuccess(true);
      toast.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!');
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(err?.data?.message || err?.message || 'Gửi liên kết thất bại. Vui lòng thử lại.');
      toast.error(err?.data?.message || err?.message || 'Gửi liên kết thất bại.');
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
            <Mail className="icon-lg text-primary-600" />
          </div>
          <h1 className="header-03-bold text-grey-900 mb-2">Quên mật khẩu?</h1>
          <p className="body-01-regular text-grey-600">
            Đừng lo lắng, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          {success ? (
            /* Success State */
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="header-06-bold text-grey-900">Kiểm tra email của bạn</h2>
              <p className="body-02-regular text-grey-600">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến địa chỉ email của bạn
              </p>
              <Link
                href={`/reset-password?email=${encodeURIComponent(email)}`}
                className="inline-block mt-4 body-02-medium text-primary-600 hover:text-primary-700"
              >
                Quay lại Đăng nhập
              </Link>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <FormError message={error} />
              )}

              <Input
                label="Địa chỉ Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                required
                autoComplete="email"
                disabled={isLoading}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !email}
              >
                {isLoading ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
              </Button>

              <Link
                href="/signin"
                className="block text-center body-02-medium text-grey-700 hover:text-grey-900 transition-colors"
              >
                Quay lại Đăng nhập
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
