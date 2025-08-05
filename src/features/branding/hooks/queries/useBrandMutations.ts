
import { BrandingInterface } from '@/features/branding/interfaces/branding.interface';
import { updateBranding } from '@/features/branding/services/branding.service';
import { useAuth } from '@/hooks/useAuth';
import { useBaseMutation } from '@/hooks/useBaseMutation';

export function useBrandMutations() {
    const { session } = useAuth();

    const updateBrand = useBaseMutation({
        mutationFn: (data: BrandingInterface) => {
            return updateBranding(data, session?.access_token || '');
        },
        queryKey: ['branding'],
        successMessage: 'Marca actualizada correctamente',
        errorMessage: 'Error al actualizar la marca',
    });

    return {
        updateBrand,
        isLoading: updateBrand.isPending,
    };
}
