import MainLayout from '../components/MainLayout';
import TravelDealCard from '../components/TravelDealCard';
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PriceRangeSlider from '../components/controls/PriceRangeslider';
import SearchDestination from '../components/controls/SearchDestination';

import slider from '../assets/images/slider/slider-lg.jpg';
import slider2 from '../assets/images/slider/slider-lg2.jpg';
import slider3 from '../assets/images/slider/slider-lg3.jpg';
import slidermb from '../assets/images/slider/slider-mb.jpg';
import slidermb2 from '../assets/images/slider/slider-mb2.jpg';
import slidermb3 from '../assets/images/slider/slider-mb3.jpg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaPlane, FaBed, FaUmbrellaBeach } from "react-icons/fa";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function Holidays() {
  const [holidayDestination, setHolidayDestination] = useState({
    city: "Search",
    country: "country"
  });

  const location = useLocation();
  const navigate = useNavigate();


  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([100, 2000]);



  // Fetch deals
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(`${API_BASE}/holiday-deals`);
        setDeals(res.data || []);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  // Filter deals (by price + city/country)
  const filteredDeals = useMemo(() => {
    return deals.filter(
      (deal) =>
        deal.price >= priceRange[0] &&
        deal.price <= priceRange[1] &&
        (holidayDestination.city === "Search" || deal.city === holidayDestination.city) &&
        (holidayDestination.country === "country" || deal.country === holidayDestination.country)
    );
  }, [deals, priceRange, holidayDestination]);

  const getActiveKey = () => {
    if (location.pathname === "/flights") return "flights";
    if (location.pathname === "/hotels") return "hotels";
    if (location.pathname === "/holidays") return "holidays";
    return "flights";
  };



  return (
    <MainLayout>
      {/* Swiper + Search */}
      <section className='swiperSection'>
        <div className='sticky_search_panel'>
          <div className="container search_panel_block">
      
            <Tabs activeKey={getActiveKey()} onSelect={(k) => navigate(`/${k}`)}>
              <Tab eventKey="flights" title={<span><FaPlane /> Flights</span>} />
              <Tab eventKey="hotels" title={<span><FaBed /> Hotels</span>} />
              <Tab eventKey="holidays" title={<span><FaUmbrellaBeach /> Holidays</span>}>
                
                <div className='field_section'> 
                  <div className='row g-0 align-items-center'>    
                    {/* Search Destination */}
                    <div className='col-lg-6 position-relative'>
                      <SearchDestination 
                        id="searchdestination"
                        source="Destination"
                        city={holidayDestination.city}
                        country={holidayDestination.country}
                        styleCss="field_box"
                        onSelect={setHolidayDestination}
                      />
                    </div>
                    {/* Price Range */}
                    <div className='col-lg-6 position-relative'>
                      <PriceRangeSlider
                        source="Price"
                        min={100}
                        max={2000}
                        defaultValue={[100, 2000]}
                        onChange={setPriceRange}
                      />
                    </div>
                  </div>
                </div>
              </Tab>
              
            </Tabs>
          </div>
        </div>

        {/* Swiper navigation */}
        <div className="swiper-button image-swiper-button-next hide_mobile" aria-label="Next Slide">
          <IoIosArrowForward />
        </div>
        <div className="swiper-button image-swiper-button-prev hide_mobile" aria-label="Previous Slide">
          <IoIosArrowBack />
        </div>

        <div className='hide_mobile'> 
          <Swiper
            pagination={{ dynamicBullets: true, clickable: true }}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled"
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
         
            <SwiperSlide>
              <picture>
                <source media="(max-width:576px)" srcSet={slidermb2} />
                <img className='img-fluid' src={slider2} alt="Holiday destination" />
              </picture>
            </SwiperSlide>

            <SwiperSlide>
              <picture>
                <source media="(max-width:576px)" srcSet={slidermb} />
                <img className='img-fluid' src={slider} alt="Holiday destination" />
              </picture>
            </SwiperSlide>
            
            <SwiperSlide>
              <picture>
                <source media="(max-width:576px)" srcSet={slidermb3} />
                <img className='img-fluid' src={slider3} alt="Holiday destination" />
              </picture>
            </SwiperSlide>

          </Swiper>
        </div>
      </section>

      {/* Deals Section */}
      <div className="feautured_flight_deals mt-5 mb-4">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading deals...</p>
            </div>
          ) : filteredDeals.length === 0 ? (
            <div className="text-center py-5">
              No holiday packages found for your selection.
            </div>
          ) : (
            <div className="row">
              {filteredDeals.map((deal) => (
                <div className="col-lg-4 mb-4" key={deal._id}>
                  <Link
                    to={`/holiday-deals/${deal._id}/${deal.city.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-decoration-none"
                  >
                    <TravelDealCard
                      price={deal.price}
                      city={deal.city}
                      noOfDays={deal.noOfDays}
                      title={deal.title}
                      shortDes={deal.shortDes}
                      thumbnail={`${IMAGE_BASE}${deal.thumbnail}`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
