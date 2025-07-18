'use client';
import React, { useRef } from 'react';

type Props = {
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    onChange: (files: FileList | File[] | null) => void;
    label?: string;
    className?: string;
};

export const ImageFileInput: React.FC<Props> = ({
    multiple = false,
    maxFiles = 6,
    accept = 'image/*',
    onChange,
    label = 'Arrastre imágenes aquí o haga click',
    className = '',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        if (!multiple) {
            onChange(files[0] ? [files[0]] : null);
        } else {
            const fileArr = Array.from(files).slice(0, maxFiles);
            onChange(fileArr);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    return (
        <div
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 transition hover:border-primary-hover ${className}`}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            tabIndex={0}
            role="button">
            <span className="text-base text-gray-500">{label}</span>
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
            />
            <span className="mt-2 text-xs text-gray-400">
                {multiple ? `Hasta ${maxFiles} imágenes` : 'Sólo una imagen'}
            </span>
        </div>
    );
};
