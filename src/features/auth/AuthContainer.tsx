'use client';

import { LoginForm } from './LoginForm';

export function AuthContainer() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    );
}
