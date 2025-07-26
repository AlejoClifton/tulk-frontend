import { ProductRepository } from '@/modules/products/domain';

export const getAllProductsUseCase = (productRepository: ProductRepository) => {
    return async () => {
        return await productRepository.getAll();
    };
}; 