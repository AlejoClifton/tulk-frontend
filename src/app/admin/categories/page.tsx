'use client';
import React, { useState } from 'react';

import { PlusIcon } from '@/assets/SvgContainer';
import { CategoryTable } from '@/features/admin/categories/components/CategoryTable';
import { ModalCategory } from '@/features/admin/categories/components/ModalCategory';
import { useCategoryMutations } from '@/shared/hooks/useCategoryMutations';
import { CategoryInterface } from '@/modules/categories/domain/category.entity';
import { Button, Subtitle } from '@/shared/components/ui';

const categoryInitialState: CategoryInterface = {
    id: '',
    name: '',
    isActive: true,
};

const Categories = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [category, setCategory] = useState<CategoryInterface | null>(null);

    const { deleteCategory, isLoading } = useCategoryMutations();

    const handleOpenModal = (category: CategoryInterface) => {
        setIsOpenModal(true);
        setCategory(category);
    };

    const handleDelete = (id: string) => {
        deleteCategory.mutate(id);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setCategory(null);
    };

    return (
        <main className="ml-64 flex h-full min-h-screen flex-1 flex-col gap-8 bg-slate-100 p-8">
            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Categorías</Subtitle>
                    <Button
                        variant="success"
                        size="md"
                        onClick={() => handleOpenModal(categoryInitialState)}
                        className="flex items-center justify-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Agregar
                    </Button>
                </div>
                <CategoryTable
                    handleOpenModal={handleOpenModal}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                />
            </div>
            {isOpenModal && category && (
                <ModalCategory category={category} onClose={handleCloseModal} />
            )}
        </main>
    );
};

export default Categories;
