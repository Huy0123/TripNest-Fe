import { Facebook } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { toast } from 'react-toastify';

export default function SocialLoginButtons() {
  const router = useRouter();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        const res: any = await authService.googleLogin(credentialResponse.credential);
        if (res.success) {
          toast.success("Đăng nhập thành công!");
          mutate("/user/me");
          router.push('/');
        }
      }
    } catch (error: any) {
      console.error("Google Login failed:", error);
      toast.error(error?.message || "Đăng nhập Google thất bại");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center w-full [&>div]:w-full">
         <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.error('Google Login Failed');
            }}
            useOneTap={false}
            width="100%"
            theme="outline"
            text="signin_with"
            logo_alignment="center"
            shape="rectangular"
          />
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-colors font-medium"
      >
        <Facebook className="w-5 h-5" fill="currentColor" />
        <span>Tiếp tục với Facebook</span>
      </button>
    </div>
  );
}
