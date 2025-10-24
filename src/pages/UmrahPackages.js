import MainLayout from '../components/MainLayout';
import UmrahDealCard from '../components/UmrahDealCard';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import aboutbg from '../assets/images/umrah-bg.jpg';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";


export default function UmrahPackages() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(`${API_BASE}/umrah-deals`);
        setDeals(res.data);
      } catch (error) {
        console.error("Error fetching umrah deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <MainLayout>
    
    <div className='inner_half_banner' 
                style={{
               backgroundImage: `url("${aboutbg}")`,
                            
            }} >

            <div className='wrapper py-4'> 

              <div className="container align-items-center text-white">
                <div className="row align-items-center">
                  <div className="col-12 text-center">
                       <h2 className='text-white'>Umrah Packages</h2>
                      <p className='text-white'>From intention to destination. We're with you every step.</p>

                  </div>
                </div>
              </div>

         </div>

    </div>

            

      <div className="feautured_flight_deals mt-5 mb-4">
        <div className="container">

 {loading ? (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3">Loading deals...</p>
  </div>
) : deals.length === 0 ? (
  <div className="text-center py-5">No Umrah packages available.</div>
) : (
  <div className="row">
    {deals.map((deal) => (
      <div className="col-lg-4 mb-4" key={deal._id}>
        <Link
          to={`/umrah-deals/${deal._id}/${deal.city.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-decoration-none"
        >
          <UmrahDealCard
            price={deal.price}
            city={deal.city}
            noOfDays={deal.noOfDays}
            title={deal.title}
            shortDes={deal.shortDes}
            hotelRating={deal.hotelRating}
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
