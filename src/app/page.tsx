import Image from 'next/image';

import { BrandContactInfo, BrandForm } from '@/modules/brand/components';
import HeaderHome from '@/modules/layout/Header-Home';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <HeaderHome />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-8 flex justify-center">
                        <Image src="/tulk.png" alt="Tulk" width={500} height={250} />
                    </div>

                    <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                        Soluciones Náuticas de Alta Tecnología
                    </h1>
                    <p className="mb-8 text-lg leading-relaxed text-slate-600">
                        Estamos trabajando para ofrecerte lo mejor.
                        <br />
                        Pronto vas a poder explorar nuestros productos.
                    </p>

                    <div className="flex w-full items-center justify-center rounded-lg bg-white px-8 py-8 shadow-lg">
                        <p className="text-sm text-slate-500">Disponible próximamente</p>
                    </div>
                </div>
                <div className="my-8 flex flex-col gap-8 md:flex-row md:justify-center">
                    <BrandForm />
                    <BrandContactInfo />
                </div>
            </main>
        </div>
    );
}
