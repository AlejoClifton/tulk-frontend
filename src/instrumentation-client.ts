import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://ed5c870c641949aba1398ff6adca18c2@glitchtip.alejoclifton.com/3',

    tracesSampleRate: 1,

    enableLogs: true,

    debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
