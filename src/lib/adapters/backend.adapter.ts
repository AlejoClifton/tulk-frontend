import { backendApi } from '@/lib/clients/backend.client';
import { createClient } from '@/lib/supabase/supabase-client';

import { BaseAxiosAdapter } from './BaseAxiosAdapter';

export class BackendAdapter extends BaseAxiosAdapter {
    constructor() {
        super(backendApi, {
            refreshAuth: async () => {
                const supabase = createClient();
                const {
                    data: { session },
                } = await supabase.auth.getSession();
                if (!session) {
                    throw new Error('No session available');
                }
            },
            signOut: async () => {
                const supabase = createClient();
                await supabase.auth.signOut();
            },
        });
    }

    async getAccessToken(): Promise<string | null> {
        const supabase = createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session?.access_token || null;
    }
}
