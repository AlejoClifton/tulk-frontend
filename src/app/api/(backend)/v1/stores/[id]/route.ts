import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const store = await prisma.store.findUnique({
            where: {
                id,
            },
        });

        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        return NextResponse.json(store);
    } catch (error) {
        console.error('Error fetching store:', error);
        return NextResponse.json({ error: 'Error fetching store' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const { id } = await params;
        const body = await request.json();
        const { name, address, latitude, longitude, phone, mapUrl, isActive } = body;

        const store = await prisma.store.update({
            where: {
                id,
            },
            data: {
                name,
                address,
                latitude,
                longitude,
                phone,
                mapUrl,
                isActive,
            },
        });

        return NextResponse.json(store);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error updating store' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const { id } = await params;
        await prisma.store.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ message: 'Store deleted successfully' });
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error deleting store' }, { status: 500 });
    }
}
