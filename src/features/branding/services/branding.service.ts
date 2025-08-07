import type { BrandingInterface } from '@/features/branding/interfaces/branding.interface';
import { NextjsAdapter } from '@/lib/adapters/next-js.adapter';

const backend = new NextjsAdapter();
const BASE_URL = '/branding';

export const getBranding = async (): Promise<BrandingInterface | null> => {
    return await backend.get<BrandingInterface>(BASE_URL);
};

export const updateBranding = async (branding: BrandingInterface, token: string): Promise<BrandingInterface> => {
    return await backend.putWithData<BrandingInterface>(BASE_URL, branding, token);
};
