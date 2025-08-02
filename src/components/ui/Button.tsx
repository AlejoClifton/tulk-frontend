import React from 'react';

import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/interfaces/classed-component-props';

export const buttonVariants = cva('rounded-2xl font-bold transition-all duration-300', {
    variants: {
        variant: {
            default:
                'cursor-pointer bg-gradient-to-r from-orange-01 to-orange-02 text-white hover:from-orange-01 hover:to-orange-01',
            outline: 'cursor-pointer border border-tertiary text-tertiary hover:bg-tertiary-hover hover:text-secondary',
            success: 'cursor-pointer bg-success text-white hover:bg-success-hover',
            error: 'cursor-pointer bg-error text-white hover:bg-error-hover',
            loading: 'flex items-center gap-2 px-4 py-2 bg-gray-400 cursor-not-allowed',
            blue: 'cursor-pointer bg-blue-600 text-white hover:bg-blue-600/80',
            gray: 'cursor-pointer bg-gray-500 text-white hover:bg-gray-500/80',
        },
        size: {
            md: 'py-2 px-4',
            lg: 'py-4 px-8',
            icon: 'p-2',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: null,
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
