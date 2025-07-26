import React from 'react';

import Image from 'next/image';

import { Button, PanelCard, Subtitle, Text } from '@/shared/components';

const ProductsOutstanding = () => {
    return (
        <div id="products" className="my-16 flex flex-col gap-8 rounded-2xl bg-slate-50 py-16">
            <div className="flex flex-col items-center gap-4">
                <Subtitle variant="xl">Productos Destacados</Subtitle>
                <Text size="xl" variant="secondary" className="max-w-xl text-center">
                    Conoce nuestros productos más solicitados con especificaciones técnicas completas.
                </Text>
            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <PanelCard variant="product" className="bg-white">
                    <div className="relative aspect-[1/1] h-[12.5rem] w-full overflow-hidden rounded-t-2xl border-t-1 border-gray-200 bg-slate-100">
                        <Image
                            src="/products/product-ej-01.png"
                            alt="Product 1"
                            className="w-full object-contain"
                            fill
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded-b-2xl bg-white p-6">
                        <Subtitle variant="lg">Calefactor Diesel 5000 W - 1 Salida</Subtitle>
                        <Text variant="secondary">
                            Solución eficiente y económica para calefaccionar espacios amplios
                        </Text>
                        <div className="flex flex-col gap-4">
                            <Button variant="default">Ver detalles</Button>
                        </div>
                    </div>
                </PanelCard>
                <PanelCard variant="product" className="bg-white">
                    <div className="relative aspect-[1/1] h-[12.5rem] w-full overflow-hidden rounded-t-2xl border-t-1 border-gray-200 bg-slate-100">
                        <Image
                            src="/products/product-ej-01.png"
                            alt="Product 1"
                            className="w-full object-contain"
                            fill
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded-b-2xl bg-white p-6">
                        <Subtitle variant="lg">Calefactor Diesel 5000 W - 1 Salida</Subtitle>
                        <Text variant="secondary">
                            Solución eficiente y económica para calefaccionar espacios amplios
                        </Text>
                        <div className="flex flex-col gap-4">
                            <Button variant="default">Ver detalles</Button>
                        </div>
                    </div>
                </PanelCard>
                <PanelCard variant="product" className="bg-white">
                    <div className="relative aspect-[1/1] h-[12.5rem] w-full overflow-hidden rounded-t-2xl border-t-1 border-gray-200 bg-slate-100">
                        <Image
                            src="/products/product-ej-01.png"
                            alt="Product 1"
                            className="w-full object-contain"
                            fill
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded-b-2xl bg-white p-6">
                        <Subtitle variant="lg">Calefactor Diesel 5000 W - 1 Salida</Subtitle>
                        <Text variant="secondary">
                            Solución eficiente y económica para calefaccionar espacios amplios
                        </Text>
                        <div className="flex flex-col gap-4">
                            <Button variant="default">Ver detalles</Button>
                        </div>
                    </div>
                </PanelCard>
            </div>
        </div>
    );
};

export default ProductsOutstanding;
