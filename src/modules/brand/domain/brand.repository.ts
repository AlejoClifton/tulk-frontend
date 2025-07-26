import { Brand } from './brand.entity';

export type BrandUpdatePayload = Brand | FormData;

export interface BrandRepository {
    getBrand(): Promise<Brand | null>;
    updateBrand(brand: BrandUpdatePayload): Promise<Brand>;
}
