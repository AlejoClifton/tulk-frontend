import { queryOptions } from '@tanstack/react-query';

import { getBrandUseCase } from '@/modules/brand/application/use-cases';
import { BrandInterface } from '@/modules/brand/domain/brand.entity';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';

export const getBrandQueryOptions = queryOptions<BrandInterface | null>({
    queryKey: ['brand'],
    queryFn: async () => {
        const brandRepository = new BrandApi();
        const brand = await getBrandUseCase(brandRepository);
        return brand;
    },
});
