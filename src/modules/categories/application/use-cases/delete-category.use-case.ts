import { CategoryRepository } from '@/modules/categories/domain';

export const deleteCategoryUseCase = (categoryRepository: CategoryRepository) => {
    return async (id: string) => {
        return await categoryRepository.delete(id);
    };
};
