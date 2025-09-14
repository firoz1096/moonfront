import '../src/custom.scss';
import MainLayout from "./components/MainLayout";
import SwiperSlider from "./components/SwiperSlider";
// import ToolsSlider from "./components/ToolsSlider";
import WhyBookWithUs from './components/WhyBookWithUs';
import FeatureFlightDeals from './components/FeatureFlightDeals';
import GoogleReviewsWidget from './components/GoogleReview';
import HowItWorks from './components/HowItWorks';
import RoundTripDeals from './components/RoundTripDeals';
import FeaturedHolidayDeals from './components/FeaturedHolidayDeals';
import StatsSection from './components/StatsSection';
import SubscribeSection from './components/SubscribeSection';


function App() {
  return (
    <div className="App">
<>

      <MainLayout>
      <SwiperSlider/>
      <WhyBookWithUs/>
      <FeatureFlightDeals/>
      <FeaturedHolidayDeals/>
      <HowItWorks/>
      <RoundTripDeals/>
       <StatsSection/>
       <SubscribeSection/>
      <GoogleReviewsWidget/>
       
      {/* <ToolsSlider/> */}
      </MainLayout>

      </>


    </div>
  );
}

export default App;
