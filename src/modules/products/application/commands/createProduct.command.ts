import { ProductInterface } from '@/modules/products/domain/product.entity';
import { createProduct as createProductApi } from '@/modules/products/infrastructure/product-api';

export const createProductCommand = async (product: ProductInterface) => {
    const res = await createProductApi(product);
    
    return res;
};
