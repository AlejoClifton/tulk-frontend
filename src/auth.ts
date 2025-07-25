import NextAuth, { NextAuthConfig } from 'next-auth';
import Keycloak from 'next-auth/providers/keycloak';

async function refreshAccessToken(token) {
    try {
        const url = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.AUTH_KEYCLOAK_ID!,
                client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken!,
            }),
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
        };
    } catch (error) {
        console.log('error', error);

        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

export const config = {
    providers: [Keycloak],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : undefined;
                return token;
            }

            if (Date.now() < (token.accessTokenExpires as number)) {
                return token;
            }

            return refreshAccessToken(token);
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken as string;
            session.error = token.error as string;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(config);
