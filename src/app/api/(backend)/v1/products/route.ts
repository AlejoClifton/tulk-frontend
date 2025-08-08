import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const products = await prisma.product.findMany();

        return NextResponse.json(products);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/products',
                method: 'GET',
            },
        });

        return NextResponse.json(
            {
                error: 'Error fetching products',
                details: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
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
            manualUrl,
            benefits,
            technicalSpecification,
            faq,
        } = await request.json();

        const product = await prisma.product.create({
            data: {
                name,
                description,
                categoryId,
                mainImageUrl,
                imagesUrl,
                manualUrl,
                isActive,
                benefits,
                technicalSpecification,
                faq,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        Sentry.captureException(error, {
            tags: {
                route: '/api/products',
                method: 'POST',
            },
        });
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
    }
}
