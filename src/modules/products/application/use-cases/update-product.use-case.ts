import { ProductInterface, ProductRepository } from '@/modules/products/domain';

export const updateProductUseCase = async (
    productRepository: ProductRepository,
    product: ProductInterface,
    token: string,
) => {
    return await productRepository.update(product, token);
};
