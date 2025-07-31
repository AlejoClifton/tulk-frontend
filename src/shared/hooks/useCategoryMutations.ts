import { useSession } from 'next-auth/react';

import {
    createCategoryUseCase,
    deleteCategoryUseCase,
    updateCategoryUseCase,
} from '@/modules/categories/application/use-cases';
import { CategoryInterface, CreateCategoryInterface } from '@/modules/categories/domain';
import { CategoryApi } from '@/modules/categories/infrastructure/category.api';
import { useBaseMutation } from '@/shared/hooks/useBaseMutation';

export const useCategoryMutations = () => {
    const { data: session } = useSession();
    const categoryRepository = new CategoryApi();

    const createCategory = useBaseMutation({
        mutationFn: (category: CreateCategoryInterface) =>
            createCategoryUseCase(categoryRepository, category, session?.user.accessToken || ''),
        queryKey: ['categories'],
        successMessage: 'Categoría creada con éxito',
        errorMessage: 'Error al crear la categoría',
    });

    const updateCategory = useBaseMutation({
        mutationFn: (category: CategoryInterface) =>
            updateCategoryUseCase(categoryRepository, category, session?.user.accessToken || ''),
        queryKey: ['categories'],
        successMessage: 'Categoría actualizada con éxito',
        errorMessage: 'Error al actualizar la categoría',
    });

    const deleteCategory = useBaseMutation({
        mutationFn: (id: string) => deleteCategoryUseCase(categoryRepository, id, session?.user.accessToken || ''),
        queryKey: ['categories'],
        successMessage: 'Categoría eliminada con éxito',
        errorMessage: 'Error al eliminar la categoría',
    });

    return {
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading: createCategory.isPending || updateCategory.isPending || deleteCategory.isPending,
    };
};
