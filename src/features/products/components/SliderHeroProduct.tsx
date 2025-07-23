'use client';

import Image from 'next/image';

import { Subtitle, Text } from '@/shared/components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
    {
        image: '/products/product-1.png',
        link: '/productos/1',
        title: 'Calefactor Diésel Portátil 8000 watt 12v - Código 9324',
        subtitle:
            'Calentador diesel todo en uno: Potencia del calentador: 8KW; Voltaje nominal: 12 V; Temperatura de trabajo: -40.0 °F - +176.0 °F / 40 - 176 °F',
    },
    {
        image: '/products/product-2.png',
        link: '/productos/2',
        title: 'Calefactor Diésel 5000 W 1 salida',
        subtitle:
            'Este calentador de aire diésel se puede aplicar para calentar la cabina de varios vehículos mecánicos diésel, como automóviles, autobuses, vehículos recreativos, camiones, vehículos de ingeniería, embarcaciones, etc.',
    },
];

export const SliderHeroProduct = () => {
    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            style={
                {
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
            }
            navigation
            className="aspect-[1580/700] w-full overflow-hidden">
            {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                    <a href={slide.link} className="relative block h-full w-full">
                        <Image src={slide.image} alt={slide.title} className="w-full object-contain" fill />
                        <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-6 text-white">
                            <Subtitle variant="lg" color="primary">
                                {slide.title}
                            </Subtitle>
                            <Text size="sm" variant="white" className="mt-2">
                                {slide.subtitle}
                            </Text>
                        </div>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
