import { CategoryInterface, CategoryRepository } from '@/modules/categories/domain';

export const createCategoryUseCase = async (
    categoryRepository: CategoryRepository,
    category: CategoryInterface
) => {
    return await categoryRepository.create(category);
};
