import { ProductRepository, ProductUpdatePayload } from '@/modules/products/domain';

export const updateProductUseCase = async (productRepository: ProductRepository, product: ProductUpdatePayload) => {
    return await productRepository.update(product);
}; 