import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Brand } from '@/modules/brand/domain/brand.entity';
import { useBrandMutations } from '@/shared/hooks/useBrandMutations';
import { useImagesController } from '@/shared/hooks/useImagesController';

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
        formState: { errors, isSubmitting },
    } = useForm<BrandFormData>();

    const { updateBrand } = useBrandMutations();
    const { isUploading, replaceImage } = useImagesController();

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

    const onSubmit = async (data: BrandFormData) => {
        let imageUrl = data.image;

        if (data.imageFile) {
            try {
                const response = await replaceImage(data.imageFile, brand?.image || '', 'branding');
                imageUrl = response?.url || '';
            } catch (error) {
                console.error('Error al cargar la imagen:', error);
            }
        }

        const dataToUpdate = {
            id: data.id,
            name: data.name,
            description: data.description,
            email: data.email,
            phone: data.phone,
            address: data.address,
            addressLink: data.addressLink,
            image: imageUrl,
            hours: data.hours,
        };

        updateBrand.mutate(dataToUpdate);
    };

    return {
        register,
        handleSubmit,
        errors,
        imageFile,
        imageUrl,
        isLoading: isSubmitting || updateBrand.isPending || isUploading,
        onSubmit,
        handleImageChange,
        handleRemoveImage,
        setValue,
    };
}
