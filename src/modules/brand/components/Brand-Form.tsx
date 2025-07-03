'use client';

import React from 'react';
import { Input, Button, PanelCard, Subtitle } from '@/shared/components';
import { useBrandForm } from '@modules/brand/hooks/useBrandForm';

export const BrandForm = () => {
    const { form, loading, handleChange, handleSubmit } = useBrandForm();

    return (
        <PanelCard className="w-full md:w-[31.25rem]">
            <Subtitle variant="lg" className="mb-8">
                Consulta técnica
            </Subtitle>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                        label="Nombre"
                        name="name"
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <Input
                        label="Teléfono"
                        name="phone"
                        placeholder="Tu teléfono"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>
                <Input
                    label="Email"
                    name="email"
                    placeholder="Tu email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <Input
                    label="Mensaje"
                    name="message"
                    placeholder="Tu mensaje"
                    type="textarea"
                    value={form.message}
                    onChange={handleChange}
                />
                <Button size="lg" type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </Button>
            </form>
        </PanelCard>
    );
};
