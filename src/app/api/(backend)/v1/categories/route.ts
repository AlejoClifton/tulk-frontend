import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        return NextResponse.json({ message: 'Hello, world!' });

        const { name, isActive } = await request.json();
        const category = await prisma.category.create({
            data: { name, isActive },
        });
        return NextResponse.json(category);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
    }
}
