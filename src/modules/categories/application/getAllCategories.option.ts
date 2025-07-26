import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { CategoryInterface } from '@/modules/categories/domain';
import { getBaseUrl } from '@/shared/utils/get-base-url';

export const getAllCategoriesOptions = queryOptions<CategoryInterface[]>({
    queryKey: ['categories'],
    queryFn: async () => {
        const baseUrl = getBaseUrl();
        const { data } = await axios.get(`${baseUrl}/api/categories`);
        return data;
    },
});
