'use client';

import React from 'react';
import { Input, Button, PanelCard, Subtitle, Label, Textarea } from '@/shared/components';
import { useBrandForm } from '@/features/brand/hooks/useBrandForm';

export const BrandForm = () => {
    const { form, loading, handleChange, handleSubmit } = useBrandForm();

    return (
        <PanelCard className="w-full md:w-[31.25rem]">
            <Subtitle variant="lg" className="mb-8">
                Consulta técnica
            </Subtitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} suppressHydrationWarning={true}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label>Nombre</Label>
                        <Input name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Teléfono</Label>
                        <Input name="phone" placeholder="Tu teléfono" value={form.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Email</Label>
                    <Input name="email" placeholder="Tu email" value={form.email} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Mensaje</Label>
                    <Textarea name="message" placeholder="Tu mensaje" value={form.message} onChange={handleChange} />
                </div>
                <Button size="lg" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </Button>
            </form>
        </PanelCard>
    );
};
