import { CategoryInterface, CategoryRepository } from '@/modules/categories/domain';

export const updateCategoryUseCase = (categoryRepository: CategoryRepository) => {
    return async (id: string, category: CategoryInterface) => {
        return await categoryRepository.update(id, category);
    };
};
