import React from 'react';

interface SeparatorProps {
    orientation?: 'vertical' | 'horizontal';
    className?: string;
    size?: number | string;
    thickness?: number | string;
    color?: string;
}

const Separator = ({
    orientation = 'vertical',
    className = '',
    size,
    thickness,
    color = 'bg-slate-300',
}: SeparatorProps) => {
    const isVertical = orientation === 'vertical';

    const width = isVertical ? thickness || '2px' : size || '100%';
    const height = isVertical ? size || '1.5rem' : thickness || '2px';

    return (
        <div
            className={`${color} ${className}`}
            style={{
                width: width,
                height: height,
                minWidth: width,
                minHeight: height,
                borderRadius: 999,
            }}
            aria-orientation={orientation}
            role="separator"
        />
    );
};

export default Separator;
