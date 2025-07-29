import { queryOptions } from '@tanstack/react-query';

import { BrandInterface } from '@/modules/brand/domain/brand.entity';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';

import { GetBrandUseCase } from './use-cases/get-brand.use-case';

export const getBrandOptions = queryOptions<BrandInterface | null>({
    queryKey: ['brand'],
    queryFn: async () => {
        const brandRepository = new BrandApi('');
        const brand = await new GetBrandUseCase(brandRepository).execute();
        return brand;
    },
});
