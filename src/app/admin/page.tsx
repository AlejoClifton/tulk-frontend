'use client';
import React from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { BarchartIcon, PackageIcon, PlusIcon, TagIcon } from '@/assets/SvgContainer';
import { getAllCategoriesQueryOptions } from '@/modules/categories/application/getAllCategories.query-option';
import { getAllProductsQueryOptions } from '@/modules/products/application/getAllProducts.query-option';
import { Button, Subtitle, Text } from '@/shared/components/ui';

const Admin = () => {
    const router = useRouter();
    const { data: products } = useSuspenseQuery(getAllProductsQueryOptions);
    const { data: categories } = useSuspenseQuery(getAllCategoriesQueryOptions);

    const handleRedirect = (path: string) => {
        router.push(path);
    };

    return (
        <main className="ml-64 flex h-full min-h-screen flex-1 flex-col gap-8 bg-slate-100 p-8">
            <Subtitle variant="lg">Bienvenido al panel de administración</Subtitle>
            <div className="flex w-full flex-row justify-between gap-4">
                <div className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-white p-8 shadow-lg">
                    <PackageIcon className="h-15 w-15 rounded-2xl bg-orange-01/10 p-3 text-orange-01" />
                    <div className="flex flex-col gap-2">
                        <Text variant="secondary" size="sm" weight="semibold">
                            Total de productos
                        </Text>
                        <Text variant="secondary" size="4xl" weight="semibold">
                            {products?.length}
                        </Text>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-white p-8 shadow-lg">
                    <BarchartIcon className="h-15 w-15 rounded-2xl bg-success/10 p-3 text-success" />
                    <div className="flex flex-col gap-2">
                        <Text variant="secondary" size="sm" weight="semibold">
                            Productos activos
                        </Text>
                        <Text variant="success" size="4xl" weight="semibold">
                            {products?.filter((product) => product.isActive).length}
                        </Text>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-4 rounded-2xl bg-white p-8 shadow-lg">
                    <TagIcon className="h-15 w-15 rounded-2xl bg-blue-600/10 p-3 text-blue-600" />
                    <div className="flex flex-col gap-2">
                        <Text variant="secondary" size="sm" weight="semibold">
                            Total de categorías
                        </Text>
                        <Text variant="blue" size="4xl" weight="semibold">
                            {categories?.length}
                        </Text>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
                <Subtitle variant="lg">Acciones rápidas</Subtitle>
                <div className="flex w-full flex-row gap-4">
                    <Button
                        onClick={() => handleRedirect('/admin/products')}
                        className="flex w-full flex-1 items-center justify-center gap-3 px-6 py-4">
                        <PlusIcon className="h-5 w-5" />
                        Nuevo Producto
                    </Button>
                    <Button
                        onClick={() => handleRedirect('/admin/categories')}
                        variant="blue"
                        className="flex w-full flex-1 items-center justify-center gap-3 px-6 py-4">
                        <PlusIcon className="h-5 w-5" />
                        Nueva Categoría
                    </Button>
                    <Button
                        onClick={() => handleRedirect('/admin/branding')}
                        variant="gray"
                        className="flex w-full flex-1 items-center justify-center gap-3 px-6 py-4">
                        <TagIcon className="h-5 w-5" />
                        Configurar Marca
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Admin;
