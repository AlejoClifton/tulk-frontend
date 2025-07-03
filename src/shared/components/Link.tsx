import React from 'react';
import Link from 'next/link';
import { cva } from 'class-variance-authority';

import type { ClassedComponentProps } from '@/shared/types/classed-component-props';

const linkVariants = cva('text-tertiary hover:text-tertiary-hover', {
    variants: {
        variant: {
            default: 'text-tertiary hover:text-tertiary-hover',
        },
    },
});

export interface CustomLinkProps extends ClassedComponentProps<typeof linkVariants> {
    href: string;
    children: React.ReactNode;
    target?: '_blank' | '_self' | '_parent' | '_top';
}

export const CustomLink = ({ children, href, className, target, ...props }: CustomLinkProps) => {
    return (
        <Link href={href} className={linkVariants({ className })} target={target} {...props}>
            {children}
        </Link>
    );
};
