import { useSession } from 'next-auth/react';

import { BrandingInterface } from '@/features/branding/interfaces/branding.interface';
import { updateBranding } from '@/features/branding/services/branding.service';
import { useBaseMutation } from '@/hooks/useBaseMutation';

export function useBrandMutations() {
    const { data: session } = useSession();

    const updateBrand = useBaseMutation({
        mutationFn: (data: BrandingInterface) => {
            return updateBranding(data, session?.user.accessToken || '');
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
