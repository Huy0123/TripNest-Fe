import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/bookings', '/favorites', '/settings'];
const adminRoutes = ['/admin'];

const decodeToken = (token: string) => {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return {};
        
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        const jsonPayload = new TextDecoder().decode(bytes);
        return JSON.parse(jsonPayload);
    } catch (error) {
        return {};
    }
}

function isTokenExpired(token: string): boolean {
  try {
    if (!token) return true;
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true;
    
    const currentTime = Date.now();
    const expiryTime = payload.exp * 1000;
    const isExp = currentTime >= (expiryTime - 10000);
    
    return isExp;
  } catch (error) {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const expired = accessToken ? isTokenExpired(accessToken) : true;
  const needsRefresh = (!accessToken || expired) && !!refreshToken;

  if (needsRefresh) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${backendUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || `refreshToken=${refreshToken}`
        },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include'
      });

      if (res.ok) {
        console.log(`[Proxy] Token refreshed for ${pathname}`);
        const setCookie = res.headers.get('set-cookie');
        const nextResponse = NextResponse.next();
        if (setCookie) {
          nextResponse.headers.set('set-cookie', setCookie);
        }
        return nextResponse;
      } else {
        const errorText = await res.text();
        console.warn(`[Proxy] Refresh failed (${res.status}) at ${pathname}:`, errorText);
        
        const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
        if (isProtected) {
          const redirectResponse = NextResponse.redirect(new URL('/signin', request.url));
          redirectResponse.cookies.delete('accessToken');
          redirectResponse.cookies.delete('refreshToken');
          return redirectResponse;
        }
      }
    } catch (error) {
       console.error("[Proxy] Refresh server error:", error);
    }
  }

  const isAuthenticated = !!accessToken || !!refreshToken;
  const roleData = accessToken ? decodeToken(accessToken) : null;
  const role = roleData?.role || roleData?.Role;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    if (!isAuthenticated) return NextResponse.redirect(new URL('/signin', request.url));
    if (role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const isAuthPage = ['/signin', '/signup', '/verify-account'].some((route) => pathname.startsWith(route));
  if (isAuthPage && isAuthenticated && !needsRefresh) {
    if (role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
