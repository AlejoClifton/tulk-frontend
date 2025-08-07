'use client';

import { PersonIcon } from '@/assets/SvgContainer';
import { Button } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

export default function Logout() {
    const { signOut } = useAuth();

    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        trackUmamiEvent(ANALYTICS_EVENTS.LOGOUT);

        await signOut();
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
