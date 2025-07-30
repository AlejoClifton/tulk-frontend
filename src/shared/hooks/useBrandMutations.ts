import { useSession } from 'next-auth/react';

import { updateBrandUseCase } from '@/modules/brand/application/use-cases';
import { Brand } from '@/modules/brand/domain/brand.entity';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export function useBrandMutations() {
    const { data: session } = useSession();

    const updateBrand = useBaseMutation({
        mutationFn: (data: Brand) => {
            const brandRepository = new BrandApi();
            return updateBrandUseCase(brandRepository, data, session?.user.accessToken || '');
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
