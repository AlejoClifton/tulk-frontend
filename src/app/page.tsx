import BrandContainer from '@features/brand/ui/Brand-Container';
import Footer from '@features/layout/Footer';
import HeaderHome from '@features/layout/Header-Home';
import LinesProducts from '@features/layout/Lines-Products';
import ProductsOutstanding from '@features/products/components/Products-Outstanding';
import { SliderHeroProduct } from '@features/products/components/Slider-Hero-Product';

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
