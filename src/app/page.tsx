import BrandContainer from '@/features/brand/BrandContainer';
import { SliderHeroProduct } from '@/features/home/components/SliderHeroProduct';
import Footer from '@/shared/components/common/Footer';
import HeaderHome from '@/features/home/components/HeaderHome';
import LinesProducts from '@/features/home/components/LinesProducts';

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
