import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET({ params }: Params) {
    const { id } = await params;

    try {
        const categories = await prisma.category.findUnique({
            where: { id },
        });
        return NextResponse.json(categories);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { id } = await params;

    try {
        const { name, isActive } = await request.json();
        const category = await prisma.category.update({
            where: { id },
            data: { name, isActive },
        });
        return NextResponse.json(category);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { id } = await params;

    try {
        const category = await prisma.category.delete({
            where: { id },
        });
        return NextResponse.json(category);
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
    }
}
