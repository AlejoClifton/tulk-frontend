import { auth, signOut } from '@/auth';
import { backendApi } from '@/lib/clients/backend.client';

import { BaseAxiosAdapter } from './BaseAxiosAdapter';

export class BackendAdapter extends BaseAxiosAdapter {
    constructor() {
        super(backendApi, {
            refreshAuth: async () => {
                await auth();
            },
            signOut: () => {
                signOut();
            },
        });
    }
}
