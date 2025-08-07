'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Text, Title, Button, Input, Label, LoadingSpinner } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        trackUmamiEvent(ANALYTICS_EVENTS.SIGN_IN);

        try {
            const { error } = await signIn(email, password);
            if (error) {
                setError(error.message);
            }
            router.push('/admin');
        } catch {
            setError('Error inesperado. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                <div className="mb-8 text-center">
                    <Title className="mb-2 text-3xl font-bold text-gray-900">Panel Administrativo</Title>
                    <Text className="text-gray-600">Inicia sesión para acceder al panel</Text>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <Text className="text-sm text-red-600">{error}</Text>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                        {isLoading ? <LoadingSpinner /> : 'Iniciar sesión'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
