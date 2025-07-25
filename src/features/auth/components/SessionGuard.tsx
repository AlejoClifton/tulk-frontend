'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export const SessionGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.error === 'RefreshAccessTokenError') {
            signOut({ redirect: true, redirectTo: '/' 	});
        }
    }, [session]);

    return <>{children}</>;
};
