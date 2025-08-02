import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/interfaces/classed-component-props';

const SectionTitleVariants = cva('text-xl font-bold', {
    variants: {
        variant: {
            lg: 'text-xl',
            md: 'text-lg',
            sm: 'text-[1.125rem]',
        },
        color: {
            default: 'text-slate-900',
            primary: 'text-white',
            secondary: 'text-orange-05',
            tertiary: 'text-secondary',
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

export const SectionTitle = ({
    children,
    className,
    ...variantProps
}: ClassedComponentProps<typeof SectionTitleVariants>) => {
    return <h3 className={SectionTitleVariants({ ...variantProps, className })}>{children}</h3>;
};
