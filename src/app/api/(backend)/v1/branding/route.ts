import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const branding = await prisma.branding.findFirst();
        return NextResponse.json(branding);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/branding',
                method: 'GET',
            },
        });
        return NextResponse.json({ error: 'Error fetching branding' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const { name, description, image, email, phone, address, addressLink, hours } = await request.json();
        const branding = await prisma.branding.upsert({
            where: { id: '6cb2f66e-9bc4-4817-a3c3-a1c132c10e7e' },
            update: { name, description, image, email, phone, address, addressLink, hours },
            create: {
                id: '6cb2f66e-9bc4-4817-a3c3-a1c132c10e7e',
                name,
                description,
                image,
                email,
                phone,
                address,
                addressLink,
                hours,
            },
        });
        return NextResponse.json(branding);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/branding',
                method: 'PUT',
            },
        });
        return NextResponse.json({ error: 'Error creating branding' }, { status: 500 });
    }
}
