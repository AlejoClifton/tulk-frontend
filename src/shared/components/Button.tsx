import React from 'react';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

export const buttonVariants = cva('cursor-pointer rounded-md font-bold transition-all duration-300', {
    variants: {
        variant: {
            default: 'bg-gradient-to-r from-orange-01 to-orange-02 text-white hover:from-orange-01 hover:to-orange-01',
            outline: 'border border-tertiary text-tertiary hover:bg-tertiary-hover hover:text-secondary',
        },
        size: {
            md: 'py-2 px-4',
            lg: 'py-4 px-8',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
    },
});

export interface ButtonProps extends ClassedComponentProps<typeof buttonVariants> {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
    children,
    className,
    disabled = false,
    onClick,
    type = 'button',
    ...variantProps
}: ButtonProps) => {
    return (
        <button
            className={buttonVariants({ ...variantProps, className })}
            onClick={onClick}
            disabled={disabled}
            type={type}>
            {children}
        </button>
    );
};
