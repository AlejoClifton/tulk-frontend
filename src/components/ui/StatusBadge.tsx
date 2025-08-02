import { cva } from 'class-variance-authority';

import { Text } from '@/components/ui/Text';
import { ClassedComponentProps } from '@/interfaces/classed-component-props';

export const statusBadgeVariants = cva('flex items-center justify-center gap-2 rounded-full px-5 py-1', {
    variants: {
        variant: {
            success: 'bg-success-light',
            error: 'bg-error-light',
        },
    },
});

export interface StatusBadgeProps extends ClassedComponentProps<typeof statusBadgeVariants> {
    children: React.ReactNode;
    isActive: boolean;
}

export const StatusBadge = ({ children, className, isActive, ...variantProps }: StatusBadgeProps) => {
    return (
        <div className={statusBadgeVariants({ ...variantProps, className })}>
            <Text variant={isActive ? 'success' : 'error'} weight="medium">
                {children}
            </Text>
        </div>
    );
};
