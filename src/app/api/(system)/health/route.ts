import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ status: 'ok' });
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/health',
            },
        });
        return NextResponse.json({ error: 'Error fetching health check' }, { status: 500 });
    }
}
