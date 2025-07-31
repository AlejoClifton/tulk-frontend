'use client';

import React from 'react';

import { useContactForm } from '@/features/brand/hooks/useContactForm';
import { Input, Button, Subtitle, Label, Textarea } from '@/shared/components';

export const BrandContactForm = () => {
    const { form, loading, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="w-full rounded-2xl bg-white/10 p-8 backdrop-blur-sm md:w-[31.25rem]">
            <Subtitle variant="lg" className="mb-8 text-white">
                Consulta Técnica
            </Subtitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit} suppressHydrationWarning={true}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label className="text-white">Nombre</Label>
                        <Input name="name" placeholder="Tu nombre" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-white">Teléfono</Label>
                        <Input name="phone" placeholder="Tu teléfono" value={form.phone} onChange={handleChange} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-white">Email</Label>
                    <Input name="email" placeholder="Tu email" value={form.email} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className="text-white">Describe tu consulta técnica</Label>
                    <Textarea name="message" placeholder="Tu mensaje" value={form.message} onChange={handleChange} />
                </div>
                <Button size="lg" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </Button>
            </form>
        </div>
    );
};
