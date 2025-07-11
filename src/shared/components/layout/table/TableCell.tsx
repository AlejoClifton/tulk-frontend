import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableCellVariants = cva('px-6 py-4 whitespace-nowrap', {
    variants: {
        variant: {
            default: 'text-gray-900',
            striped: 'text-gray-900',
            dark: 'text-gray-100',
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

export interface TableCellProps extends ClassedComponentProps<typeof tableCellVariants> {
    children: React.ReactNode;
}

export const TableCell = ({ children, className, ...variantProps }: TableCellProps) => {
    return <td className={tableCellVariants({ ...variantProps, className })}>{children}</td>;
};
