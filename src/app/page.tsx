import Footer from '@/components/Footer';
import BrandContainer from '@/features/branding/BrandContainer';
import HeaderHome from '@/features/home/components/HeaderHome';
import LinesProducts from '@/features/home/components/LinesProducts';
import { SliderHeroProduct } from '@/features/products/components/SliderHeroProduct';

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
