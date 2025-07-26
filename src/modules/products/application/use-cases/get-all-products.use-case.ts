import { ProductRepository } from '@/modules/products/domain';

export const getAllProductsUseCase = async (
    productRepository: ProductRepository
) => {
    return await productRepository.getAll();
}; 