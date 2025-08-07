'use client';
import React from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BarchartIcon, BuildingIcon, PackageIcon, TagIcon } from '@/assets/SvgContainer';
import { Navegation } from '@/components';
import Logout from '@/features/admin/components/Logout';
import { trackUmamiEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analyticsEvents';

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
        <aside className="fixed top-0 left-0 z-40 hidden h-full w-full max-w-64 flex-col justify-between border-r border-slate-200 bg-white p-4 lg:flex">
            <Navegation variant="secondary" className="mt-15 flex flex-col gap-4">
                <Link
                    href="/admin"
                    className={className('/admin')}
                    onClick={() => trackUmamiEvent(ANALYTICS_EVENTS.NAVIGATE_TO_ADMIN)}>
                    <BarchartIcon className="h-6 w-6" />
                    Dashboard
                </Link>
                <Link
                    href="/admin/products"
                    className={className('/admin/products')}
                    onClick={() => trackUmamiEvent(ANALYTICS_EVENTS.NAVIGATE_TO_PRODUCTS)}>
                    <PackageIcon className="h-6 w-6" />
                    Productos
                </Link>
                <Link
                    href="/admin/categories"
                    className={className('/admin/categories')}
                    onClick={() => trackUmamiEvent(ANALYTICS_EVENTS.NAVIGATE_TO_CATEGORIES)}>
                    <TagIcon className="h-6 w-6" />
                    Categorías
                </Link>
                <Link
                    href="/admin/branding"
                    className={className('/admin/branding')}
                    onClick={() => trackUmamiEvent(ANALYTICS_EVENTS.NAVIGATE_TO_BRANDING)}>
                    <BuildingIcon className="h-6 w-6" />
                    Marca
                </Link>
            </Navegation>
            <Logout />
        </aside>
    );
};

export default AsideAdmin;
