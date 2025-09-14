
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import asia from '../assets/images/region/asia.jpg';
import middleeast from '../assets/images/region/middle-east.jpg';
import africa from '../assets/images/region/africa.jpg';

export default function RoundTripDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch("http://localhost:5000/round-trip-flight-deals"); // your API endpoint
        const data = await res.json();
        setDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  // Group deals by country (Asia, Africa, Middle East)
  const groupedDeals = deals.reduce((acc, deal) => {
    if (!acc[deal.country]) acc[deal.country] = [];
    acc[deal.country].push(deal);
    return acc;
  }, {});


// Define image mapping by region
const regionImages = {
  asia: [asia],
  africa: [africa],
    "middle east": [middleeast],
  
  // "middle east": [
  //   "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg",
  //   "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  //   "https://images.pexels.com/photos/21014/pexels-photo.jpg",
  //   "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  // ],

};


  return (
    <div className="container my-5 flight_deals_section">
      <h1 className="text-center">Top Round-Trip Flight Deals For You</h1>

      {Object.keys(groupedDeals).map((region) => (
        <div className="row align-items-center my-4" key={region}>
          {/* Left Side Images */}
          <div className="col-lg-5 hide_mobile">
            <div className="row g-2">
              {regionImages[region.toLowerCase()]?.map((img, index) => (
                <div className="col-12" key={index}>
                  <img
                    src={img}
                    className="img-fluid rounded"
                    alt={`${region} ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Deals */}
          <div className="col-lg-7">
            <h3 className="fw-bold mb-3 mt-lg-4">
              {region}{" "}
              <span className="badge bg-dark">
                from £{Math.min(...groupedDeals[region].map((d) => d.price))}*
              </span>
            </h3>

            <div className="row">
              {groupedDeals[region].map((deal) => (
                
                <div className="col-md-6" key={deal._id}>
                    <Link className="rt_deal" to={`/destination/${deal.toCity?.city.toLowerCase().replace(/\s+/g, "-")}/${deal._id}`}>
                      <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2 shadow-sm">
                        <span className="fw-medium">
                          {deal.fromCity?.city} – {deal.toCity?.city}
                        </span>
                        <span className="fw-bold">
                          £{deal.price}*<FaAngleRight className="ms-1" />
                        </span>
                      </div>
                    </Link>


                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-2 mb-5">

              <Link className="btn btn-primary btn-lg rounded px-4" to={`/region/${region.toLowerCase().replace(/\s+/g, "-")}`}>
               View all {region} Deals
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
