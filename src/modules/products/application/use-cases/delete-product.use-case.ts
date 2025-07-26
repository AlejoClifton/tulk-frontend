import { ProductRepository } from '@/modules/products/domain';

export const deleteProductUseCase = (productRepository: ProductRepository) => {
    return async (id: string) => {
        return await productRepository.delete(id);
    };
}; 