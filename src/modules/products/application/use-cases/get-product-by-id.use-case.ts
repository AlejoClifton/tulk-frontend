import { ProductRepository } from '@/modules/products/domain';

export const getProductByIdUseCase = async (productRepository: ProductRepository, id: string) => {
    return await productRepository.getById(id);
};
