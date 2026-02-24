import { Facebook } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { loginWithGoogle } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function SocialLoginButtons() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      if (credentialResponse.credential) {
        const res = await loginWithGoogle(credentialResponse.credential);
        if (res.accessToken && res.user) {
          setAuth(res.accessToken, res.user);
          router.push('/');
        }
      }
    } catch (error) {
      console.error("Google Login failed:", error);
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
        <span>Facebook</span>
      </button>
    </div>
  );
}
