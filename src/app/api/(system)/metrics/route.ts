import client from 'prom-client';

declare global {
    var __metrics_initialized: boolean | undefined;
}

const register = client.register;

if (!globalThis.__metrics_initialized) {
    client.collectDefaultMetrics();
    globalThis.__metrics_initialized = true;
}

export async function GET() {
    const metrics = await register.metrics();

    return new Response(metrics, {
        status: 200,
        headers: {
            'Content-Type': register.contentType,
        },
    });
}
