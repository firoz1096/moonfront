import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";


const VisaCards = () => {
  const [visaData, setVisaData] = useState([]);
  const navigate = useNavigate();

  const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  useEffect(() => {
    axios
      .get(`${API_BASE}/visa-type`)
      .then((res) => {
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setVisaData(data);
      })
      .catch((err) => console.error("Visa Type Error:", err));
  }, []);

  if (visaData.length === 0) {
    return <div className="text-center py-5">No visa data found.</div>;
  }

  return (
    <> 
    <div className='feautured_flight_deals mt-5 mb-5'>
    <div className="container">
      <div className="row g-4">
        {visaData.map((countryData, idx) => {
          // pick the visa type with the least fee
          const cheapestVisa =
            countryData.visaTypes && countryData.visaTypes.length > 0
              ? countryData.visaTypes.reduce((min, current) =>
                  Number(current.fees) < Number(min.fees) ? current : min
                )
              : null;

          return (
            <div className="col-lg-3 mb-3" key={idx}>
          
              <div
                className="card h-100"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/visa/${slugify(countryData.country)}-visa`)
                }
              >
                <img
                  src={
                    countryData.visaInfo?.thumbnail
                      ? `${IMAGE_BASE}${countryData.visaInfo.thumbnail}`
                      : "https://via.placeholder.com/300x200"
                  }
                  className="card-img-top rounded-top-3"
                  alt={countryData.country}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                   <div className="card-body">

<div className='row align-items-center'>

    <div className='col-12'>
    <h6>{countryData.country}</h6>
  
    </div>



<div className="col-12">
         {cheapestVisa ? (

       
                <> 
                  <div className='d-flex align-items-center'>
                    <div>
                        <small>
                        Processing Time: {cheapestVisa.processingTime || "N/A"} Days
                      </small></div>

                      <div className='ms-auto text-muted'> <small>{countryData.region}</small> </div>

                      </div>

                   <div className='d-flex align-items-center mt-2'>
                      <div><small>Starting from</small></div>
                
                    
                      <div className='ms-auto stretched-link'> 
                        
                       
                        £{cheapestVisa.fees} <FaAngleRight />
                        
                        </div>
                     
                    </div>

                    </>
                  ) : (
                    <p className="text-muted mb-0 mt-3">No visa types found.</p>
                  )}
              
</div>



</div>


                  
                    
           

         
                </div>
              </div>



            </div>
          );
        })}
      </div>
    </div>

   
      </div>



    </>
  );
};

export default VisaCards;
