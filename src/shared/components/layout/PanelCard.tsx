import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const panelVariants = cva('rounded-2xl md:rounded-3xl', {
    variants: {
        variant: {
            light: 'border-1 border-gray-200 bg-slate-50 text-gray-800 shadow-sm p-4 md:p-6',
            product: 'border-1 border-gray-200 bg-slate-50 text-gray-800 shadow-sm',
            dark: 'card-dark p-6 md:p-10',
        },
    },
    defaultVariants: {
        variant: 'light',
    },
});

export const PanelCard = ({ children, className, ...variantProps }: ClassedComponentProps<typeof panelVariants>) => {
    return <div className={panelVariants({ ...variantProps, className })}>{children}</div>;
};

