import { ProductInterface } from '@/modules/products/domain/product.entity';
import { updateProduct as updateProductApi } from '@/modules/products/infrastructure/product-api';

export const updateProductCommand = async (product: ProductInterface) => {
    const res = await updateProductApi(product);

    return res;
};