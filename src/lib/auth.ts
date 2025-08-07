import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function requireAuth(request: NextRequest) {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: () => {},
            },
        },
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            user: null,
            response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
        };
    }

    return { user, response: null };
}
