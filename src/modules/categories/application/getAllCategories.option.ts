import { queryOptions } from '@tanstack/react-query';

import { auth } from '@/auth';
import { GetAllCategoriesUseCase } from '@/modules/categories/application/use-cases/getAllCategories.use-case';
import { CategoryApiAdapter } from '@/modules/categories/infrastructure/category.adapter';

export const getAllCategoriesOptions = queryOptions({
    queryKey: ['categories'],
    queryFn: async () => {
        const session = await auth();

        const token = session?.user?.accessToken ?? '';

        const categoryRepository = new CategoryApiAdapter(token);
        const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);

        try {
            const categories = await getAllCategoriesUseCase.execute();
            return categories;
        } catch (error) {
            console.log('error', error);
            return [];
        }
    },
});
