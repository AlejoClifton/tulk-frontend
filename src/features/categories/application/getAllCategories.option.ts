import { queryOptions } from '@tanstack/react-query';
import { getAllCategories } from '@/features/categories/infrastructure/category-api';

export const getAllCategoriesOptions = queryOptions({
    queryKey: ['categories'],
    queryFn: async () => {
        const res = await getAllCategories();
        return res.data;
    },
});
