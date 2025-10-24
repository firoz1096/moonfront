import MainLayout from "../components/MainLayout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PiArrowsLeftRight } from "react-icons/pi";
import { TbHandFingerDown } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import SearchAirport from "../components/controls/SearchAirport";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function UpdateRoundTripDeal() {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();

  // States
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [fromLocation, setFromLocation] = useState({
    city: "",
    citycode: "",
    airport: "",
  });
  const [toLocation, setToLocation] = useState({
    city: "",
    citycode: "",
    airport: "",
  });

  // ✅ Fetch existing deal data
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await axios.get(`${API_BASE}/round-trip-deals/${id}`);
        const data = res.data;

        setCountry(data.country || "");
        setPrice(data.price || "");
        setFromLocation(data.fromCity || {});
        setToLocation(data.toCity || {});
      } catch (error) {
        console.error(error);
        alert("Error fetching deal details");
      }
    };

    fetchDeal();
  }, [id]);

  // ✅ Swap airports
  const swapAirport = () => {
    const temp = { ...fromLocation };
    setFromLocation({ ...toLocation });
    setToLocation({ ...temp });
  };

  // ✅ Validate
  const validateAirports = () => {
    if (!fromLocation.citycode || !toLocation.citycode) {
      alert("Please select both departure and arrival cities");
      return false;
    }
    if (fromLocation.citycode === toLocation.citycode) {
      alert("Departure and arrival cities cannot be the same");
      return false;
    }
    return true;
  };

  // ✅ Update deal
  const handleUpdateDeal = async (e) => {
    e.preventDefault();

    if (!country) {
      alert("Please select a country!");
      return;
    }
    if (!validateAirports()) return;
    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price!");
      return;
    }

    const payload = {
      country,
      fromCity: fromLocation,
      toCity: toLocation,
      price: Number(price),
    };

    try {
      const res = await axios.put(
        `${API_BASE}/round-trip-deals/${id}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        alert("Deal updated successfully!");
        navigate("/round-trip-deals"); // redirect back to deals list
      }
    } catch (error) {
      console.error(error);
      alert("Error updating deal. Please try again.");
    }
  };

  return (
 <> 
        <MainLayout>  
    <div className="search_panel_block">
     <div className="container py-5">
        <h4 className="mb-3">Update Round-Trip Flight Deal</h4>

        {/* Country */}
        <div className="row">
          <div className="col-lg-4 mb-3">
            <label htmlFor="country">Select a Region</label>
            <select
              id="country"
              className="form-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Asia">Asia</option>
              <option value="Middle East">Middle East</option>
              <option value="Africa">Africa</option>
            </select>
          </div>
        </div>

        {/* Flight Fields */}
        <div className="field_section mb-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-8 position-relative">
              <span className="switch_destination">
                <button onClick={swapAirport}>
                  <PiArrowsLeftRight />
                </button>
              </span>

              <div className="row g-0">
                <div className="col-lg-6 position-relative">
                  <SearchAirport
                    id="depAirport"
                    source={"From City/Airport"}
                    city={fromLocation.city}
                    citycode={fromLocation.citycode}
                    airport={fromLocation.airport}
                    styleCss={"field_box"}
                    onSelect={setFromLocation}
                  />
                </div>

                <div className="col-lg-6 position-relative">
                  <SearchAirport
                    id="arrAirport"
                    source={"To City/Airport"}
                    city={toLocation.city}
                    citycode={toLocation.citycode}
                    airport={toLocation.airport}
                    styleCss={"field_box ps-md-4"}
                    onSelect={setToLocation}
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="col-lg-2">
              <div className="field_box">
                <div className="title">Price</div>
                <div className="fieldfirst trim_text">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="fieldlast trim_text"> per person</div>
              </div>
            </div>

            {/* Save */}
            <div className="col-lg-2">
              <div className="btn_wrap">
                <button
                  onClick={handleUpdateDeal}
                  className="btn btn_search"
                >
                  Update Deal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="row">
          <div className="col-12 mt-4 mb-3">
            Your updated <b>Round-Trip Flight Deal</b> will look like
            <TbHandFingerDown className="text-warning fs-5 ms-1" />
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2 shadow-sm bg-white">
              <span className="fw-medium">
                {fromLocation.city} - {toLocation.city}
              </span>
              <span className="fw-bold text-primary">
                {price ? (
                  <div>
                    £{price}* <FaAngleRight className="ms-1" />
                  </div>
                ) : (
                  <div>null</div>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
    </>
  );
}
