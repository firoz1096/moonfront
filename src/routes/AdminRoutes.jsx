import { Route } from "react-router-dom";
import RegisterPage from "../auth/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import PostFlightDeals from "../dashboard/PostFlightDeals";
import PostRoundTripDeals from "../dashboard/PostRoundTripDeals";
import PostHolidayDeals from "../dashboard/PostHolidayDeals";
import PostUmrahDeals from "../dashboard/PostUmrahDeals";
import PostBlog from "../dashboard/PostBlog";
import PostVisaCountryInfo from "../dashboard/PostVisaCountryInfo";
import PostVisaType from "../dashboard/PostVisaType";
import PostBlogCategory from "../dashboard/PostBlogCategory";
import EditBlogPost from "../dashboard/EditBlogPost";
import EditContactInfo from "../dashboard/EditContactInfo";
import EditTermCondition from "../dashboard/EditTermCondition";
import EditAboutUsInfo from "../dashboard/EditAboutUsInfo";
//queue
import RoundTripDealsQueue from "../dashboard/queue/RoundTripDealsQueue";
import FlightDealsQueue from "../dashboard/queue/FlightDealsQueue";
import HolidayDealsQueue from "../dashboard/queue/HolidayDealsQueue";
import UmrahDealsQueue from "../dashboard/queue/UmrahDealsQueue";
import VisaCountryInfoQueue from "../dashboard/queue/VisaCountryInfoQueue";
import VisaTypesQueue from "../dashboard/queue/VisaTypesQueue";
import VisaDealsQueue from "../dashboard/queue/VisaDealsQueue";
import CallRequestQueue from "../dashboard/queue/CallRequestQueue";
//update
import UpdateFlightDeal from "../dashboard/UpdateFlightDeal";
import UpdateRoundTripDeal from "../dashboard/UpdateRoundTripDeal";
import UpdateHolidayDeal from "../dashboard/UpdateHolidayDeal";
import UpdateUmrahDeal from "../dashboard/UpdateUmrahDeal";








export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/post-flight-deals"
        element={
          <PrivateRoute>
            <PostFlightDeals />
          </PrivateRoute>
        }
      />

      <Route
        path="/post-round-trip-deals"
        element={
          <PrivateRoute>
            <PostRoundTripDeals />
          </PrivateRoute>
        }
      />

      <Route
        path="/round-trip-deals-queue"
        element={
          <PrivateRoute>
            <RoundTripDealsQueue />
          </PrivateRoute>
        }
      />

    <Route
        path="/flight-deals-queue"
        element={
          <PrivateRoute>
            <FlightDealsQueue />
          </PrivateRoute>
        }
      />

          <Route
        path="/umrah-deals-queue"
        element={
          <PrivateRoute>
            <UmrahDealsQueue />
          </PrivateRoute>
        }
      />

                <Route
        path="/register"
        element={
          <PrivateRoute>
            <RegisterPage />
          </PrivateRoute>
        }
      />


          <Route
        path="/holiday-deals-queue"
        element={
          <PrivateRoute>
            <HolidayDealsQueue />
          </PrivateRoute>
        }
      />





           <Route
        path="/update-flight-deal/:id" 
        element={
          <PrivateRoute>
            <UpdateFlightDeal />
          </PrivateRoute>
        }
      />

      
           <Route
        path="/update-round-trip-deal/:id" 
        element={
          <PrivateRoute>
            <UpdateRoundTripDeal />
          </PrivateRoute>
        }
      />

          <Route
        path="/update-holiday-deal/:id" 
        element={
          <PrivateRoute>
            <UpdateHolidayDeal />
          </PrivateRoute>
        }
      />

         <Route
        path="/update-umrah-deal/:id" 
        element={
          <PrivateRoute>
            <UpdateUmrahDeal />
          </PrivateRoute>
        }
      />



      

      <Route
        path="/post-holiday-deals"
        element={
          <PrivateRoute>
            <PostHolidayDeals />
          </PrivateRoute>
        }
      />

      <Route
        path="/post-umrah-deals"
        element={
          <PrivateRoute>
            <PostUmrahDeals />
          </PrivateRoute>
        }
      />

      <Route
        path="/post-blogs"
        element={
          <PrivateRoute>
            <PostBlog />
          </PrivateRoute>
        }
      />

      <Route
        path="/post-blog-category"
        element={
          <PrivateRoute>
            <PostBlogCategory />
          </PrivateRoute>
        }
      />

      <Route
        path="/blogs/edit/:id"
        element={
          <PrivateRoute>
            <EditBlogPost />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-contact"
        element={
          <PrivateRoute>
            <EditContactInfo />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-terms-and-conditions"
        element={
          <PrivateRoute>
            <EditTermCondition />
          </PrivateRoute>
        }
      />

      <Route
        path="/edit-about-us"
        element={
          <PrivateRoute>
            <EditAboutUsInfo />
          </PrivateRoute>
        }
      />





 <Route path="/post-visa-deals" 
       element={
          <PrivateRoute>
            <PostVisaType />
          </PrivateRoute>
        }
 />





  <Route path="/visa-deals-queue" 
  element={
          <PrivateRoute>
            <VisaTypesQueue />
          </PrivateRoute>
        }
  />
  
  
  <Route path="/edit-visa-deals-queue" 
  element={
            <PrivateRoute>
              <VisaDealsQueue />
            </PrivateRoute>
          } 
  />


        <Route path="/post-visa-country-info" 
        element={
          <PrivateRoute>
            <PostVisaCountryInfo />
          </PrivateRoute>
        }
        
        />


 <Route path="/visa-country-queue" 
element={
          <PrivateRoute>
            <VisaCountryInfoQueue />
          </PrivateRoute>
      }
 
 />


  <Route path="/call-request-queue" 
element={
          <PrivateRoute>
            <CallRequestQueue />
          </PrivateRoute>
      }
 
 />



    </>
  );
}
