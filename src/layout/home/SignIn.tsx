'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { PersonIcon } from '@/assets/SvgContainer';

const SignIn = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/api/auth/signin?callbackUrl=/admin');
    };

    return (
        <button 
            onClick={handleSignIn}
            className="flex items-center gap-2"
        >
            <PersonIcon className="h-6 w-6 cursor-pointer text-slate-500 transition-colors duration-300 hover:text-slate-700" />
        </button>
    );
};

export default SignIn;
