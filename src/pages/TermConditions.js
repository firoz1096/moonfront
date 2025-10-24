import MainLayout from '../components/MainLayout';
import contactbg from '../assets/images/contact-us-bg.jpg';
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function TermConditions() {

const [termInfo, setTermInfo] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchTermInfo = async () => {
    try {
      const res = await axios.get(`${API_BASE}/terms-info`);
      setTermInfo(res.data);
    } catch (err) {
      console.error("Error fetching term and condition info:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTermInfo();
}, []);

  return (
    
    
           <> 
            <MainLayout>


            <div className='inner_half_banner' 
                style={{
                backgroundImage: `url("${contactbg}")`,
                            
            }} >

            <div className='wrapper py-4'> 
                <div className='container align-items-center text-white'>
                
                <div className="row align-items-center">
                    <div className="col-12">
                    <h1>Terms and Conditions </h1>
                    <p className='mb-0'> For any queries regarding these Terms & Conditions, please <Link to="/contact-us">contact</Link>.</p>   
                        </div>
      
                    
                </div>
                
                
                </div>
            </div>

            </div>


                <div className="container mt-5 mb-5">
      

         <div className="row">
                {loading ? (
                  <Spinner />
                ) : termInfo ? (
                  <>
                

                    <div dangerouslySetInnerHTML={{ __html: termInfo.termsAndConditions }} />
                  </>
                ) : (
                  <p className="text-danger">Failed to load Term and Conditions.</p>
                )}
              </div>

                </div>
            




 
             
            </MainLayout>
            </>
  )
}
