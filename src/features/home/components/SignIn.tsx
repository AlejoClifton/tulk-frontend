'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { PersonIcon } from '@/assets/SvgContainer';
import { useAuth } from '@/hooks/useAuth';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

const SignIn = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleSignIn = () => {
        trackUmamiEvent(ANALYTICS_EVENTS.SIGN_IN);

        if (!user) {
            router.push('/login');
        }
        router.push('/admin');
    };

    return (
        <button onClick={handleSignIn} className="flex items-center gap-2">
            <PersonIcon className="h-6 w-6 cursor-pointer text-slate-500 transition-colors duration-300 hover:text-slate-700" />
        </button>
    );
};

export default SignIn;
