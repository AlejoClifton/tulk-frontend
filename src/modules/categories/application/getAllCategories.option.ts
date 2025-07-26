import { queryOptions } from '@tanstack/react-query';
import { auth } from '@/auth';

import { getAllCategoriesUseCase } from '@/modules/categories/application/use-cases/getAllCategories.use-case';
import { CategoryApiAdapter } from '../infrastructure/category.adapter';

export const getAllCategoriesOptions = queryOptions({
    queryKey: ['categories'],
    queryFn: async () => {
        try {
            const session = await auth();
            const token = session?.user?.accessToken ?? '';
            const categoryRepository = new CategoryApiAdapter(token);

            return await getAllCategoriesUseCase(categoryRepository);
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },
});
