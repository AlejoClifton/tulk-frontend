'use client';

import React, { useState } from 'react';

import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    alt: string;
    className?: string;
    thumbnailSize?: 'sm' | 'md' | 'lg';
    mainImageHeight?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    alt,
    className = '',
    thumbnailSize = 'md',
    mainImageHeight = 'h-[32rem]',
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (index: number) => {
        setCurrentImageIndex(index);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const thumbnailSizes = {
        sm: 'h-12 w-12',
        md: 'h-16 w-16',
        lg: 'h-20 w-20',
    };

    if (!images.length) return null;

    return (
        <div className={`flex gap-4 ${className}`}>
            {images.length > 1 && (
                <div className="flex flex-col gap-2">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`relative aspect-square ${thumbnailSizes[thumbnailSize]} cursor-pointer overflow-hidden rounded-lg border-2 transition-all hover:opacity-80 ${
                                currentImageIndex === index ? 'border-orange-01' : 'border-gray-200'
                            }`}
                            onClick={() => handleImageChange(index)}>
                            <Image src={image} alt={`${alt} - Imagen ${index + 1}`} fill className="object-contain" />
                        </div>
                    ))}
                </div>
            )}

            <div className={`relative aspect-[1/1] ${mainImageHeight} flex-1 overflow-hidden rounded-2xl`}>
                <Image src={images[currentImageIndex]} alt={alt} fill className="object-contain" />

                {images.length > 1 && (
                    <div className="absolute top-4 right-4 rounded-lg bg-black/50 px-3 py-1 text-sm text-white">
                        {currentImageIndex + 1}/{images.length}
                    </div>
                )}

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                            aria-label="Imagen anterior">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                            aria-label="Imagen siguiente">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export { ImageGallery };
