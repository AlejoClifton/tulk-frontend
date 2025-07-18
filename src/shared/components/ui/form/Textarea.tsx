'use client';

import React, { TextareaHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const TextareaVariants = cva('w-full rounded-md border border-gray-300 py-3 px-4 outline-none focus:border-orange-01', {
    variants: {
        variant: {
            default: 'bg-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface TextareaProps
    extends ClassedComponentProps<typeof TextareaVariants>,
        TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

export const Textarea = ({ className, error, ...inputProps }: TextareaProps) => {
    return (
        <div className="flex flex-col gap-2">
            <textarea className={TextareaVariants({ ...inputProps, className })} {...inputProps} />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
