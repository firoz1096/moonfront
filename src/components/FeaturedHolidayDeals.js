import TravelDealCard from '../components/TravelDealCard';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";
export default function FeaturedHolidayDeals() {

const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(`${API_BASE}/holiday-deals`);
        setDeals(res.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading deals...</div>;
  }

  return (
        <> 
           
           <div className='feautured_flight_deals shadow py-4'>
          <div className="container">

          <h1 className='text-center'>Featured Holiday Deals</h1>
          <p className='text-center mb-md-4'>Plan your next escape with confidence and unforgettable experiences.</p>
            
            <div className='row'>
                {/* {deals.slice(0, 3).map((deal) => ( */}
                {deals.slice(-3).map((deal) => (

                 <div className='col-lg-4 mb-4' key={deal._id}>

                      <Link
                key={deal._id}
                to={`/holiday-deals/${deal._id}/${deal.city.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-decoration-none"
                >
                <TravelDealCard
                key={deal._id}
                price={deal.price}
                city={deal.city}
                noOfDays={deal.noOfDays}
                title={deal.title}
                shortDes={deal.shortDes}
                thumbnail={`${IMAGE_BASE}${deal.thumbnail}`} // prepend if path starts with /uploads
                />
      </Link>
                </div>
               
 ))}
        
            </div>
            <div className="row">

                <div className="col-12 text-center">

                    <Link className="btn btn-primary btn-lg rounded px-4" to="/holidays">View all Holiday Deals</Link>
                </div>

            </div>

          </div>
        </div>

      
        </>
  )
}
