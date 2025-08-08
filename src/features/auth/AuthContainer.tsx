'use client';

import Header from '@/components/layout/Header';

import { LoginForm } from './LoginForm';

export function AuthContainer() {
    return (
        <>
            <Header />
            <div className="absolute inset-0 flex items-center justify-center">
                <LoginForm />
            </div>
        </>
    );
}
