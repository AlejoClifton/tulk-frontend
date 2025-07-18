'use client';

import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/ui';
import { TrashIcon } from '../../icons/SvgContainer';

type Props = {
    files?: File[];
    urls?: string[];
    className?: string;
    onRemoveImage?: (index: number) => void;
};

export const ImagePreviewList: React.FC<Props> = ({ files = [], urls = [], className = '', onRemoveImage }) => {
    const previews = useMemo(() => {
        const filePreviews = files?.map((file) => URL.createObjectURL(file)) || [];
        return [...(urls || []), ...filePreviews];
    }, [files, urls]);

    useEffect(() => {
        return () => {
            previews.forEach((url) => {
                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
            });
        };
    }, [previews]);

    if (previews.length === 0) return null;

    return (
        <div className={`mt-2 flex flex-wrap gap-2 ${className}`}>
            {previews.map((url, idx) => (
                <div key={idx} className="relative flex items-center gap-2">
                    <Image
                        key={idx}
                        src={url}
                        alt={`preview-${idx}`}
                        className="h-24 w-24 rounded-xl border object-cover shadow"
                        width={96}
                        height={96}
                    />
                    {onRemoveImage && (
                        <Button
                            variant="error"
                            onClick={() => onRemoveImage(idx)}
                            className="absolute top-0 right-0 rounded-full p-0"
                            size="icon">
                            <TrashIcon className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
};
