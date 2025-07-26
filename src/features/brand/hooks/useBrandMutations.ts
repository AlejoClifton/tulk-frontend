import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UpdateBrandUseCase } from '@/modules/brand/application/use-cases';
import { BrandApi } from '@/modules/brand/infrastructure/brand-api';
import { useSession } from 'next-auth/react';

export function useBrandMutations() {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    const brandRepository = new BrandApi(token || '');
    const updateBrandUseCase = new UpdateBrandUseCase(brandRepository);

    const updateBrand = useMutation({
        mutationFn: (data: FormData) => updateBrandUseCase.execute(brandRepository, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['brand'] });
            toast.success('Marca actualizada correctamente');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Error al actualizar la marca');
        },
    });

    return {
        updateBrand,
        isLoading: updateBrand.isPending,
    };
}
