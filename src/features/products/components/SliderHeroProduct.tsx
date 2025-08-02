'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Subtitle, Text } from '@/components';
import { getAllProductsQueryOptions } from '@/features/products/hooks/queries/getAllProducts.query-option';
import { ProductInterface } from '@/features/products/interfaces/product.interface';

export const SliderHeroProduct = () => {
    const { data: products = [] } = useSuspenseQuery<ProductInterface[]>(getAllProductsQueryOptions);

    const activeProducts: ProductInterface[] = products.filter((prod: ProductInterface) => prod.isActive);

    if (activeProducts.length === 0) return null;

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
            {activeProducts.map((slide, idx) => (
                <SwiperSlide key={idx}>
                    <a href={`/products/${slide.id}`} className="relative block h-full w-full">
                        <Image
                            src={slide.mainImageUrl}
                            alt={slide.name}
                            className="w-full object-contain"
                            fill
                            priority
                        />
                        <div className="inset-0 hidden flex-col justify-end bg-black/40 p-6 text-white md:absolute md:flex">
                            <Subtitle variant="lg" color="primary">
                                {slide.name}
                            </Subtitle>
                            <Text size="sm" variant="white" className="mt-2">
                                {slide.description}
                            </Text>
                        </div>
                    </a>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
