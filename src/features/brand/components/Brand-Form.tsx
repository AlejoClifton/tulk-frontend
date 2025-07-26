'use client';

import React, { useEffect, useState } from 'react';

import { Brand } from '@/modules/brand/domain/brand.entity';
import { Input, Button, Subtitle, Label, Textarea } from '@/shared/components/ui';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { PanelCard } from '@/shared/components';
import { UuidValueObject } from '@/shared/value-objects/uuid.vo';
import { useGetBrand } from '@/features/brand/hooks/useGetBrand';
import { useBrandMutations } from '@/features/brand/hooks/useBrandMutations';

export const BrandForm = () => {
    const { brand, isLoading } = useGetBrand();
    const { updateBrand } = useBrandMutations();
    const [form, setForm] = useState<Brand | null>(null);

    useEffect(() => {
        if (brand) {
            setForm(brand);
        }
    }, [brand]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!form) return;
        const { name, value } = e.target;
        if (name === 'hours') {
            setForm({ ...form, [name]: value.split(',') });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        const brandToUpdate = new Brand(
            UuidValueObject.create(form.id.toString()),
            form.name,
            form.description,
            form.image,
            form.email,
            form.phone,
            form.address,
            form.addressLink,
            form.hours,
        );

        updateBrand.mutate(brandToUpdate);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!form) {
        return <p>No se encontró la información de la marca.</p>;
    }

    return (
        <PanelCard className="w-full">
            <Subtitle variant="lg" className="mb-8">
                Información de la Marca
            </Subtitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} suppressHydrationWarning={true}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Nombre</Label>
                        <Input name="name" placeholder="Nombre de la marca" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input
                            name="email"
                            placeholder="Email de contacto"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Teléfono</Label>
                        <Input
                            name="phone"
                            placeholder="Teléfono de contacto"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Dirección</Label>
                        <Input name="address" placeholder="Dirección" value={form.address} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Link de Dirección (Google Maps)</Label>
                    <Input
                        name="addressLink"
                        placeholder="URL de Google Maps"
                        value={form.addressLink}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Descripción</Label>
                    <Textarea
                        name="description"
                        placeholder="Descripción de la marca"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Horarios (separados por comas)</Label>
                    {/* <Input
                        name="hours"
                        placeholder="Lunes a Viernes: 9-18, ..."
                        value={form.hours.join(',')}
                        onChange={handleChange}
                    /> */}
                </div>
                <div className="flex flex-col gap-2">
                    <Label>URL de la Imagen</Label>
                    <Input
                        name="image"
                        placeholder="URL del logo o imagen"
                        value={form.image}
                        onChange={handleChange}
                    />
                </div>
                <Button size="lg" type="submit" disabled={isLoading}>
                    {isLoading ? 'Actualizando...' : 'Actualizar Información'}
                </Button>
            </form>
        </PanelCard>
    );
};
