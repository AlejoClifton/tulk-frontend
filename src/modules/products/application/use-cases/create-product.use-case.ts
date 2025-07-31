import { ProductRepository, ProductInterface } from '@/modules/products/domain';

export const createProductUseCase = async (
    productRepository: ProductRepository,
    product: ProductInterface,
    token: string
) => {
    return await productRepository.create(product, token);
};
