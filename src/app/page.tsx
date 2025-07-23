import BrandContainer from '@/features/brand/Brand-Container';
import Footer from '@/layout/Footer';
import HeaderHome from '@/layout/home/HeaderHome';
import LinesProducts from '@/layout/home/LinesProducts';
import ProductsOutstanding from '@/features/products/components/ProductsOutstanding';
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
                <ProductsOutstanding />
                <BrandContainer />
            </main>
            <Footer />
        </>
    );
}
