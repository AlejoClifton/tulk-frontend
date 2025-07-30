'use client';

import { FormCategory } from '@/features/categories/components/FormCategory';
import { useCategoryMutations } from '@/features/categories/hooks/useCategoryMutations';
import { CategoryInterface } from '@/modules/categories/domain';
import { Modal } from '@/shared/components';

interface ModalCategoryProps {
    category: CategoryInterface;
    onClose: () => void;
}

export const ModalCategory = ({ category, onClose }: ModalCategoryProps) => {
    const { createCategory, updateCategory, isLoading } = useCategoryMutations();

    const handleSubmit = async (values: Partial<CategoryInterface>) => {
        const promise = category.id
            ? updateCategory.mutateAsync({
                  ...values,
                  id: category.id,
                  name: values.name || '',
                  isActive: values.isActive || false,
              })
            : createCategory.mutateAsync({
                  ...values,
                  id: '',
                  name: values.name || '',
                  isActive: values.isActive || false,
              });

        promise.then(onClose);
    };

    return (
        <Modal onClose={onClose} title={category.id ? 'Editar Categoría' : 'Crear Categoría'}>
            <FormCategory category={category} onSubmit={handleSubmit} isLoading={isLoading} />
        </Modal>
    );
};
