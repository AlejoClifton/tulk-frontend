import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Brand } from '@/modules/brand/domain/brand.entity';
import { useBrandMutations } from '@/shared/hooks/useBrandMutations';

export type BrandFormData = Brand & {
    imageFile?: File | null;
};

export function useBrandForm(brand: Brand | null) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<BrandFormData>();

    const { updateBrand, isLoading } = useBrandMutations();

    useEffect(() => {
        if (brand) {
            reset(brand);
        }
    }, [brand, reset]);

    const imageFile = watch('imageFile');
    const imageUrl = watch('image');

    const handleImageChange = (files: FileList | File[] | null) => {
        if (files && files.length > 0) {
            setValue('imageFile', files[0]);
            setValue('image', '');
        }
    };

    const handleRemoveImage = () => {
        setValue('imageFile', null);
        setValue('image', '');
    };

    const onSubmit = (data: BrandFormData) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            const K = key as keyof BrandFormData;
            if (K === 'imageFile' && data.imageFile) {
                formData.append('imageFile', data.imageFile);
            } else if (K !== 'imageFile' && data[K] !== null && data[K] !== undefined) {
                formData.append(K, data[K] as string);
            }
        });

        updateBrand.mutate(formData);
    };

    return {
        register,
        handleSubmit,
        errors,
        imageFile,
        imageUrl,
        isLoading,
        onSubmit,
        handleImageChange,
        handleRemoveImage,
        setValue,
    };
}
