'use client';

import { useState } from 'react';

import { NextjsAdapter } from '@/shared/http/adapters/next-js.adapter';
import { getPublicIdFromUrl } from '@/shared/utils/getPublicIdFromUrl';

interface UploadResponse {
    url: string;
    public_id: string;
}

interface UseImagesControllerReturn {
    uploadImages: (files: File | File[], folder: string) => Promise<UploadResponse[]>;
    deleteImages: (urls: string | string[]) => Promise<boolean>;
    isUploading: boolean;
    isDeleting: boolean;
    error: string | null;
    replaceImage: (imageFile: File, url: string, folder: string) => Promise<{ url: string } | null>;
}

export function useImagesController(): UseImagesControllerReturn {
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const adapter = new NextjsAdapter();

    const uploadImages = async (files: File | File[], folder: string): Promise<UploadResponse[]> => {
        setIsUploading(true);
        setError(null);

        try {
            const filesArray = Array.isArray(files) ? files : [files];

            if (filesArray.length === 0) {
                throw new Error('No files provided');
            }

            const formData = new FormData();
            filesArray.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('folder', folder);

            const response = await adapter.postWithData<{ uploads: UploadResponse[] }>('/upload', formData);
            return response.uploads || [];
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error uploading images';
            setError(errorMessage);
            console.error('Error uploading images:', err);
            throw err;
        } finally {
            setIsUploading(false);
        }
    };

    const deleteImages = async (urls: string | string[]): Promise<boolean> => {
        setIsDeleting(true);
        setError(null);

        try {
            const urlsArray = Array.isArray(urls) ? urls : [urls];

            if (urlsArray.length === 0) {
                throw new Error('No URLs provided');
            }

            const publicIds = urlsArray.map((url) => getPublicIdFromUrl(url)).filter((id) => id !== null) as string[];

            if (publicIds.length === 0) {
                throw new Error('No valid public IDs found in URLs');
            }

            await adapter.postWithData<{ message: string }>('/delete', { publicIds });
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error deleting images';
            setError(errorMessage);
            console.error('Error deleting images:', err);
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    const replaceImage = async (imageFile: File, url: string, folder: string) => {
        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', imageFile);
            const publicId = getPublicIdFromUrl(url);
            formData.append('publicId', publicId || '');
            formData.append('folder', folder);

            const response = await adapter.postWithData<{ url: string }>('/replace-image', formData);
            return response;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error replacing image';
            setError(errorMessage);
            console.error('Error replacing image:', err);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        uploadImages,
        deleteImages,
        replaceImage,
        isUploading,
        isDeleting,
        error,
    };
}
