import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import MainLayout from '../components/MainLayout';
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";



// ✅ helper: slug → Proper case (africa → Africa, middle-east → Middle East)
const formatCountry = (slug) => {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

export default function DealsByRegion() {
  const { region } = useParams();
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      if (!region) return;

      try {
        const countryParam = formatCountry(region);
        // console.log("Fetching for:", countryParam);

        const response = await fetch(
          `${API_BASE}/round-trip-deals?country=${countryParam}`
        );
        const data = await response.json();
        // console.log("API response:", data);

        setDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, [region]);

  if (!region) {
    return <p className="text-center mt-5">Invalid region URL.</p>;
  }

  return (

        <> 
     <MainLayout>
    <div className="container flight_deals_section mt-5 mb-5">
     
     <div className="card shadow-sm h-100">
        <div className="card-body">
      <h4 className="mb-4 fw-bold">Cheap Flights to {formatCountry(region)}</h4>
      <div className="row">
 {deals.map((deal) => {
  return (
    <div className="col-md-4 mb-3" key={deal._id}>
      <div className="card shadow-sm h-100">
        <div className="card-body">

            <div className="d-flex align-items-center mb-1">
                <div className="deal_title"> {deal?.fromCity?.city} – {deal?.toCity?.city} </div>
                <div className="ms-auto deal_price"> £{deal?.price}</div>
            </div>
              

          <Link to={`/destination/${deal.toCity?.city.toLowerCase().replace(/\s+/g, "-")}/${deal._id}`}
            className="deal_link" >Book Now<MdOutlineKeyboardArrowRight /> </Link>
        </div>
      </div>
    </div>
  );
})}


        {deals.length === 0 && (
          <p className="text-muted">
            No deals found for {formatCountry(region)}.
          </p>
        )}
      </div>

        </div>
        </div>





    </div>
   </MainLayout>
   </>
  );
}
