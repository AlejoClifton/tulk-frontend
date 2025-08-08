import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = await params;

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/products/[id]',
                method: 'GET',
            },
        });
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    const { id } = await params;

    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const {
            name,
            description,
            categoryId,
            mainImageUrl,
            imagesUrl,
            isActive,
            benefits,
            technicalSpecification,
            faq,
            manualUrl,
        } = await request.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                categoryId,
                mainImageUrl,
                imagesUrl,
                isActive,
                benefits,
                technicalSpecification,
                faq,
                manualUrl,
            },
        });
        return NextResponse.json(product);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/products',
                method: 'PUT',
            },
        });
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { id } = await params;

    const auth = await requireAuth(request);
    if (auth.response) return auth.response;

    try {
        const product = await prisma.product.delete({
            where: { id },
        });
        return NextResponse.json(product);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/products',
                method: 'DELETE',
            },
        });
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
    }
}
