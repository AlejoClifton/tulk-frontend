import { queryOptions } from '@tanstack/react-query';

import type { CategoryInterface } from '@/features/categories/interfaces/category.interface';
import { getAllCategories } from '@/features/categories/services/categories.service';

export const getAllCategoriesQueryOptions = queryOptions<CategoryInterface[]>({
    queryKey: ['categories'],
    queryFn: async () => {
        const categories = await getAllCategories();
        return categories;
    },
});
