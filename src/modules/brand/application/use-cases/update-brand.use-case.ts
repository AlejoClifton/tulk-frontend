import { Brand } from '@/modules/brand/domain/brand.entity';
import { BrandRepository } from '@/modules/brand/domain/brand.repository';

export const updateBrandUseCase = async (brandRepository: BrandRepository, brand: Brand, token: string) => {
    return await brandRepository.updateBrand(brand, token);
};
