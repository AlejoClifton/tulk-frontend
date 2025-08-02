import { auth, signOut } from '@/auth';
import { BaseAxiosAdapter } from '@/lib/adapters/BaseAxiosAdapter';
import { nextjsClient } from '@/lib/clients/next-js.client';

export class NextjsAdapter extends BaseAxiosAdapter {
    constructor() {
        super(nextjsClient, {
            refreshAuth: async () => {
                await auth();
            },
            signOut: () => {
                signOut();
            },
        });
    }
}
