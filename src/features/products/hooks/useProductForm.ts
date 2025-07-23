'use client';

import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { ProductInterface } from '@/modules/products/domain/product.entity';
import { useProductMutations } from '@/features/products/hooks/useProductMutations';

import { IOptions } from '@/shared/types/selectedOption.interface';

export type ProductFormData = ProductInterface & {
    mainImageFile?: File | null;
    imagesFiles?: File[];
    imagesToDelete?: string[];
};

export function useProductForm(product: ProductInterface, onClose: () => void) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<ProductFormData>({
        defaultValues: {
            ...product,
            imagesToDelete: [],
        },
    });

    const { createProduct, updateProduct, isLoading } = useProductMutations();

    const queryClient = useQueryClient();
    const mainImageFile = watch('mainImageFile');
    const imagesFiles = watch('imagesFiles');
    const imagesToDelete = watch('imagesToDelete');
    const categoryId = watch('categoryId');
    const mainImageUrl = watch('mainImageUrl');
    const imagesUrl = watch('imagesUrl');

    const handleRemoveImage = (type: 'main' | 'secondary', index: number) => {
        if (type === 'main') {
            setValue('mainImageFile', null);
            if (mainImageUrl) {
                setValue('imagesToDelete', [...(imagesToDelete || []), mainImageUrl]);
                setValue('mainImageUrl', '');
            }
        } else {
            const currentImagesUrl = imagesUrl || [];
            const currentImagesFiles = imagesFiles || [];

            if (index < currentImagesUrl.length) {
                const urlToRemove = currentImagesUrl[index];
                setValue('imagesToDelete', [...(imagesToDelete || []), urlToRemove]);
                const newImagesUrl = currentImagesUrl.filter((_, i) => i !== index);
                setValue('imagesUrl', newImagesUrl);
            } else {
                const fileIndex = index - currentImagesUrl.length;
                const newImagesFiles = [...currentImagesFiles];
                newImagesFiles.splice(fileIndex, 1);
                setValue('imagesFiles', newImagesFiles);
            }
        }
    };

    const handleSelectCategory = (category: IOptions) => {
        setValue('categoryId', category.value);
    };

    const onSubmit = async (data: ProductFormData) => {
        const formData = new FormData();

        formData.append('id', data.id);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('isActive', String(data.isActive));
        formData.append('mainImageUrl', data.mainImageUrl || '');
        formData.append('imagesUrl', data.imagesUrl ? JSON.stringify(data.imagesUrl) : JSON.stringify([]));

        if (data.mainImageFile) {
            formData.append('mainImageFile', data.mainImageFile);
        }
        if (data.imagesFiles) {
            Array.from(data.imagesFiles).forEach((file) => {
                formData.append('imagesFiles', file);
            });
        }

        if (product.id && product.id !== '') {
            formData.append(
                'imagesToDelete',
                data.imagesToDelete ? JSON.stringify(data.imagesToDelete) : JSON.stringify([]),
            );

            await updateProduct.mutateAsync(formData as unknown as ProductInterface);
            toast.success('Producto actualizado correctamente');
        } else {
            await createProduct.mutateAsync(formData as unknown as ProductInterface);
            toast.success('Producto creado correctamente');
        }

        await queryClient.invalidateQueries({ queryKey: ['products'] });

        reset();
        onClose();
    };

    return {
        register,
        handleSubmit,
        errors,
        setValue,
        mainImageFile,
        imagesFiles,
        onSubmit,
        handleRemoveImage,
        handleSelectCategory,
        categoryId,
        imagesToDelete,
        mainImageUrl,
        imagesUrl,
        isLoading,
    };
}
