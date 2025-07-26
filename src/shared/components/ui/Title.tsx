import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const titleVariants = cva('text-2xl font-bold', {
    variants: {
        variant: {
            lg: 'text-4xl',
            md: 'text-2xl',
            sm: 'text-xl',
        },
        color: {
            primary: 'text-primary',
            secondary: 'text-secondary',
            tertiary: 'text-tertiary',
        },
    },
    defaultVariants: {
        variant: 'md',
        color: 'primary',
    },
});

export const Title = ({ children, className, ...variantProps }: ClassedComponentProps<typeof titleVariants>) => {
    return <h1 className={titleVariants({ ...variantProps, className })}>{children}</h1>;
};
