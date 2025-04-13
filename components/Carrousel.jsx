"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import { images } from "../constants/Images";

export default function Carrousel() {
  return (
    <Swiper spaceBetween={50} slidesPerView={1} className="w-full h-full">
      <SwiperSlide>
        <div className="w-full h-full bg-accent rounded-xl flex justify-center items-center relative overflow-hidden">
          <Image
            src={images.Landing2}
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            className="absolute"
          />
          <Link
            href={"/shop"}
            className="absolute bottom-8 right-8 w-fit bg-primary p-4 rounded-2xl text-white font-bold hover:bg-accent transition duration-300"
          >
            <p>Explore all our last Deals in all products</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full bg-accent rounded-xl flex justify-center items-center relative overflow-hidden">
          <Image
            src={images.Landing2}
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            className="absolute"
          />
          <Link
            href={"/shop/electronics"}
            className="absolute bottom-8 right-8 w-fit bg-primary p-4 rounded-2xl text-white font-bold hover:bg-accent transition duration-300"
          >
            <p>Explore all our last Deals in electronics</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full bg-accent rounded-xl flex justify-center items-center relative overflow-hidden">
          <Image
            src={images.Landing1}
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            className="absolute"
          />
          <Link
            href={"/shop/women's clothing"}
            className="absolute bottom-8 right-8 w-fit bg-primary p-4 rounded-2xl text-white font-bold hover:bg-accent transition duration-300"
          >
            <p>Explore all our last Deals in women's clothing</p>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-full bg-accent rounded-xl flex justify-center items-center relative overflow-hidden">
          <Image
            src={images.Landing3}
            alt="Landing Image"
            layout="fill"
            objectFit="cover"
            className="absolute"
          />
          <Link
            href={"/shop/men's clothing"}
            className="absolute bottom-8 right-8 w-fit bg-primary p-4 rounded-2xl text-white font-bold hover:bg-accent transition duration-300"
          >
            <p>Explore all our last Deals in men's clothing</p>
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
