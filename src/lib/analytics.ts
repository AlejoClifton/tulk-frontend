declare global {
    interface Window {
        umami?: {
            track: (eventName: string, eventData?: Record<string, unknown>) => void;
        };
        plausible?: (eventName: string, options?: Record<string, unknown>) => void;
    }
}

export function trackUmamiEvent(eventName: string, payload?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && window.umami) {
        window.umami.track(eventName, payload);
    } else {
        console.log(`[DEBUG] Umami no disponible aún. Evento: ${eventName}`, payload);
    }
}

export function trackPlausibleEvent(eventName: string, payload?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && window.plausible) {
        window.plausible(eventName, payload);
    } else {
        console.log(`[DEBUG] Plausible no disponible aún. Evento: ${eventName}`, payload);
    }
}
