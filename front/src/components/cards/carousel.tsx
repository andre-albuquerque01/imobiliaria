/* eslint-disable prettier/prettier */
'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'

export default function Carousel({ images }: { images: string[] }) {
    if (!images || images.length === 0) return null

    return (
        <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-lg overflow-hidden w-full h-80"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={image}
                        width={800}
                        height={500}
                        alt="Imagem do imóvel"
                        className="w-full h-80 object-cover rounded-lg"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
