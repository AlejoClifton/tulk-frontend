import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/interfaces/classed-component-props';

const tableHeaderVariants = cva('', {
    variants: {
        variant: {
            default: 'bg-gray-50 border-b border-gray-200',
            striped: 'bg-gray-50 border-b border-gray-200',
            dark: 'bg-gray-700 border-b border-gray-600',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TableHeaderProps extends ClassedComponentProps<typeof tableHeaderVariants> {
    children: React.ReactNode;
}

export const TableHeader = ({ children, className, ...variantProps }: TableHeaderProps) => {
    return <thead className={tableHeaderVariants({ ...variantProps, className })}>{children}</thead>;
};
