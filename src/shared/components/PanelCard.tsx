import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const panelVariants = cva('rounded-2xl p-6 md:rounded-3xl md:p-10', {
    variants: {
        variant: {
            light: 'border-1 border-gray-200 bg-white text-gray-800 shadow-sm',
            dark: 'card-dark',
        },
    },
    defaultVariants: {
        variant: 'light',
    },
});

export const PanelCard = ({ children, className, ...variantProps }: ClassedComponentProps<typeof panelVariants>) => {
    return <div className={panelVariants({ ...variantProps, className })}>{children}</div>;
};
