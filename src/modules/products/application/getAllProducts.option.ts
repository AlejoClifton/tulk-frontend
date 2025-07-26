import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { ProductInterface } from '@/modules/products/domain/product.entity';
import { getBaseUrl } from '@/shared/utils/get-base-url';

export const getAllProductsOptions = queryOptions<ProductInterface[]>({
    queryKey: ['products'],
    queryFn: async () => {
        const baseUrl = getBaseUrl();
        const { data } = await axios.get(`${baseUrl}/api/products`);
        return data;
    },
});
