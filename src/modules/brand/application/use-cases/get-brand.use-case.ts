import { BrandRepository } from '@/modules/brand/domain/brand.repository';

export class GetBrandUseCase {
    constructor(private readonly brandRepository: BrandRepository) {}

    async execute() {
        return this.brandRepository.getBrand();
    }
}
