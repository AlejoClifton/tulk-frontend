import React from 'react';

import { cva } from 'class-variance-authority';
import Link from 'next/link';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const linkVariants = cva('font-medium', {
    variants: {
        variant: {
            primary: 'text-primary hover:text-primary-hover',
            secondary: 'text-tertiary hover:text-tertiary-hover',
            tertiary: 'text-slate-500 hover:text-slate-600',
        },
    },
    defaultVariants: {
        variant: 'secondary',
    },
});

export interface CustomLinkProps extends ClassedComponentProps<typeof linkVariants> {
    href: string;
    children: React.ReactNode;
    target?: '_blank' | '_self' | '_parent' | '_top';
}

export const CustomLink = ({ children, href, className, target, ...variantProps }: CustomLinkProps) => {
    return (
        <Link href={href} className={linkVariants({ ...variantProps, className })} target={target} {...variantProps}>
            {children}
        </Link>
    );
};
