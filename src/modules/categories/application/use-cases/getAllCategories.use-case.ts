import { CategoryRepository } from '@/modules/categories/domain';

export const getAllCategoriesUseCase = async (
    categoryRepository: CategoryRepository
) => {
    return await categoryRepository.getAll();
};
