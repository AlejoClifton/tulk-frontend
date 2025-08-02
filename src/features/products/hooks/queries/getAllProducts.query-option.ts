import { queryOptions } from '@tanstack/react-query';

import type { ProductInterface } from '@/features/products/interfaces/product.interface';
import { getAllProducts } from '@/features/products/services/product.service';

export const getAllProductsQueryOptions = queryOptions<ProductInterface[]>({
    queryKey: ['products'],
    queryFn: async () => {
        const products = await getAllProducts();
        return products;
    },
});
