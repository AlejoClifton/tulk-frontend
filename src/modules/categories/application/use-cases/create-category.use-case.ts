import { CreateCategoryInterface, CategoryRepository } from '@/modules/categories/domain';

export const createCategoryUseCase = async (
    categoryRepository: CategoryRepository,
    category: CreateCategoryInterface,
    token: string
) => {
    return await categoryRepository.create(category, token);
};
