import { queryOptions } from '@tanstack/react-query';

import { getProductByIdUseCase } from '@/modules/products/application/use-cases/get-product-by-id.use-case';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { ProductAdapter } from '@/modules/products/infrastructure/product.adapter';

export const getProductOptions = (id: string) =>
    queryOptions<ProductInterface>({
        queryKey: ['products', id],
        queryFn: async () => {
            const productRepository = new ProductAdapter();
            const product = await getProductByIdUseCase(productRepository, id);
            return product;
        },
    });
