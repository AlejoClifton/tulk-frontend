import React from 'react';
import { cva } from 'class-variance-authority';
import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

export const navegationVariants = cva('flex gap-4', {
    variants: {
        variant: {
            primary: 'flex-row',
            secondary: 'flex-col',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export interface NavegationProps extends ClassedComponentProps<typeof navegationVariants> {
    children: React.ReactNode;
}

export const Navegation = ({ children, className, ...variantProps }: NavegationProps) => {
    return <nav className={navegationVariants({ ...variantProps, className })}>{children}</nav>;
};
