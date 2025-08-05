import { BaseAxiosAdapter } from '@/lib/adapters/BaseAxiosAdapter';
import { nextjsClient } from '@/lib/clients/next-js.client';
import { createClient } from '@/lib/supabase/supabase-client';

export class NextjsAdapter extends BaseAxiosAdapter {
    constructor() {
        super(nextjsClient, {
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
}
