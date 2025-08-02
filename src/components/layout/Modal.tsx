import React from 'react';

import { cva } from 'class-variance-authority';

import { TrashIcon } from '@/assets/SvgContainer';
import { Subtitle, Button } from '@/components/ui';
import type { ClassedComponentProps } from '@/interfaces/classed-component-props';

export const modalVariants = cva(
    `fixed inset-0 z-50 flex items-center justify-center
    rounded-lg px-4 py-8 shadow-lg shadow-slate-200 border-1 border-slate-200 w-[90%] lg:w-full shadow-md max-w-2xl overflow-y-auto
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    `,
    {
        variants: {
            variant: {
                primary: 'bg-white',
                secondary: 'bg-black',
            },
        },
    },
);

export interface ModalProps extends ClassedComponentProps<typeof modalVariants> {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

export const Modal = ({ children, className, title, onClose, ...variantProps }: ModalProps) => {
    return (
        <dialog className={modalVariants({ ...variantProps, className })}>
            <div className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <Subtitle weight="semibold" variant="lg">
                        {title}
                    </Subtitle>
                    <Button variant="error" onClick={onClose} size="icon">
                        <TrashIcon />
                    </Button>
                </div>
                {children}
            </div>
        </dialog>
    );
};
