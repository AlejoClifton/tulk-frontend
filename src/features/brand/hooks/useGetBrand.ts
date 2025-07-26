import { useQuery } from '@tanstack/react-query';
import { GetBrandUseCase } from '@/modules/brand/application/use-cases';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { useSession } from 'next-auth/react';

export const useGetBrand = () => {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const brandRepository = new BrandApi(token || '');

    const getBrandUseCase = new GetBrandUseCase(brandRepository);

    const { data: brand, isLoading } = useQuery({
        queryKey: ['brand'],
        queryFn: () => getBrandUseCase.execute(),
    });

    return {
        brand,
        isLoading,
    };
}; 