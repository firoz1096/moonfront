import MainLayout from '../components/MainLayout';
import UmrahDealCard from '../components/UmrahDealCard';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function UmrahPackages() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/umrah-deals");
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
      <div className="feautured_flight_deals mt-4 mb-4">
        <div className="container">
          <h2>Umrah Packages</h2>
          <p>From intention to destination. We're with you every step.</p>

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
            thumbnail={`http://localhost:5000${deal.thumbnail}`}
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
