import MainLayout from '../components/MainLayout';
import aboutbg from '../assets/images/about-us-bg.jpg';
// import aboutpic from '../assets/images/about-us.jpg';
import StatsSection from '../components/StatsSection';
import { useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";
import { useAuth } from "../auth/AuthContext";
import { Link } from 'react-router-dom';


export default function AboutUs() {
const { user } = useAuth(); // from AuthProvider

const [aboutInfo, setAboutInfo] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetcAboutInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/about-info");
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


              {user && (
          <div className="text-end mt-4">
            <Link className="btn btn-warning" to="/edit-about-us">
              Edit
            </Link>
          </div>
        )}
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
