import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
    if (!req.auth) {
        const newUrl = new URL('/', req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/admin/:path*'],
};