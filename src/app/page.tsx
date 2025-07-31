import BrandContainer from '@/features/brand/BrandContainer';
import HeaderHome from '@/features/home/components/HeaderHome';
import LinesProducts from '@/features/home/components/LinesProducts';
import { SliderHeroProduct } from '@/features/home/components/SliderHeroProduct';
import Footer from '@/shared/components/common/Footer';

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
