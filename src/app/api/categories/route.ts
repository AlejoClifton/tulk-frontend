import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getAllCategoriesUseCase } from '@/modules/categories/application/use-cases/getAllCategories.use-case';
import { CategoryApiAdapter } from '@/modules/categories/infrastructure/category.adapter';

export async function GET() {
    try {
        const session = await auth();
        const token = session?.user?.accessToken;

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const categoryRepository = new CategoryApiAdapter(token);
        const categories = await getAllCategoriesUseCase(categoryRepository);

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching categories', error },
            { status: 500 }
        );
    }
} 