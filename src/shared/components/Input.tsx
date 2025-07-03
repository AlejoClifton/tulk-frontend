import React, { InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const InputVariants = cva('w-full rounded-md border border-gray-300 py-3 px-4 outline-none focus:border-orange-01', {
    variants: {
        variant: {
            default: 'bg-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const LabelVariants = cva('mb-2 text-sm font-medium', {
    variants: {
        variant: {
            default: 'text-secondary',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface InputProps extends ClassedComponentProps<typeof InputVariants>, InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({ className, label, error, ...inputProps }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className={LabelVariants({ ...inputProps, className })}>{label}</label>}
            <input className={InputVariants({ ...inputProps, className })} {...inputProps} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};