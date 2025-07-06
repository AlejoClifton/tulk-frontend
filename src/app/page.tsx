import HeaderHome from '@/modules/layout/Header-Home';
import BrandContainer from '@/modules/brand/Brand-Container';
import { SliderHeroProduct } from '@/modules/products/components/Slider-Hero-Product';
import Footer from '@/modules/layout/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <HeaderHome />
            <main className="container mx-auto py-16">
                <SliderHeroProduct />
                <BrandContainer />
            </main>
            <Footer />
        </div>
    );
}
