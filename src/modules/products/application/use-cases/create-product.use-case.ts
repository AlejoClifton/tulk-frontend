import { ProductRepository, ProductInterface } from '@/modules/products/domain';

export const createProductUseCase = (productRepository: ProductRepository) => {
    return async (product: ProductInterface | FormData) => {
        return await productRepository.create(product);
    };
};
