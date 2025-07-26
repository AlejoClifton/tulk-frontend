export const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        // En el navegador, usar una ruta relativa
        return '';
    }

    if (process.env.VERCEL_URL) {
        // Entorno de Vercel
        return `https://${process.env.VERCEL_URL}`;
    }

    // Entorno de desarrollo local
    return 'http://localhost:3000';
}; 