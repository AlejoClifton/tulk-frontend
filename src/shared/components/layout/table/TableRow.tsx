import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const tableRowVariants = cva('transition-colors duration-200', {
    variants: {
        variant: {
            default: 'hover:bg-gray-50',
            striped: 'even:bg-gray-50 hover:bg-gray-100',
            dark: 'hover:bg-gray-700 even:bg-gray-750',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
export interface TableRowProps extends ClassedComponentProps<typeof tableRowVariants> {
    children: React.ReactNode;
}

export const TableRow = ({ children, className, ...variantProps }: TableRowProps) => {
    return <tr className={tableRowVariants({ ...variantProps, className })}>{children}</tr>;
};
