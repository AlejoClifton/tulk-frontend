import { queryOptions } from '@tanstack/react-query';

import { getProductByIdUseCase } from '@/modules/products/application/use-cases/get-product-by-id.use-case';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { ProductApi } from '@/modules/products/infrastructure/product.api';

export const getProductQueryOptions = (id: string) =>
    queryOptions<ProductInterface>({
        queryKey: ['products', id],
        queryFn: async () => {
            const productRepository = new ProductApi();
            const product = await getProductByIdUseCase(productRepository, id);
            return product;
        },
    });
