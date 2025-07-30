import { updateBrandUseCase } from '@/modules/brand/application/use-cases';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export function useBrandMutations() {
    const updateBrand = useBaseMutation({
        mutationFn: (data: FormData) => {
            const brandRepository = new BrandApi();
            return updateBrandUseCase(brandRepository, data);
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
