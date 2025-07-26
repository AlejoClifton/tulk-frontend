import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const subtitleVariants = cva('', {
    variants: {
        variant: {
            xl: 'text-4xl',
            lg: 'text-2xl',
            md: 'text-xl',
            sm: 'text-lg',
        },
        color: {
            default: 'text-slate-900',
            primary: 'text-white',
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },
    },
    defaultVariants: {
        variant: 'lg',
        color: 'default',
        weight: 'bold',
    },
});

export const Subtitle = ({ children, className, ...variantProps }: ClassedComponentProps<typeof subtitleVariants>) => {
    return <h2 className={subtitleVariants({ ...variantProps, className })}>{children}</h2>;
};
