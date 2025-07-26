import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableBodyVariants = cva('', {
    variants: {
        variant: {
            default: 'divide-y divide-gray-200',
            striped: 'divide-y divide-gray-200',
            dark: 'divide-y divide-gray-600',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
export interface TableBodyProps extends ClassedComponentProps<typeof tableBodyVariants> {
    children: React.ReactNode;
}

export const TableBody = ({ children, className, ...variantProps }: TableBodyProps) => {
    return <tbody className={tableBodyVariants({ ...variantProps, className })}>{children}</tbody>;
};
