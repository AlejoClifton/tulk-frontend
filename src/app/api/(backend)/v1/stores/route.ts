import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const stores = await prisma.store.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        return NextResponse.json({ error: 'Error fetching stores' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const body = await request.json();
        const { name, address, latitude, longitude, phone, mapUrl } = body;

        const store = await prisma.store.create({
            data: {
                name,
                address,
                latitude,
                longitude,
                phone,
                mapUrl,
            },
        });

        return NextResponse.json(store);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error creating store' }, { status: 500 });
    }
}
