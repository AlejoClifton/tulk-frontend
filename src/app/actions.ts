'use server';

import { signIn } from '@/auth';

export async function doCredentialsLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
        await signIn('keycloak', {
            callbackUrl: '/admin',
        });
    }
}
