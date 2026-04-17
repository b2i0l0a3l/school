import { NextRequest, NextResponse } from "next/server";

function isTokenExpired(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload.exp ? payload.exp < Date.now() / 1000 : false;
    } catch (e) {
        return true;
    }
}

export default function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    
    const isAuthPage = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";

    if (!token || !refreshToken) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }
    
    if (isTokenExpired(token)) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
    }
    
    if (isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    
    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}