import slider from '../assets/images/slider/slider-lg.jpg';
import slider2 from '../assets/images/slider/slider-lg2.jpg';
import slider3 from '../assets/images/slider/slider-lg3.jpg';
import slidermb from '../assets/images/slider/slider-mb.jpg';
import slidermb2 from '../assets/images/slider/slider-mb2.jpg';
import slidermb3 from '../assets/images/slider/slider-mb3.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TabsHome from './TabsHome';



const SwiperSlider = () => {
 
    return (


    <>

<section className='swiperSection'>
<div className='sticky_search_panel'>
  <TabsHome/>
  
  </div>

<div className="swiper-button image-swiper-button-next hide_mobile">
        <IoIosArrowForward />
      </div>

      <div className="swiper-button image-swiper-button-prev hide_mobile">
        <IoIosArrowBack />
      </div>
      <div className='hide_mobile'> 
      <Swiper
         pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled"
        }}

        

        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}

        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
      
      <SwiperSlide>   

          <picture>

      <source media="(max-width:576px)" srcSet={slidermb} />
      <img className='img-fluid' src={slider} alt="Flowers"/>
      </picture>

      </SwiperSlide>
 
      <SwiperSlide>

  <picture>


  <source media="(max-width:576px)" srcSet={slidermb2} />
  <img className='img-fluid' src={slider2} alt="Flowers"/>
</picture>

      </SwiperSlide>

      <SwiperSlide>



  <picture>


  <source media="(max-width:576px)" srcSet={slidermb3} />
  <img className='img-fluid' src={slider3} alt="Flowers"/>
</picture>

      </SwiperSlide>


      </Swiper>
      </div>

      </section>
    </>

  )
}

export default SwiperSlider;