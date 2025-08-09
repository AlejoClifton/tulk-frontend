import { Suspense } from 'react';

import { LoadingSpinner } from '@/components';
import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import Header from '@/components/layout/Header';
import PointsSales from '@/components/layout/PointsSales';
import HomeGate from '@/features/home/components/HomeGate';
import LinesProducts from '@/features/home/components/LinesProducts';
import { SliderHeroProduct } from '@/features/products/components/SliderHeroProduct';

export const dynamic = 'force-dynamic';

export default async function Home() {
    return (
        <>
            <HomeGate>
                <Header />
                <main className="py-16">
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center py-16">
                                <LoadingSpinner size={48} label="Cargando productos destacados..." />
                            </div>
                        }>
                        <SliderHeroProduct />
                    </Suspense>
                    <div className="container mx-auto">
                        <Suspense
                            fallback={
                                <div className="flex items-center justify-center py-16">
                                    <LoadingSpinner size={48} label="Cargando productos..." />
                                </div>
                            }>
                            <LinesProducts />
                        </Suspense>
                    </div>
                </main>
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-16">
                            <LoadingSpinner size={48} label="Cargando puntos de venta..." />
                        </div>
                    }>
                    <PointsSales />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center py-16">
                            <LoadingSpinner size={48} label="Cargando información de marca..." />
                        </div>
                    }>
                    <BrandContainer />
                </Suspense>
                <Footer />
            </HomeGate>
        </>
    );
}
