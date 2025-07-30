import { Brand } from './brand.entity';
export interface BrandRepository {
    getBrand(): Promise<Brand | null>;
    updateBrand(brand: Brand, token: string): Promise<Brand>;
}
