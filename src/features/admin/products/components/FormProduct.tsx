import React from 'react';

import { FormProvider } from 'react-hook-form';

import { TrashIcon } from '@/assets/SvgContainer';
import SelectListCategories from '@/features/admin/categories/components/SelectListCategories';
import { SpecificationGroupFields } from '@/features/admin/products/components/SpecificationGroupFields';
import { useProductForm } from '@/features/admin/products/hooks/useProductForm';
import type { ProductInterface } from '@/modules/products/domain/product.entity';
import { Button, ImageFileInput, ImagePreviewList, Input, Label, Textarea } from '@/shared/components';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

interface FormProductProps {
    product: ProductInterface;
    onClose: () => void;
}

export const FormProduct = ({ product, onClose }: FormProductProps) => {
    const methods = useProductForm(product, onClose);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(methods.onSubmit)}
                encType="multipart/form-data"
                className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Nombre</Label>
                        <Input {...methods.register('name', { required: true })} placeholder="Nombre del producto" />
                        {methods.formState.errors.name && <span className="text-sm text-red-500">Requerido</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Categoría</Label>
                        <SelectListCategories
                            onSelect={methods.handleSelectCategory}
                            selectedValue={methods.categoryId}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Descripción</Label>
                    <Textarea {...methods.register('description', { required: true })} placeholder="Descripción" />
                    {methods.formState.errors.description && <span className="text-sm text-red-500">Requerido</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Imagen principal</Label>
                    <ImageFileInput
                        multiple={false}
                        maxFiles={1}
                        onChange={(files) => methods.setValue('mainImageFile', files && files[0] ? files[0] : null)}
                        label="Selecciona o arrastra la imagen principal"
                    />
                    <ImagePreviewList
                        files={methods.mainImageFile ? [methods.mainImageFile] : []}
                        urls={methods.mainImageUrl ? [methods.mainImageUrl] : []}
                        onRemoveImage={() => methods.handleRemoveImage('main', 0)}
                        className="w-75"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Imágenes secundarias</Label>
                    <ImageFileInput
                        multiple={true}
                        maxFiles={6}
                        onChange={(files) =>
                            methods.setValue(
                                'imagesFiles',
                                Array.isArray(files) ? files : files ? Array.from(files) : [],
                            )
                        }
                        label="Selecciona o arrastra imágenes secundarias"
                    />
                    <ImagePreviewList
                        files={methods.imagesFiles || []}
                        urls={methods.imagesUrl || []}
                        onRemoveImage={(index) => methods.handleRemoveImage('secondary', index)}
                    />
                </div>

                <div className="flex flex-col gap-4 rounded-md">
                    <Label>Beneficios</Label>
                    <div className="flex flex-col gap-4 rounded-md border border-gray-300 p-4">
                        {methods.benefitFields.map((field, index) => (
                            <div key={field.id} className="flex flex-row items-center gap-2">
                                <Input
                                    {...methods.register(`benefits.${index}.value` as const)}
                                    placeholder="Beneficio"
                                />
                                <Button
                                    type="button"
                                    variant="error"
                                    onClick={() => methods.removeBenefit(index)}
                                    size="icon">
                                    <TrashIcon name="close" className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => methods.appendBenefit({ value: '' })} size="md">
                            Añadir Beneficio
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Label>Especificaciones Técnicas</Label>
                    <div className="flex flex-col gap-4 rounded-md border border-gray-300 p-4">
                        {methods.specFields.map((field, index) => (
                            <SpecificationGroupFields
                                key={field.id}
                                groupIndex={index}
                                removeGroup={methods.removeSpec}
                            />
                        ))}
                        <Button
                            type="button"
                            onClick={() => methods.appendSpec({ title: '', specifications: [{ key: '', value: '' }] })}
                            size="md">
                            Añadir Grupo de Especificaciones
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Label>Preguntas Frecuentes</Label>
                    <div className="flex flex-col gap-4 rounded-md border border-gray-300 p-4">
                        {methods.faqFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <Input
                                    {...methods.register(`faq.${index}.question`)}
                                    placeholder="Pregunta"
                                    className="font-semibold"
                                />
                                <Textarea {...methods.register(`faq.${index}.answer`)} placeholder="Respuesta" />
                                <Button
                                    type="button"
                                    variant="error"
                                    onClick={() => methods.removeFaq(index)}
                                    className="self-end"
                                    size="md">
                                    Eliminar Pregunta
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={() => methods.appendFaq({ question: '', answer: '' })} size="md">
                            Añadir Pregunta
                        </Button>
                    </div>
                </div>

                <Label className="mt-2 flex items-center gap-2">
                    <Input type="checkbox" {...methods.register('isActive')} className="checkbox" />
                    Activo
                </Label>
                <div className="flex justify-end gap-4">
                    <Button variant="error" onClick={onClose} type="button" size="md">
                        Cancelar
                    </Button>
                    <Button
                        variant={methods.isLoading ? 'loading' : 'default'}
                        type="submit"
                        disabled={methods.isLoading}
                        size="md">
                        {methods.isLoading ? <LoadingSpinner /> : 'Guardar cambios'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
