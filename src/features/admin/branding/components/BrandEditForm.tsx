'use client';

import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useBrandForm } from '@/features/admin/branding/hooks/useBrandForm';
import { getBrandQueryOptions } from '@/modules/brand/application/getBrand.query-option';
import {
    Input,
    Button,
    PanelCard,
    Subtitle,
    Label,
    Textarea,
    ImageFileInput,
    ImagePreviewList,
} from '@/shared/components';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';

export const BrandEditForm = () => {
    const { data: brand, isLoading: isBrandLoading } = useSuspenseQuery(getBrandQueryOptions);
    const {
        register,
        handleSubmit,
        errors,
        imageFile,
        imageUrl,
        isLoading: isUpdating,
        onSubmit,
        handleImageChange,
        handleRemoveImage,
    } = useBrandForm(brand || null);

    if (isBrandLoading) return <LoadingSpinner />;
    if (!brand) return <p>No se encontró la información de la marca.</p>;

    return (
        <PanelCard className="w-full">
            <Subtitle variant="lg" className="mb-8">
                Información de la Marca
            </Subtitle>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Nombre</Label>
                        <Input {...register('name')} />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input {...register('email')} type="email" />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Teléfono</Label>
                        <Input {...register('phone')} />
                        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Dirección</Label>
                        <Input {...register('address')} />
                        {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Descripción</Label>
                    <Textarea {...register('description')} />
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Link de Dirección (Google Maps)</Label>
                    <Input {...register('addressLink')} />
                    {errors.addressLink && <span className="text-red-500">{errors.addressLink.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Horarios (separados por comas)</Label>
                    <Input {...register('hours')} />
                    {errors.hours && <span className="text-red-500">{errors.hours.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Imagen de la Marca</Label>
                    <ImageFileInput onChange={handleImageChange} />
                    <ImagePreviewList
                        files={imageFile ? [imageFile] : []}
                        urls={imageUrl ? [imageUrl] : []}
                        onRemoveImage={handleRemoveImage}
                        className="w-100"
                    />
                </div>
                <Button size="lg" type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Actualizando...' : 'Actualizar Información'}
                </Button>
            </form>
        </PanelCard>
    );
};
