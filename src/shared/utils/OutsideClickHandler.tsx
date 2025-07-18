'use client';
import React, { useRef, useEffect, ReactNode } from 'react';

interface OutsideClickHandlerProps {
    children: ReactNode;
    onOutsideClick: () => void;
    className?: string;
}

const OutsideClickHandler: React.FC<OutsideClickHandlerProps> = ({ children, onOutsideClick, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside: EventListener = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onOutsideClick]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
};

export default OutsideClickHandler;
