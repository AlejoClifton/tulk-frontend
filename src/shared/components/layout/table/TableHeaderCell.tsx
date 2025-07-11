import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableHeaderCellVariants = cva('px-6 py-3 text-left text-xs font-medium uppercase tracking-wider', {
    variants: {
        variant: {
            default: 'text-gray-500',
            striped: 'text-gray-500',
            dark: 'text-gray-300',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TableHeaderCellProps extends ClassedComponentProps<typeof tableHeaderCellVariants> {
    children: React.ReactNode;
}
export const TableHeaderCell = ({ children, className, ...variantProps }: TableHeaderCellProps) => {
    return <th className={tableHeaderCellVariants({ ...variantProps, className })}>{children}</th>;
};
