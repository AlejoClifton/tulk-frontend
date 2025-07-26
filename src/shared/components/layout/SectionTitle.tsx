import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

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
        },
    },
    defaultVariants: {
        variant: 'lg',
        color: 'default',
    },
});

export const SectionTitle = ({
    children,
    className,
    ...variantProps
}: ClassedComponentProps<typeof SectionTitleVariants>) => {
    return <h3 className={SectionTitleVariants({ ...variantProps, className })}>{children}</h3>;
};
