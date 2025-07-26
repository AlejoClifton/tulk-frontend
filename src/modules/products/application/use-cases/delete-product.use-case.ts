import { ProductRepository } from '@/modules/products/domain';

export const deleteProductUseCase = async (productRepository: ProductRepository, id: string) => {
    return await productRepository.delete(id);
}; 