import { CategoryRepository } from '@/modules/categories/domain';

export const deleteCategoryUseCase = async (
    categoryRepository: CategoryRepository,
    id: string,
    token: string
) => {
    return await categoryRepository.delete(id, token);
};
