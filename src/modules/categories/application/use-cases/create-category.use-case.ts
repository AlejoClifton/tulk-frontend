import { CategoryInterface, CategoryRepository } from '@/modules/categories/domain';

export const createCategoryUseCase = (categoryRepository: CategoryRepository) => {
    return async (category: CategoryInterface) => {
        return await categoryRepository.create(category);
    };
};
