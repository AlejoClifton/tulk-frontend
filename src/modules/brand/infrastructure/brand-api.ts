import { Brand, BrandInterface } from '@/modules/brand/domain/brand.entity';
import { BrandRepository, BrandUpdatePayload } from '@/modules/brand/domain/brand.repository';
import { BackendAdapter } from '@/shared/http/adapters/backend.adapter';

export class BrandApi implements BrandRepository {
    private readonly backendAdapter: BackendAdapter;
    private readonly token: string;
    private readonly url: string;

    constructor(token: string) {
        this.token = token;
        this.backendAdapter = new BackendAdapter();
        this.url = '/brands';
    }

    async getBrand(): Promise<Brand | null> {
        try {
            const brand = await this.backendAdapter.get<BrandInterface>(this.url);
            return brand as Brand;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateBrand(brand: BrandUpdatePayload): Promise<Brand> {
        try {
            const updatedBrand = await this.backendAdapter.putWithData<BrandInterface>(this.url, brand, this.token);
            return updatedBrand as Brand;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating brand');
        }
    }
}
