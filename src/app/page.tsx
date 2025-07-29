import BrandContainer from '@/features/brand/Brand-Container';
import { SliderHeroProduct } from '@/features/products/components/SliderHeroProduct';
import Footer from '@/layout/Footer';
import HeaderHome from '@/layout/home/HeaderHome';
import LinesProducts from '@/layout/home/LinesProducts';

export default function Home() {
    return (
        <>
            <HeaderHome />
            <main className="py-16">
                <SliderHeroProduct />
                <div className="container mx-auto">
                    <LinesProducts />
                </div>
            </main>
            <BrandContainer />
            <Footer />
        </>
    );
}
