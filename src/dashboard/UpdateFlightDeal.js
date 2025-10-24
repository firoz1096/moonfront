import MainLayout from "../components/MainLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PiArrowsLeftRight } from "react-icons/pi";
import dayjs from "dayjs";
import SearchAirport from "../components/controls/SearchAirport";
import SelectDate from "../components/controls/SelectDate";
import SelectClass from "../components/controls/SelectClass";
import SearchAirline from "../components/controls/SelectAirline";
import UploadImage from "../multer/UploadImage";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function UpdateFlightDeal() {
  const { id } = useParams();

  const [imagePath, setImagePath] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState(2);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const [price, setPrice] = useState("");
  const [airline, setAirline] = useState({ airlinecode: "", airlinename: "Select" });

  const [fromLocation, setFromLocation] = useState({ city: "", citycode: "", airport: "" });
  const [toLocation, setToLocation] = useState({ city: "", citycode: "", airport: "" });
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs().add(1, "day"));

  const radioHandler = (status) => setStatus(status);

  const swapAirport = () => {
    const tempLocation = { ...fromLocation };
    setFromLocation({ ...toLocation });
    setToLocation({ ...tempLocation });
  };

  // Fetch flight deal by ID
  useEffect(() => {
    const fetchFlightDeal = async () => {
      try {
        const res = await axios.get(`${API_BASE}/flight-deals/${id}`);
        if (res.data) {
          const data = res.data;
          setCountry(data.country || "");
          setStatus(data.tripType === "Round Trip" ? 1 : 2);
          setFromLocation(data.fromCity);
          setToLocation(data.toCity);
          setDepartureDate(dayjs(data.startsOn));
          setReturnDate(dayjs(data.endsOn));
          setSelectedClass(data.travelClass || "Economy");
          setPrice(data.price || "");
          setAirline(data.airline || { airlinecode: "", airlinename: "Select" });
          setImagePath(data.imagePath || "");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch flight deal data");
      }
    };
    fetchFlightDeal();
  }, [id]);

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

  const handleUpdateFlightDeal = async (e) => {
    e.preventDefault();
    if (!validateAirports()) return;
    if (!country) {
      alert("Please select a country!");
      return;
    }

    const payload = {
      country,
      tripType: status === 1 ? "Round Trip" : "One Way",
      fromCity: fromLocation,
      toCity: toLocation,
      startsOn: departureDate.format("YYYY-MM-DD"),
      endsOn: returnDate.format("YYYY-MM-DD"),
      airline,
      travelClass: selectedClass,
      price: Number(price),
      imagePath
    };

    try {
      const res = await axios.put(`${API_BASE}/flight-deals/${id}`, payload, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        alert("Flight deal updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update flight deal");
    }
  };

  return (
        <> 
        <MainLayout>  
    <div className='search_panel_block'>
    <div className="container py-5">
      <h4 className="mb-3">Update Flight Deal</h4>

      <form onSubmit={handleUpdateFlightDeal}>
        {/* Country & Trip Type */}


  <div className='row align-items-center'>

      <div className='col-lg-6 mb-3'>

        <div className="d-flex align-items-center">
          <div className="me-2">
            <label htmlFor="country" >Select a Country / Region</label>
          </div>
          <div>
       <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select</option>
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Gulf Countries">Gulf Countries</option>
            </select>
             </div> 
        </div>
           
             
              
      </div>

      
      
<div className='col-lg-6 mb-3'>

 

   <div className='flight_radio_line'>
      
       <div className="form-check form-check-inline">Trip Type:  </div>
  <div className="form-check form-check-inline">
  
           <input  id="inlineRadio1" className="form-check-input" type="radio" checked={status === 1} onChange={() => radioHandler(1)} />
            <label className="form-check-label" htmlFor="inlineRadio1">Return</label>

  </div>

  <div className="form-check form-check-inline">
 <input   id="inlineRadio2" className="form-check-input" type="radio" checked={status === 2} onChange={() => radioHandler(2)} />
        <label className="form-check-label" htmlFor="inlineRadio2">One Way</label>
  </div>


  </div>



      </div>
  </div>

        


        {/* Airports & Dates */}
        <div className="field_section mb-4">

          <div className='row g-0 align-items-center'>
        <div className='col-lg-6 position-relative'> 
   <span className="switch_destination">
              <button type="button" onClick={swapAirport}><PiArrowsLeftRight /></button>
            </span>

            <div className='row g-0'>

       <div className='col-lg-6 position-relative'>
       <SearchAirport styleCss={"field_box"} id="depAirport" source="From City/Airport" {...fromLocation} onSelect={setFromLocation} />

       </div>

            <div className='col-lg-6 position-relative'>
        <SearchAirport styleCss={"field_box ps-md-4"} id="arrAirport" source="To City/Airport" {...toLocation} onSelect={setToLocation} />

       </div>

        </div>


        </div>
       
        <div className='col-lg-3'>
          
          
        <div className='row g-0'>

       <div className='col-lg-6 position-relative'> 
          <SelectDate source="Starts On" date={departureDate} onDateChange={(d) => { setDepartureDate(d); setReturnDate(dayjs(d).add(1, "day")); }} />
        </div>

         <div className='col-lg-6 position-relative'> 
          <SelectDate source="Ends On" date={returnDate} onDateChange={(d) => { if(d.isAfter(departureDate)) setReturnDate(d); }} />
        </div>

        </div>

        </div>
         
         <div className="col-lg-3 position-relative">
         <SearchAirline source={"Select Airline"}  styleCss={"field_box"} {...airline} onSelect={setAirline} />
         </div>

            </div>

 

        </div>


   <div className="row">

     <div className="col-lg-5 mb-3">
        <div className="row"> 
    <div className='col-lg-7 position-relative'>

     <SelectClass source="Travel Class" onClassChange={setSelectedClass} selectedClass={selectedClass} />
       
    </div>

    <div className='col-lg-5'> 
         <div> Price per person</div>
         <div className="mt-1"><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" /></div>

    </div> 
</div>
       </div>
 
       <div className="col-lg-7 mb-3">

         <UploadImage source="Select an Image for To City" onUpload={setImagePath} />


       </div>



    </div>


         <div className="col-lg-12 text-end">

          <hr/>
          <button type="submit" className="btn btn-primary">Update Flight Deal</button>
        </div>
      </form>

      {/* Preview Table */}
      <h5 className="mb-3">Preview of Updated Flight Deal</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>Country</th>
              <th>Trip Type</th>
              <th>From</th>
              <th>To</th>
              <th>Starts On</th>
              <th>Ends On</th>
              <th>Travel Class</th>
              <th>Airline</th>
              <th>Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{country || "No Country Selected"}</td>
              <td>{status === 1 ? "Round Trip" : "One Way"}</td>
              <td>{fromLocation.city}, {fromLocation.citycode}</td>
              <td>{toLocation.city}, {toLocation.citycode}</td>
              <td>{departureDate.format("MMM DD, YYYY")}</td>
              <td>{returnDate.format("MMM DD, YYYY")}</td>
              <td>{selectedClass}</td>
              <td>{airline.airlinecode ? `${airline.airlinename}, ${airline.airlinecode}` : "No Airline Selected"}</td>
              <td>{price || "N/A"}</td>
              <td>{imagePath ? <img src={`${IMAGE_BASE}${imagePath}`} alt="Flight" style={{ width: "80px" }} /> : "No Image"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </MainLayout>
    </>
  );
}
