import { CategoryInterface, CategoryRepository } from '@/modules/categories/domain';

export const updateCategoryUseCase = async (categoryRepository: CategoryRepository, category: CategoryInterface) => {
    return await categoryRepository.update(category);
};
