import { queryOptions } from '@tanstack/react-query';
import { getAllProducts } from '@/features/products/infrastructure/product-api';

export const getAllProductsOptions = queryOptions({
    queryKey: ['products'],
    queryFn: async () => {
        const res = await getAllProducts();
        return res.data;
    },
});
