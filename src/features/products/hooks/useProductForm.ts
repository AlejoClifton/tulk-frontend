'use client';

import axios from 'axios';
import { useForm } from 'react-hook-form';

import { useProductMutations } from '@/features/products/hooks/useProductMutations';
import { ProductInterface } from '@/modules/products/domain/product.entity';
import { IOptions } from '@/shared/types/selectedOption.interface';

export type ProductFormData = ProductInterface & {
    mainImageFile?: File | null;
    imagesFiles?: File[];
    imagesToDelete?: string[];
};

const defaultValues = {
    id: '',
    name: 'Calefactor Diésel 2000 W 1 salida',
    description:
        'El Calefactor Diesel 5000 W de Tulk es la solución perfecta para calefaccionar espacios amplios de manera eficiente y económica. Con una potencia de 5000 W, este calefactor proporciona un calor constante y uniforme, ideal para embarcaciones, cabañas, talleres o cualquier espacio que requiera calefacción confiable. Su diseño compacto y tecnología avanzada garantizan un rendimiento superior con mínimo mantenimiento.',
    categoryId: '7e2d89c2-e688-47fb-aef8-94d7e17a66e1',
    mainImageUrl: '',
    imagesUrl: [],
    isActive: true,
    imagesToDelete: [],
    benefits: [
        {
            value: 'Alta eficiencia energética',
        },
        {
            value: 'Bajo consumo de combustible',
        },
        {
            value: 'Control digital preciso de temperatura',
        },
        {
            value: 'Instalación sencilla',
        },
    ],
    technicalSpecifications: [
        {
            title: 'Potencia y Rendimiento',
            specifications: [
                {
                    key: 'Potencia térmica',
                    value: '5000 W',
                },
                {
                    key: 'Voltaje de alimentación',
                    value: '12V DC',
                },
                {
                    key: 'Consumo eléctrico',
                    value: '8-29 W',
                },
                {
                    key: 'Consumo de combustible',
                    value: '0.1-0.4 L/h',
                },
            ],
        },
    ],
    faq: [
        {
            question: 'Tecnología de combustión limpia',
            answer: 'Este calefactor está diseñado para funcionar con diesel o kerosene de alta calidad.',
        },
    ],
    mainImageFile: null,
    imagesFiles: [],
};

export function useProductForm(product: ProductInterface, onClose: () => void) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch,
    } = useForm<ProductFormData>({
        defaultValues,
    });

    const { createProduct, updateProduct } = useProductMutations();

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
        let uploadedImageUrls: string[] = [];
        try {
            let mainImageUrl = data.mainImageUrl;
            let imagesUrl = data.imagesUrl || [];

            const filesToUpload: File[] = [];
            if (data.mainImageFile) {
                filesToUpload.push(data.mainImageFile);
            }
            if (data.imagesFiles && data.imagesFiles.length > 0) {
                filesToUpload.push(...data.imagesFiles);
            }

            if (filesToUpload.length > 0) {
                const imageFormData = new FormData();
                filesToUpload.forEach((file) => imageFormData.append('files', file));

                const response = await fetch('/api/products/images', {
                    method: 'POST',
                    body: imageFormData,
                });

                if (!response.ok) throw new Error('Error uploading images');

                const { urls } = await response.json();
                uploadedImageUrls = [...urls];

                if (data.mainImageFile) {
                    mainImageUrl = uploadedImageUrls[0] || '';
                    imagesUrl = [...imagesUrl, ...uploadedImageUrls.slice(1)];
                } else {
                    imagesUrl = [...imagesUrl, ...uploadedImageUrls];
                }
            }

            const productData = {
                id: product.id ? product.id : undefined,
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                isActive: data.isActive,
                mainImageUrl,
                imagesUrl,
            };

            if (product.id && product.id !== '') {
                await updateProduct.mutateAsync(productData);
            } else {
                await createProduct.mutateAsync(productData as ProductInterface);
            }
        } catch (error) {
            console.error('Submission failed, rolling back image uploads...');
            if (axios.isAxiosError(error)) {
                console.error('Error details:', error.response?.data);
            } else {
                console.error('Error details:', error);
            }

            if (uploadedImageUrls.length > 0) {
                await fetch('/api/products/images', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ urls: uploadedImageUrls }),
                });
            }
        } finally {
            reset();
            onClose();
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        setValue,
        watch,
        mainImageFile,
        imagesFiles,
        onSubmit,
        handleRemoveImage,
        handleSelectCategory,
        categoryId,
        imagesToDelete,
        mainImageUrl,
        imagesUrl,
        isLoading: isSubmitting || createProduct.isPending || updateProduct.isPending,
    };
}
