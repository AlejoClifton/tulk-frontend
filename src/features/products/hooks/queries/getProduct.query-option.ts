import { queryOptions } from '@tanstack/react-query';

import type { ProductInterface } from '@/features/products/interfaces/product.interface';
import { getProductById } from '@/features/products/services/product.service';

export const getProductQueryOptions = (id: string) =>
    queryOptions<ProductInterface>({
        queryKey: ['products', id],
        queryFn: async () => getProductById(id),
    });
