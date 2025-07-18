import { ProductInterface } from '@/features/products/domain/product.entity';
import { updateProduct as updateProductApi } from '@/features/products/infrastructure/product-api';

export const updateProductCommand = async (product: ProductInterface) => {
    const res = await updateProductApi(product);

    return res;
};