'use server';

import { cookies } from 'next/headers';

import { ICookies } from '@/shared/cookies/cookies.entity';

export async function setSession(data: ICookies) {
    const cookie = await cookies();

    const cookieSettings = {
        domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost',
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        path: '/',
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
    };

    Object.keys(data).forEach((key) => {
        const value = data[key as keyof ICookies];
        cookie.set(key, value.toString(), cookieSettings);
    });
}

export async function getSession(): Promise<Partial<ICookies>> {
    const cookie = await cookies();
    const sessionData: Partial<ICookies> = {};

    cookie.getAll().forEach(({ name, value }) => {
        sessionData[name as keyof ICookies] = value;
    });

    return sessionData;
}

export async function deleteSession() {
    const cookie = await cookies();

    const cookieSettings = {
        domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost',
        path: '/',
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
    };

    cookie.getAll().forEach(({ name }) => {
        cookie.set(name, '', {
            ...cookieSettings,
            expires: new Date(0),
        });
    });
}
