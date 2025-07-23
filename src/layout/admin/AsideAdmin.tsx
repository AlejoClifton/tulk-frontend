'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import classNames from 'classnames';

import { Navegation } from '@/shared/components';
import { BarchartIcon, BuildingIcon, PackageIcon, TagIcon } from '@/assets/SvgContainer';

const AsideAdmin = () => {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    const design = {
        default: 'rounded-md px-4 py-3 transition-all duration-100 flex items-center gap-2',
        active: 'text-orange-01 font-bold bg-orange-01/10',
        inactive: 'text-slate-500 font-medium hover:bg-slate-100',
    };

    const className = (href: string) => {
        return classNames(design.default, isActive(href) ? design.active : design.inactive);
    };

    return (
        <aside className="min-h-screen w-64 border-r border-slate-200 bg-white p-4">
            <Navegation variant="secondary" className="flex flex-col gap-4">
                <Link href="/admin" className={className('/admin')}>
                    <BarchartIcon className="h-6 w-6" />
                    Dashboard
                </Link>
                <Link href="/admin/products" className={className('/admin/products')}>
                    <PackageIcon className="h-6 w-6" />
                    Productos
                </Link>
                <Link href="/admin/categories" className={className('/admin/categories')}>
                    <TagIcon className="h-6 w-6" />
                    Categorías
                </Link>
                <Link href="/admin/branding" className={className('/admin/branding')}>
                    <BuildingIcon className="h-6 w-6" />
                    Marca
                </Link>
            </Navegation>
        </aside>
    );
};

export default AsideAdmin;
