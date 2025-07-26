import { BrandUpdatePayload, BrandRepository } from '@/modules/brand/domain/brand.repository';

export class UpdateBrandUseCase {
    constructor(private readonly brandRepository: BrandRepository) {}

    async execute(brandRepository: BrandRepository, brand: BrandUpdatePayload) {
        return this.brandRepository.updateBrand(brand);
    }
}
