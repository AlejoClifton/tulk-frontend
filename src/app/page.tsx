import BrandContainer from '@/components/BrandContainer';
import Footer from '@/components/Footer';
import PointsSales from '@/components/layout/PointsSales';
import Header from '@/features/home/components/Header';
import LinesProducts from '@/features/home/components/LinesProducts';
import { SliderHeroProduct } from '@/features/products/components/SliderHeroProduct';

export default function Home() {
    return (
        <>
            <Header />
            <main className="py-16">
                <SliderHeroProduct />
                <div className="container mx-auto">
                    <LinesProducts />
                </div>
            </main>
            <PointsSales />
            <BrandContainer />
            <Footer />
        </>
    );
}
