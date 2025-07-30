import { queryOptions } from '@tanstack/react-query';

import { CategoryInterface } from '@/modules/categories/domain';
import { CategoryApi } from '@/modules/categories/infrastructure/category.api';

import { getAllCategoriesUseCase } from './use-cases/getAllCategories.use-case';

export const getAllCategoriesQueryOptions = queryOptions<CategoryInterface[]>({
    queryKey: ['categories'],
    queryFn: async () => {
        const categoryRepository = new CategoryApi();
        const data = await getAllCategoriesUseCase(categoryRepository);

        return data;
    },
});
