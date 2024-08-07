import {NextRequest, NextResponse} from 'next/server';
import {COOKIES} from "@/types/generalTypes.ts";


export function middleware(request: NextRequest) {
    const token: string | undefined = request.cookies.get(COOKIES.TOKEN)?.value;

    if (request.nextUrl.pathname === '/board') {
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    if (request.nextUrl.pathname === '/login') {
        if (token) {
            const url = request.nextUrl.clone();
            url.pathname = '/board';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Specify the paths where the middleware should apply
export const config = {
    matcher: ['/board', '/login'],
};
