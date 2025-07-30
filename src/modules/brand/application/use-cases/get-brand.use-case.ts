import { BrandRepository } from '@/modules/brand/domain/brand.repository';

export const getBrandUseCase = async (brandRepository: BrandRepository) => {
    return await brandRepository.getBrand();
};
