import React from 'react';

import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiAdobephotoshop } from "react-icons/si";
import { FaSass } from "react-icons/fa";
import { BiLogoJquery } from "react-icons/bi";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";

export default function ToolsSlider() {
  return (
    
    

<section className='tools_we_use_section mt-5 mb-5'>

<div className='container'>

<div className='row'>

    <div className='col-12 text-center mt-2'>
      <h2>Stories That Travel With Us</h2>
      
      </div>

    <div className='col-12 mt-5 text-center'>
    <Swiper
      // install Swiper modules
      modules={[Navigation, Autoplay]}
    //spaceBetween={40}
      navigation

      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}

      breakpoints={{ 

        1200: {
          slidesPerView: 4,
        },

        400: {
          slidesPerView: 2,
        },
      }}


    >


      <SwiperSlide><div className='box'> <FaReact/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <FaNodeJs/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <SiMongodb/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <SiAdobephotoshop/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <BiLogoJquery/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <FaSass/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <FaHtml5/> </div></SwiperSlide>
      <SwiperSlide><div className='box'> <FaCss3Alt/> </div></SwiperSlide>

    </Swiper>

    </div>
    </div>

</div>




</section>


  )
}
