"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";

export default function Carrousel() {
  return (
    <Swiper spaceBetween={50} slidesPerView={1} className="w-full h-1/2">
      <SwiperSlide>
        <div className="w-full h-full bg-accent rounded-xl flex justify-center items-center relative overflow-hidden">
          <h1 className="text-xl font-bold text-white p-4 text-center">
            Discover the latest trends in fashion and accessories! Shop now and
            elevate your style with our exclusive collection. Don't miss out on
            the hottest deals of the season!
          </h1>
          <Link href={"/shop"} className="absolute bottom-4 left-4">
            <p> Check all our last Deals</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full bg-blue-500 rounded-xl flex justify-center items-center relative overflow-hidden">
          <h1 className="text-xl font-bold text-white p-4 text-center">
            Explore our new arrivals and find the perfect outfit for any
            occasion. Shop today and enjoy exclusive discounts!
          </h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full bg-green-500 rounded-xl flex justify-center items-center relative overflow-hidden">
          <h1 className="text-xl font-bold text-white p-4 text-center">
            Upgrade your wardrobe with our premium collection. Limited-time
            offers available now!
          </h1>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
