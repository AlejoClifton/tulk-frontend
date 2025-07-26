import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableVariants = cva('w-full border border-gray-200 shadow shadow-sm overflow-x-auto', {
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

const tableElementVariants = cva('min-w-full', {
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
