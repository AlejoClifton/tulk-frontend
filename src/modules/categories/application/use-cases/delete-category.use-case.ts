import { CategoryRepository } from '@/modules/categories/domain';

export const deleteCategoryUseCase = async (
    categoryRepository: CategoryRepository,
    id: string
) => {
    return await categoryRepository.delete(id);
};
