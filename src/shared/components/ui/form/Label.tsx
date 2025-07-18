import React, { LabelHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

export const LabelVariants = cva('text-sm font-medium', {
    variants: {
        variant: {
            default: 'text-secondary',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface LabelProps extends ClassedComponentProps<typeof LabelVariants>, LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode;
}

export const Label = ({ className, children, ...labelProps }: LabelProps) => {
    return (
        <label className={LabelVariants({ ...labelProps, className })} {...labelProps}>
            {children}
        </label>
    );
};
