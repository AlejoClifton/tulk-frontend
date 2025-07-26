import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { getAllProductsUseCase } from '@/modules/products/application/use-cases/get-all-products.use-case';
import { ProductAdapter } from '@/modules/products/infrastructure/product.adapter';

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

        const productRepository = new ProductAdapter(token);
        const products = await getAllProductsUseCase(productRepository);

        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching products', error },
            { status: 500 }
        );
    }
} 