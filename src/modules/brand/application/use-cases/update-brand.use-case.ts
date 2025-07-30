import { BrandUpdatePayload, BrandRepository } from '@/modules/brand/domain/brand.repository';

export const updateBrandUseCase = async (brandRepository: BrandRepository, brand: BrandUpdatePayload) => {
    return await brandRepository.updateBrand(brand);
};
