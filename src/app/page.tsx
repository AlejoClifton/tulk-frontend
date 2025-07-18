import BrandContainer from '@features/brand/ui/Brand-Container';
import Footer from '@features/layout/Footer';
import HeaderHome from '@features/layout/Header-Home';
import LinesProducts from '@features/layout/Lines-Products';
import ProductsOutstanding from '@/features/products/ui/components/ProductsOutstanding';
import { SliderHeroProduct } from '@/features/products/ui/components/SliderHeroProduct';

export default function Home() {
    return (
        <>
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
        </>
    );
}
