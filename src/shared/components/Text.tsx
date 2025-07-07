import React from 'react';
import { cva } from 'class-variance-authority';
import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

export const textVariants = cva('font-normal', {
    variants: {
        variant: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            tertiary: 'text-tertiary',
            white: 'text-white',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
        },
    },
    defaultVariants: {
        variant: 'tertiary',
        size: 'md',
    },
});

export interface TextProps extends ClassedComponentProps<typeof textVariants> {
    children: React.ReactNode;
}

export const Text = ({ children, className, ...variantProps }: TextProps) => {
    return <p className={textVariants({ ...variantProps, className })}>{children}</p>;
};
