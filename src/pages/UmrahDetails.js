import MainLayout from '../components/MainLayout';
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
// import RightInfoIcons from '../components/RightInfoIcons';
import { Spinner } from "react-bootstrap";
import EnquiryForm from '../components/EnquiryForm';


  // 👉 Use env vars (better than hardcoding)
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";
const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY || "";


export default function UmrahDetails() {


  const { id } = useParams();

  // ✅ All hooks first
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //weather
  const [weatherData, setWeatherData] = useState({});

  //get deal by ID
useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await axios.get(`${API_BASE}/umrah-deals/${id}`);
        setDeal(res.data);
      } catch (err) {
        console.error("Error fetching deal:", err);
        setError("Failed to load umrah deal. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);


  //get weather based on city
useEffect(() => {
  if (!deal || !deal.city) return; // wait until deal is loaded

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${deal.city}&appid=${WEATHER_KEY}&units=metric`
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
    }
  };

  fetchWeather();
}, [deal]);


  // ✅ Now safe to do early returns
  if (loading) return <div className="text-center py-5">Loading deal...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (!deal) return <div className="text-center py-5">Deal not found</div>;

  const galleryUrls = (deal.gallery || []).map((img) =>
    img.startsWith("http") ? img : `${IMAGE_BASE}${img}`
  );

//weather



  return (
            <> 
            <MainLayout>
              
            <div className='inner_half_banner' 
                style={{
                backgroundImage: `url("http://localhost:5000${deal.thumbnail}")`,
                            
            }} >

            <div className='wrapper py-4'> 
                <div className='container align-items-center text-white'>
                
                <div className="row align-items-center">
                    <div className="col-6">
                    <h1>{deal.title} </h1>
                    <p className='mb-0'> <FaLocationDot/> {deal.city}, {deal.country}</p>   
                        </div>
                    <div className="col-6 text-end">
                        
                            <div className='d-flex justify-content-end align-items-center'>
                                <div>  <h5>£{deal.price} / per person</h5> </div>
                                <div> 
                                    {/* <button className='btn btn-primary ms-2'>Enquire Now </button> */}
                                    <EnquiryForm buttonTitle="Enquiry Now" tripName={deal.title}/>
                                </div>
                            </div>

                        </div>
                    
                </div>
                
                
                </div>
            </div>

            </div>

            <div className="container mt-4 mb-5">

                <div className="row">
        
                <div className="col-md-7">
                    <div className='row'>
                    <div className='col-12'>
                <h2>Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: deal.overview }} />

                <h4 className="mt-4">Inclusions</h4>
                <ul>
                {deal.inclusions.map((inc, idx) => (
                    <li key={idx}>{inc}</li>
                ))}
                </ul>

                <h4 className="mt-4">Exclusions</h4>
                <ul>
                {deal.exclusions.map((exc, idx) => (
                    <li key={idx}>{exc}</li>
                ))}
                </ul>

                <h4 className="mt-4">Terms & Conditions</h4>
                <div dangerouslySetInnerHTML={{ __html: deal.termsConditions }} />
                    </div>
                </div>
                </div>

                <div className="col-md-5">
                <Carousel>
                {galleryUrls.map((img, idx) => (
                    <Carousel.Item key={idx}>
                    <img src={img} className="d-block w-100" alt={`slide ${idx}`} />
                    </Carousel.Item>
                ))}
                </Carousel>

                <div className='text-muted text-center mb-3'> <small>Gallery / Photos</small> </div>


                {/* Weather Section */}
                <div className="card shadow-sm p-3 text-center">
                  <h4>🌤 {deal.city}</h4>
                  {weatherData && weatherData.main ? (
                    <>
                      <h5>{weatherData.weather[0].description}</h5>
                      <h2>{weatherData.main.temp}°C</h2>
                      <p>Humidity: {weatherData.main.humidity}%</p>
                      <p>Wind: {weatherData.wind.speed} m/s</p>
                    </>
                  ) : (
                    <Spinner animation="border" size="sm" />
                  )}
                </div>


            {/* <div className="mt-3">
              <RightInfoIcons />
            </div> */}
                </div>
                </div>

         


            
            </div>
     </MainLayout>
     </>
  );
}
