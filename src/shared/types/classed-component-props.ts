/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

import { VariantProps } from 'class-variance-authority';

export type ClassedComponentProps<T extends (...args: any[]) => any> = VariantProps<T> & {
    children?: ReactNode;
    className?: string;
};
