import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from './App'; // better naming
// Pages

import FlightBookingForm from './pages/FlightBookingForm';
import HotelBookingForm from './pages/HotelBookingForm';
import { ContactFormMail } from './email/ContactFormMail';
import PostFlightDeals from './dashboard/PostFlightDeals';
import LoginPage from "./auth/LoginPage";
import Dashboard from "./dashboard/Dashboard";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import FlightDealDetails from './pages/FlightDealDetails';
import PostRoundTripDeals from './dashboard/PostRoundTripDeals';
import CrudRoundtripDeals from './dashboard/CrudRoundtripDeals';
import RtBookingForm from './pages/RtBookingForm';
import DealsByRegion from './pages/DealsByRegion';
import PostHolidayDeals from './dashboard/PostHolidayDeals';
import Holidays from './pages/Holidays';
import HolidayDealDetails from './pages/HolidayDealDetails';
import SubscribeSection from './components/SubscribeSection';
import PostUmrahDeals from './dashboard/PostUmrahDeals';
import UmrahPackages from './pages/UmrahPackages';
import UmrahDetails from './pages/UmrahDetails';
import ContactUs from './pages/ContactUs';
import EditContactInfo from './dashboard/EditContactInfo';
import TermConditions from './pages/TermConditions';
import EditTermCondition from './dashboard/EditTermCondition';
import AboutUs from './pages/AboutUs';
import EditAboutUsInfo from './dashboard/EditAboutUsInfo';
import ScrollToTop from './components/ScrollToTop';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import PostBlog from './dashboard/PostBlog';
import PostBlogCategory from './dashboard/PostBlogCategory';
import EditBlogPost from './dashboard/EditBlogPost';



// Private route wrapper
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<App />} />
          <Route path="/flights" element={<App />} />
          <Route path="/hotels" element={<App />} />
        
            <Route path="/holidays" element={<Holidays />} />
               <Route path="/umrah-packages" element={<UmrahPackages />} />
          <Route path="/holiday-deals/:id/:city" element={<HolidayDealDetails />} />
           <Route path="/umrah-deals/:id/:city" element={<UmrahDetails />} />
            <Route path="/post-blogs" element={<PostBlog />} />
           <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
             
            <Route path="/blogs/edit/:id" element={<EditBlogPost />} />


           <Route path="/post-blog-category" element={<PostBlogCategory />} />

          <Route path="/contact-form" element={<ContactFormMail />} />
    
          <Route path="/post-flight-deals" element={<PostFlightDeals />} />
          <Route path="/post-round-trip-deals" element={<PostRoundTripDeals />} />       
          <Route path="/login" element={<LoginPage />} />

         <Route path="/destination/:city/:id" element={<RtBookingForm />} />     

          <Route path="/region/:region" element={<DealsByRegion />} />


          <Route path="/flight/from/:fromCity/to/:toCity/:id" element={<FlightDealDetails />} />
          <Route path="/flight-booking" element={<FlightBookingForm />} />

          <Route path="/hotel-booking" element={<HotelBookingForm />} />
          
          {/* crud pages */}
         <Route path="/crud-round-trip-deals" element={<CrudRoundtripDeals />} />

            <Route path="/post-holiday-deals" element={<PostHolidayDeals />} />

            <Route path="/subscribe" element={<SubscribeSection />} />
          <Route path="/post-umrah-deals" element={<PostUmrahDeals />} />
           <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
             <Route path="/edit-about-us" element={<EditAboutUsInfo />} />
            
            <Route path="/terms-and-conditions" element={<TermConditions />} />
             <Route path="/edit-terms-and-conditions" element={<EditTermCondition />} />
          
          
          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }     
          />

          <Route path="/edit-contact" element={ <PrivateRoute> <EditContactInfo /> </PrivateRoute> }    />

          {/* Catch-all redirect */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
