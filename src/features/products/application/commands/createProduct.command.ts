import { ProductInterface } from '@/features/products/domain/product.entity';
import { createProduct as createProductApi } from '@/features/products/infrastructure/product-api';

export const createProductCommand = async (product: ProductInterface) => {
    const res = await createProductApi(product);
    
    return res;
};
