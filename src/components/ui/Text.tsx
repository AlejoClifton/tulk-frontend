import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/interfaces/classed-component-props';

export const textVariants = cva('', {
    variants: {
        variant: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            tertiary: 'text-tertiary',
            white: 'text-white',
            success: 'text-success',
            error: 'text-error',
            blue: 'text-blue-600',
            orange: 'text-orange-05',
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extraBold: 'font-extrabold',
        },
    },
    defaultVariants: {
        variant: 'tertiary',
        size: 'md',
        weight: 'normal',
    },
});

export interface TextProps extends ClassedComponentProps<typeof textVariants> {
    children: React.ReactNode;
}

export const Text = ({ children, className, ...variantProps }: TextProps) => {
    return <p className={textVariants({ ...variantProps, className })}>{children}</p>;
};
