'use client';

import { useEffect } from 'react';

import { useSession, signOut } from 'next-auth/react';

export const SessionGuard = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.error === 'RefreshAccessTokenError') {
            signOut({ redirect: true, redirectTo: '/' 	});
        }
    }, [session]);

    return <>{children}</>;
};
