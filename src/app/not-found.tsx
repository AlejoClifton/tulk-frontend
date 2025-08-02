'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="w-full max-w-md text-center">
                <div className="mb-8">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-pink-500 shadow-lg">
                        <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
                <h2 className="mb-4 text-2xl font-semibold text-gray-700">¡Ups! Página no encontrada</h2>
                <p className="mb-8 leading-relaxed text-gray-600">
                    La página que buscas no existe o ha sido movida. Te estamos redirigiendo al inicio automáticamente.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => router.push('/')}
                        className="w-full transform cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg">
                        Ir al inicio
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="w-full cursor-pointer rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200">
                        Volver atrás
                    </button>
                </div>

                <div className="mt-12 opacity-20">
                    <div className="flex justify-center space-x-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
