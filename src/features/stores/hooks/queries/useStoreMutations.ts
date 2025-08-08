import type { CreateStoreDTO, UpdateStoreDTO } from '@/features/stores/interfaces/store.interface';
import { createStore, deleteStore, updateStore } from '@/features/stores/services/stores.service';
import { useAuth } from '@/hooks/useAuth';
import { useBaseMutation } from '@/hooks/useBaseMutation';

export const useStoreMutations = (onSuccess?: () => void) => {
    const { session } = useAuth();
    const token = session?.access_token || '';

    const createStoreMutation = useBaseMutation({
        mutationFn: async (store: CreateStoreDTO) => {
            return createStore(store, token);
        },
        queryKey: ['stores'],
        successMessage: 'Sucursal creada correctamente',
        errorMessage: 'Error al crear la sucursal',
        onSuccess,
    });

    const updateStoreMutation = useBaseMutation({
        mutationFn: async (store: UpdateStoreDTO) => {
            return updateStore(store.id, store, token);
        },
        queryKey: ['stores'],
        successMessage: 'Sucursal actualizada correctamente',
        errorMessage: 'Error al actualizar la sucursal',
        onSuccess,
    });

    const deleteStoreMutation = useBaseMutation({
        mutationFn: async (id: string) => {
            return deleteStore(id);
        },
        queryKey: ['stores'],
        successMessage: 'Sucursal eliminada correctamente',
        errorMessage: 'Error al eliminar la sucursal',
        onSuccess,
    });

    return {
        createStoreMutation,
        updateStoreMutation,
        deleteStoreMutation,
        isLoading: createStoreMutation.isPending || updateStoreMutation.isPending || deleteStoreMutation.isPending,
    };
};
