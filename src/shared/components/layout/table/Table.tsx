import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableElementVariants = cva('min-w-full table-auto', {
    variants: {
        variant: {
            default: '',
            striped: '',
            dark: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const tableVariants = cva('w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm', {
    variants: {
        variant: {
            default: 'bg-white',
            striped: 'bg-white',
            dark: 'bg-gray-800 border-gray-700',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});

export interface TableProps extends ClassedComponentProps<typeof tableVariants> {
    children: React.ReactNode;
}

export const Table = ({ children, className, ...variantProps }: TableProps) => {
    return (
        <div className={tableVariants({ ...variantProps, className })}>
            <table className={tableElementVariants({ ...variantProps })}>{children}</table>
        </div>
    );
};
