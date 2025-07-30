import { queryOptions } from '@tanstack/react-query';

import { getAllProductsUseCase } from '@/modules/products/application/use-cases/get-all-products.use-case';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { ProductApi } from '@/modules/products/infrastructure/product.api';

export const getAllProductsQueryOptions = queryOptions<ProductInterface[]>({
    queryKey: ['products'],
    queryFn: async () => {
        const productRepository = new ProductApi();
        const product = await getAllProductsUseCase(productRepository);
        return product;
    },
});
