import React from 'react';

interface LoadingSpinnerProps {
    size?: number;
    label?: string;
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 36, label = '', className = '' }) => (
    <div className={`flex flex-col items-center justify-center gap-2 ${className} px-5`}>
        <span
            className="inline-block animate-spin rounded-full border-4 border-gray-200 border-t-primary"
            style={{ width: size, height: size }}
            aria-label={label || 'Cargando...'}
            role="status"
        />
        {label && <span className="text-sm text-gray-500">{label}</span>}
    </div>
);
