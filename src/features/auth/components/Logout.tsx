'use client';

import { signOut } from 'next-auth/react';

import { PersonIcon } from '@/assets/SvgContainer';
import { Button } from '@/shared/components/ui/Button';

export default function Logout() {
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await signOut({ redirectTo: '/', redirect: true });
    };

    return (
        <form onSubmit={handleLogout}>
            <Button type="submit" className="flex w-full items-center justify-center gap-2" size="md">
                <PersonIcon className="h-6 w-6 cursor-pointer text-white transition-colors duration-300 hover:text-slate-700" />
                Cerrar sesión
            </Button>
        </form>
    );
}
