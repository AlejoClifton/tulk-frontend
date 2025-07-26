import { ProductRepository, ProductInterface } from '@/modules/products/domain';

export const createProductUseCase = async (productRepository: ProductRepository, product: ProductInterface | FormData) => {
    return await productRepository.create(product);
};
