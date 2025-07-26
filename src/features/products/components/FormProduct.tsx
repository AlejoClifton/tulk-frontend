import React from 'react';

import SelectListCategories from '@/features/categories/components/SelectListCategories';
import { useProductForm } from '@/features/products/hooks/useProductForm';
import type { ProductInterface } from '@/modules/products/domain/product.entity';
import { Input, Button, Textarea, Label, ImageFileInput, ImagePreviewList } from '@/shared/components';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

interface FormProductProps {
    product: ProductInterface;
    onClose: () => void;
}

export const FormProduct = ({ product, onClose }: FormProductProps) => {
    const {
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
        mainImageUrl,
        imagesUrl,
        isLoading,
    } = useProductForm(product, onClose);

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label>Nombre</Label>
                    <Input {...register('name', { required: true })} placeholder="Nombre del producto" />
                    {errors.name && <span className="text-sm text-red-500">Requerido</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Categoría</Label>
                    <SelectListCategories onSelect={handleSelectCategory} selectedValue={categoryId} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>Descripción</Label>
                <Textarea {...register('description', { required: true })} placeholder="Descripción" />
                {errors.description && <span className="text-sm text-red-500">Requerido</span>}
            </div>

            <div className="flex flex-col gap-2">
                <Label>Imagen principal</Label>
                <ImageFileInput
                    multiple={false}
                    maxFiles={1}
                    onChange={(files) => setValue('mainImageFile', files && files[0] ? files[0] : null)}
                    label="Selecciona o arrastra la imagen principal"
                />
                <ImagePreviewList
                    files={mainImageFile ? [mainImageFile] : []}
                    urls={mainImageUrl ? [mainImageUrl] : []}
                    onRemoveImage={() => handleRemoveImage('main', 0)}
                    className="w-75"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Imágenes secundarias</Label>
                <ImageFileInput
                    multiple={true}
                    maxFiles={6}
                    onChange={(files) =>
                        setValue('imagesFiles', Array.isArray(files) ? files : files ? Array.from(files) : [])
                    }
                    label="Selecciona o arrastra imágenes secundarias"
                />
                <ImagePreviewList
                    files={imagesFiles || []}
                    urls={imagesUrl || []}
                    onRemoveImage={(index) => handleRemoveImage('secondary', index)}
                />
            </div>

            <Label className="mt-2 flex items-center gap-2">
                <Input type="checkbox" {...register('isActive')} className="checkbox" />
                Activo
            </Label>

            <div className="flex justify-end gap-4">
                <Button variant="error" onClick={onClose} type="button" size="md">
                    Cancelar
                </Button>
                <Button variant={isLoading ? 'loading' : 'default'} type="submit" disabled={isLoading} size="md">
                    {isLoading ? <LoadingSpinner /> : 'Guardar cambios'}
                </Button>
            </div>
        </form>
    );
};
