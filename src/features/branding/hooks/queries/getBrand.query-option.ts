import { queryOptions } from '@tanstack/react-query';

import type { BrandingInterface } from '@/features/branding/interfaces/branding.interface';
import { getBranding } from '@/features/branding/services/branding.service';

export const getBrandingQueryOptions = queryOptions<BrandingInterface | null>({
    queryKey: ['branding'],
    queryFn: async () => {
        const branding = await getBranding();
        return branding;
    },
});
