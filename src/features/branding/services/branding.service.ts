import type { BrandingInterface } from '@/features/branding/interfaces/branding.interface';
import { BackendAdapter } from '@/lib/adapters/backend.adapter';

const backend = new BackendAdapter();
const BASE_URL = '/branding';

export const getBranding = async (): Promise<BrandingInterface | null> => {
    try {
        const brand = await backend.get<BrandingInterface>(BASE_URL);
        return brand;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateBranding = async (branding: BrandingInterface, token: string): Promise<BrandingInterface> => {
    try {
        const updated = await backend.putWithData<BrandingInterface>(BASE_URL, branding, token);
        return updated;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating brand');
    }
};
