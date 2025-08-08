import { queryOptions } from '@tanstack/react-query';

import type { StoreInterface } from '@/features/stores/interfaces/store.interface';
import { getStores } from '@/features/stores/services/stores.service';

export const getAllStoresQueryOptions = queryOptions<StoreInterface[]>({
    queryKey: ['stores'],
    queryFn: async () => {
        const stores = await getStores();
        return stores;
    },
});