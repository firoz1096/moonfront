import MainLayout from '../components/MainLayout';
import TravelDealCard from '../components/TravelDealCard';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Holidays() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/holiday-deals");
        setDeals(res.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
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
          <h2>Explore Top Holidays</h2>
          <p>Save extra with our exclusive deals!</p>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading deals...</p>
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-5">
              No holiday packages available.
            </div>
          ) : (
            <div className="row">
              {deals.map((deal) => (
                <div className="col-lg-4 mb-4" key={deal._id}>
                  <Link
                    to={`/holiday-deals/${deal._id}/${deal.city
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-decoration-none"
                  >
                    <TravelDealCard
                      price={deal.price}
                      city={deal.city}
                      noOfDays={deal.noOfDays}
                      title={deal.title}
                      shortDes={deal.shortDes}
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
