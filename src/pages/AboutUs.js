import MainLayout from '../components/MainLayout';
import aboutbg from '../assets/images/about-us-bg.jpg';
import StatsSection from '../components/StatsSection';
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function AboutUs() {

const [aboutInfo, setAboutInfo] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetcAboutInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE}/about-info`);
      setAboutInfo(res.data);
    } catch (err) {
      console.error("Error fetching about us info:", err);
    } finally {
      setLoading(false);
    }
  };
  fetcAboutInfo();
}, []);

  return (
    
    
           <> 
            <MainLayout>


            <div className='inner_half_banner' 
                style={{
                backgroundImage: `url("${aboutbg}")`,
                            
            }} >

            <div className='wrapper py-4'> 
                <div className='container align-items-center text-white'>
                
                <div className="row align-items-center">
                    <div className="col-12">
                    <h1>About Us </h1>
                    <p className='mb-0'>We offer flight tickets, hotels, and Umrah packages.</p>   
                        </div>
      
                </div>
                
                
                </div>
            </div>

            </div>


  
                  <div className="container mt-5 mb-5">
        
  
           <div className="row">
                  {loading ? (
                    <Spinner />
                  ) : aboutInfo ? (
                    <>
                  
                    <div className='col-lg-12'>
                      <div dangerouslySetInnerHTML={{ __html: aboutInfo.aboutUs }} />
                    </div>
                     {/* <div className='col-lg-4'>
                      <img className='img-fluid rounded' src={aboutpic} alt='' />
                     </div> */}
                      
                    </>
                  ) : (
                    <p className="text-danger">Failed to load Term and Conditions.</p>
                  )}
                </div>


          <StatsSection/>
  
                  </div>
          


             
            </MainLayout>
            </>
  )
}
