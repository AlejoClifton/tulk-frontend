import BrandContainer from '@/modules/brand/Brand-Container';
import Footer from '@/modules/layout/Footer';
import HeaderHome from '@/modules/layout/Header-Home';
import LinesProducts from '@/modules/layout/Lines-Products';
import ProductsOutstanding from '@/modules/products/components/Products-Outstanding';
import { SliderHeroProduct } from '@/modules/products/components/Slider-Hero-Product';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <HeaderHome />
            <main className="py-16">
                <SliderHeroProduct />
                <div className="container mx-auto">
                    <LinesProducts />
                </div>
                <ProductsOutstanding />
                <BrandContainer />
            </main>
            <Footer />
        </div>
    );
}
