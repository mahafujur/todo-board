import {NextRequest, NextResponse} from 'next/server';
import {COOKIES} from "@/utils/constants.ts";
import { jwtDecode } from "jwt-decode";


export function middleware(request: NextRequest) {
    const token: boolean = request.cookies.has(COOKIES.TOKEN); // Check if the token exists in cookies
    const isWorkspaceRoute = request.nextUrl.pathname.startsWith('/workspace'); // Check if the route starts with '/workspace'
    if (isWorkspaceRoute) {
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    if (request.nextUrl.pathname === '/login') {
        if (token) {
            const url = request.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
    matcher: ['/workspace/:path*', '/login'],
};
