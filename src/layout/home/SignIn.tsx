import React from 'react';
import { PersonIcon } from '@/assets/SvgContainer';
import { signIn } from '@/auth';

const SignIn = () => {
    const handleSignIn = async () => {
        'use server';
        await signIn('keycloak', { redirectTo: '/admin' });
    };

    return (
        <form action={handleSignIn} className="flex items-center gap-2">
            <button type="submit">
                <PersonIcon className="h-6 w-6 cursor-pointer text-slate-500 transition-colors duration-300 hover:text-slate-700" />
            </button>
        </form>
    );
};

export default SignIn;
