'use client';

import axios from 'axios';
import { useFieldArray, useForm } from 'react-hook-form';

import { useProductMutations } from '@/features/products/hooks/queries/useProductMutations';
import {
    FaqItem,
    ProductInterface,
    TechnicalSpecificationGroup,
} from '@/features/products/interfaces/product.interface';
import { useImagesController } from '@/hooks/useImagesController';
import { IOptions } from '@/interfaces/selectedOption.interface';

export type Benefit = { value: string };

export type ProductFormData = Omit<ProductInterface, 'benefits' | 'technicalSpecifications' | 'faq'> & {
    mainImageFile?: File | null;
    imagesFiles?: File[];
    imagesToDelete?: string[];
    benefits?: Benefit[];
    technicalSpecification?: TechnicalSpecificationGroup[];
    faq?: FaqItem[];
};

const defaultValues: Partial<ProductFormData> = {
    name: '',
    description: '',
    categoryId: '',
    mainImageUrl: '',
    imagesUrl: [],
    isActive: true,
    imagesToDelete: [],
    manualUrl: '',
    mainImageFile: null,
    imagesFiles: [],
    benefits: [],
    technicalSpecification: [],
    faq: [],
};

export function useProductForm(product: ProductInterface, onClose: () => void) {
    const methods = useForm<ProductFormData>({
        defaultValues: {
            ...defaultValues,
            ...product,
            benefits: product.benefits ? product.benefits.map((b) => ({ value: b })) : [],
            technicalSpecification: product.technicalSpecification || [],
            faq: product.faq || [],
        },
    });

    const {
        fields: benefitFields,
        append: appendBenefit,
        remove: removeBenefit,
    } = useFieldArray({
        control: methods.control,
        name: 'benefits',
    });
    const {
        fields: specFields,
        append: appendSpec,
        remove: removeSpec,
    } = useFieldArray({
        control: methods.control,
        name: 'technicalSpecification',
    });
    const {
        fields: faqFields,
        append: appendFaq,
        remove: removeFaq,
    } = useFieldArray({
        control: methods.control,
        name: 'faq',
    });

    const { createProduct, updateProduct } = useProductMutations();
    const { isUploading, uploadImages, deleteImages } = useImagesController();

    const mainImageFile = methods.watch('mainImageFile');
    const imagesFiles = methods.watch('imagesFiles');
    const imagesToDelete = methods.watch('imagesToDelete');
    const categoryId = methods.watch('categoryId');
    const mainImageUrl = methods.watch('mainImageUrl');
    const imagesUrl = methods.watch('imagesUrl');

    const handleRemoveImage = (type: 'main' | 'secondary', index: number) => {
        if (type === 'main') {
            methods.setValue('mainImageFile', null);
            if (mainImageUrl) {
                methods.setValue('imagesToDelete', [...(imagesToDelete || []), mainImageUrl]);
                methods.setValue('mainImageUrl', '');
            }
        } else {
            const currentImagesUrl = imagesUrl || [];
            const currentImagesFiles = imagesFiles || [];

            if (index < currentImagesUrl.length) {
                const urlToRemove = currentImagesUrl[index];
                methods.setValue('imagesToDelete', [...(imagesToDelete || []), urlToRemove]);
                const newImagesUrl = currentImagesUrl.filter((_, i) => i !== index);
                methods.setValue('imagesUrl', newImagesUrl);
            } else {
                const fileIndex = index - currentImagesUrl.length;
                const newImagesFiles = [...currentImagesFiles];
                newImagesFiles.splice(fileIndex, 1);
                methods.setValue('imagesFiles', newImagesFiles);
            }
        }
    };

    const handleSelectCategory = (category: IOptions) => {
        methods.setValue('categoryId', category.value);
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
                imageFormData.append('folder', 'products');

                const response = await uploadImages(filesToUpload, 'products');

                uploadedImageUrls = [...response.map((image) => image.url)];

                if (data.mainImageFile) {
                    mainImageUrl = uploadedImageUrls[0] || '';
                    imagesUrl = [...imagesUrl, ...uploadedImageUrls.slice(1)];
                } else {
                    imagesUrl = [...imagesUrl, ...uploadedImageUrls];
                }
            }

            if (data.imagesToDelete && data.imagesToDelete.length > 0) {
                try {
                    await deleteImages(data.imagesToDelete);
                } catch (error) {
                    console.error('Error deleting images:', error);
                }
            }

            const benefits = data.benefits?.map((b) => b.value);

            const productData: ProductInterface = {
                id: product.id || undefined,
                name: data.name,
                description: data.description,
                categoryId: data.categoryId,
                isActive: data.isActive,
                mainImageUrl,
                imagesUrl,
                benefits,
                technicalSpecification: data.technicalSpecification,
                manualUrl: data.manualUrl,
                faq: data.faq,
            };

            if (product.id && product.id !== '') {
                await updateProduct.mutateAsync(productData);
            } else {
                await createProduct.mutateAsync(productData);
            }

            methods.reset();
            onClose();
        } catch (error) {
            console.error('Submission failed, rolling back image uploads...');
            if (axios.isAxiosError(error)) {
                console.error('Error details:', error.response?.data);
            } else {
                console.error('Error details:', error);
            }

            if (uploadedImageUrls.length > 0) {
                try {
                    await deleteImages(uploadedImageUrls);
                } catch (rollbackError) {
                    console.error('Error rolling back image uploads:', rollbackError);
                }
            }
        }
    };

    return {
        ...methods,
        mainImageFile,
        imagesFiles,
        imagesToDelete,
        categoryId,
        mainImageUrl,
        imagesUrl,
        isLoading: methods.formState.isSubmitting || createProduct.isPending || updateProduct.isPending || isUploading,
        onSubmit,
        handleRemoveImage,
        handleSelectCategory,
        benefitFields,
        appendBenefit,
        removeBenefit,
        specFields,
        appendSpec,
        removeSpec,
        faqFields,
        appendFaq,
        removeFaq,
    };
}
