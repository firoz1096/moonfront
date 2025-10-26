import React from "react";
import { Route } from "react-router-dom";
import App from "../App";
import FlightBookingForm from "../pages/FlightBookingForm";
import HotelBookingForm from "../pages/HotelBookingForm";
import FlightDealDetails from "../pages/FlightDealDetails";
import RtBookingForm from "../pages/RtBookingForm";
import DealsByRegion from "../pages/DealsByRegion";
import Holidays from "../pages/Holidays";
import HolidayDealDetails from "../pages/HolidayDealDetails";
import UmrahPackages from "../pages/UmrahPackages";
import UmrahDetails from "../pages/UmrahDetails";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import ContactUs from "../pages/ContactUs";
import TermConditions from "../pages/TermConditions";
import AboutUs from "../pages/AboutUs";
import LoginPage from "../auth/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";


import VisaAssistance from "../pages/VisaAssistance";
import VisaCountryDetails from "../pages/VisaCountryDetails";




export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<App />} />
      <Route path="/flights" element={<App />} />
      <Route path="/hotels" element={<App />} />
        <Route path="/visa" element={<VisaAssistance />} />
       <Route path="/visa/:slug" element={<VisaCountryDetails />} />


      <Route path="/holidays" element={<Holidays />} />
      <Route path="/holiday-deals/:id/:city" element={<HolidayDealDetails />} />

      <Route path="/umrah-packages" element={<UmrahPackages />} />
      <Route path="/umrah-deals/:id/:city" element={<UmrahDetails />} />

      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />

      <Route path="/flight/from/:fromCity/to/:toCity/:id" element={<FlightDealDetails />} />
      <Route path="/destination/:city/:id" element={<RtBookingForm />} />
      <Route path="/region/:region" element={<DealsByRegion />} />

      <Route path="/flight-booking" element={<FlightBookingForm />} />
      <Route path="/hotel-booking" element={<HotelBookingForm />} />

      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/terms-and-conditions" element={<TermConditions />} />

      <Route path="/login" element={<LoginPage />} />

     <Route path="*" element={<NotFoundPage />} />
     
      
     

    </>
  );
}
