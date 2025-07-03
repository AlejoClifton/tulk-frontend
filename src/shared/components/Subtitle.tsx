import React from 'react';
import { cva } from 'class-variance-authority';
import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const subtitleVariants = cva('text-2xl font-bold', {
    variants: {
        variant: {
            lg: 'text-2xl',
            md: 'text-xl',
            sm: 'text-lg',
        },
        color: {
            default: 'text-slate-900',
            primary: 'text-white',
        },
    },
    defaultVariants: {
        variant: 'lg',
        color: 'default',
    },
});

export const Subtitle = ({ children, className, ...variantProps }: ClassedComponentProps<typeof subtitleVariants>) => {
    return <h2 className={subtitleVariants({ ...variantProps, className })}>{children}</h2>;
};
