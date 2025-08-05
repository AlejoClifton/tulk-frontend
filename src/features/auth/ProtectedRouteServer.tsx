import React from 'react';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/supabase-server';

export async function ProtectedRouteServer({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        redirect('/login');
    }

    return <>{children}</>;
}

export default ProtectedRouteServer;
