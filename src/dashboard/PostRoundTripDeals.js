import MainLayout from "../components/MainLayout";
import { useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import SearchAirport from "../components/controls/SearchAirport";
import { TbHandFingerDown } from "react-icons/tb";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function PostRoundTripDeals() {


const [country, setCountry] = useState(""); 
const [price, setPrice] = useState("");

    // From and To location states
    const [fromLocation, setFromLocation] = useState({
        city: "Manchester",
        citycode: "MAN",
        airport: "Manchester Airport"
    });
    
    const [toLocation, setToLocation] = useState({
        city: "New Delhi",
        citycode: "DEL",
        airport: "Indira Gandhi International Airport"
    });



    const swapAirport = () => {
        const tempLocation = {...fromLocation};
        setFromLocation({...toLocation});
        setToLocation({...tempLocation});
    };


const validateAirports = () => {
  if (!fromLocation.citycode || !toLocation.citycode) {
    alert('Please select both departure and arrival cities');
    return false;
  }
  if (fromLocation.citycode === toLocation.citycode) {
    alert('Departure and arrival cities cannot be the same');
    return false;
  }
  return true;
};



const handleFlightDeals = async (e) => {
  e.preventDefault();

    if (!country) {
      alert("Please select a Region!");
      return;
    }


  if (!validateAirports()) return;


    if (!price || Number(price) <= 0) {
    alert("Please enter a valid price!");
    return;
  }

  // Prepare payload
  const payload = {
    country,  
    fromCity: {
      city: fromLocation.city,
      citycode: fromLocation.citycode,
      airport: fromLocation.airport
    },
    toCity: {
      city: toLocation.city,
      citycode: toLocation.citycode,
      airport: toLocation.airport
    },
     price: Number(price),
   
  };

  try {
    const res = await axios.post(
      `${API_BASE}/round-trip-deals`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.status === 200) {
      alert("Deal saved successfully!");

      // clear form (optional)
      setPrice("");
     
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting form. Please try again.");
  }
};



  return (
    
    <> 
<MainLayout>
<div className='search_panel_block'>
<div className="container py-5">

<h4 className="mb-4">Create Round-Trip Flight Deal</h4>

<div className="row">
          <div className='col-lg-4 mb-3'>

        <div className="d-flex align-items-center">
          <div className="me-2">
            <label htmlFor="country" >Select a Region</label>
          </div>
          <div>
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
           
             
              
      </div>
</div>
           
    <div className='field_section mb-4'> 


  <div className='row g-0 align-items-center'>

    <div className='col-lg-8 position-relative'>
      <span className='switch_destination'>
        <button onClick={swapAirport}> <PiArrowsLeftRight/></button>
      </span>
    
      <div className='row g-0'>

       <div className='col-lg-6 position-relative'>
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

      <div className='col-lg-6 position-relative'>
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


        <div className='col-lg-2'> 


            <div  className="field_box">
           <div className='title'>Price</div>
            <div className='fieldfirst trim_text'><input type="number" value={price} 
            onChange={(e) => setPrice(e.target.value)} className="form-control" id="startingfrom" /></div>
            <div className='fieldlast trim_text'> per person</div>  
            </div>
       

        </div> 


   <div className='col-lg-2'> 
       <div className='btn_wrap'>
        <button onClick={handleFlightDeals} className="btn btn_search"> Save Deal </button>
       </div>
    </div> 

 

    </div>


    </div>


    <div className="row">

  <div className="col-12 mt-4 mb-3"> Your selected <b>Round-Trip Flight Deal</b> will look like  
    <TbHandFingerDown className="text-warning fs-5 ms-1" /></div>


                <div className="col-md-4">
                    <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2 shadow-sm bg-white">
                      <span className="fw-medium">{fromLocation.city} - {toLocation.city}</span>
                      <span className="fw-bold text-primary">
                         {price ?
                    <div>£{price}* <FaAngleRight className="ms-1" /></div> : 
                    <div>null</div>} 
                      </span>
                    </div>
                  </div>


   

   
    </div>

    </div>
     </div>
    </MainLayout>  
</>
  )
}
