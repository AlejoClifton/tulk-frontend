import { ProductRepository, ProductUpdatePayload } from '@/modules/products/domain';

export const updateProductUseCase = (productRepository: ProductRepository) => {
    return async (id: string, product: ProductUpdatePayload) => {
        return await productRepository.update(id, product);
    };
}; 