// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
    dsn: 'https://ed5c870c641949aba1398ff6adca18c2@glitchtip.alejoclifton.com/3',

    tracesSampleRate: 1,

    enableLogs: true,

    debug: false,
});
