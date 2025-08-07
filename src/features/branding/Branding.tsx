import { Subtitle } from '@/components';
import { BrandEditForm } from '@/features/branding/components/BrandEditForm';

const Branding = () => {
    return (
        <main className="flex h-full flex-col gap-8 bg-slate-100 p-4 lg:ml-64 lg:p-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <Subtitle variant="lg">Marca</Subtitle>
                </div>
                <BrandEditForm />
            </div>
        </main>
    );
};

export default Branding;
