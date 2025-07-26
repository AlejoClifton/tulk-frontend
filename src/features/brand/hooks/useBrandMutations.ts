import { useSession } from 'next-auth/react';

import { UpdateBrandUseCase } from '@/modules/brand/application/use-cases';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export function useBrandMutations() {
    const { data: session } = useSession();
    const token = session?.user?.accessToken;

    const updateBrand = useBaseMutation({
        mutationFn: (data: FormData) => {
            const brandRepository = new BrandApi(token || '');
            const updateBrandUseCase = new UpdateBrandUseCase(brandRepository);
            return updateBrandUseCase.execute(brandRepository, data);
        },
        queryKey: ['brand'],
        successMessage: 'Marca actualizada correctamente',
        errorMessage: 'Error al actualizar la marca',
    });

    return {
        updateBrand,
        isLoading: updateBrand.isPending,
    };
}
