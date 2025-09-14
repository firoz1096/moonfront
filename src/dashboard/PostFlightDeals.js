import { useState } from "react";
import { PiArrowsLeftRight } from "react-icons/pi";
import dayjs from 'dayjs';
import SearchAirport from "../components/controls/SearchAirport";
import SelectDate from "../components/controls/SelectDate";
import SelectClass from "../components/controls/SelectClass";
import SearchAirline from "../components/controls/SelectAirline";
import { TbHandFingerDown } from "react-icons/tb";
import UploadImage from "../multer/UploadImage";
import axios from "axios";



export default function PostFlightDeals() {

const [imagePath, setImagePath] = useState("");
    const [country, setCountry] = useState(""); 


  const [status, setStatus] = useState(2)
  const radioHandler = (status) => {
      setStatus(status);
  };

const [selectedClass, setSelectedClass] = useState('Economy');
const [price, setPrice] = useState("");

    const [airline, setAirline] = useState({
        airlinecode: "",
        airlinename: "Select"
    });

    // From and To location states
    const [fromLocation, setFromLocation] = useState({
        city: "Dubai",
        citycode: "DXB",
        airport: "Dubai International Airport"
    });
    
    const [toLocation, setToLocation] = useState({
        city: "New Delhi",
        citycode: "DEL",
        airport: "Indira Gandhi International Airport"
    });

    // Add states for departure and return dates
    const [departureDate, setDepartureDate] = useState(dayjs()); // Today
    const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day')); // Tomorrow

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

  if (!validateAirports()) return;
  if (!country) {
      alert("Please select a country!");
      return;
    }

  // Prepare payload
  const payload = {
    country,   // ✅ added country to payload
    tripType: status === 1 ? "Round Trip" : "One Way",
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
    startsOn: departureDate.format("YYYY-MM-DD"),
    endsOn: returnDate.format("YYYY-MM-DD"),
    airline: {
      airlinename: airline.airlinename,
      airlinecode: airline.airlinecode
    },
    travelClass: selectedClass,
    price: Number(price),
    imagePath: imagePath,   // from UploadImage component
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/post-flight-deals",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.status === 200) {
      alert("Flight deal saved successfully!");
      // clear form (optional)
      setPrice("");
      setImagePath("");
      setAirline({ airlinecode: "", airlinename: "Select" });
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting form. Please try again.");
  }
};



  return (
    
    <> 

<div className='search_panel_block mt-5'>
<div className="container">

<h3 className="mb-4">Create Featured Flight Deal</h3>

  <div className='row align-items-center'>

      <div className='col-lg-6 mb-3'>

        <div className="d-flex align-items-center">
          <div className="me-2">
            <label htmlFor="country" >Select a Country / Region</label>
          </div>
          <div>
            <select
                id="country"
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
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
  
  <input 
  className="form-check-input" type="radio" name="inlineRadioOptions"  
  checked={status === 1} onChange={() => radioHandler(1)} 
  id="inlineRadio1" value="Return"  
      />

  <label className="form-check-label" htmlFor="inlineRadio1">Return</label>

  </div>

  <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" 
  checked={status === 2} onChange={() => radioHandler(2)} 
  id="inlineRadio2" value="One Way" />

  <label className="form-check-label" htmlFor="inlineRadio2">One Way</label>
  </div>


  </div>

      </div>
  </div>

           
    <div className='field_section mb-4'> 


  <div className='row g-0 align-items-center'>

    <div className='col-lg-6 position-relative'>
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

    <div className='col-lg-3'>

      <div className='row g-0'>

       <div className='col-lg-6 position-relative'> 
          <SelectDate
            source={"Starts On"}
            date={departureDate}
            onDateChange={(newValue) => {
              if (newValue) {
                setDepartureDate(newValue);
                // Always update return date to be the next day after departure
                const nextDay = dayjs(newValue).add(1, 'day');
                setReturnDate(nextDay);
              }
            }}
          />
        </div> 

     <div className='col-lg-6 position-relative'> 

    
      <SelectDate
         source={"Ends On"}
          date={returnDate}
          onDateChange={(newValue) => {
            if (newValue && newValue.isAfter(departureDate)) {
              setReturnDate(newValue);
            }
          }}
          />                
                   


</div> 



 
        
        </div>  
       
    </div>
       

         <div className="col-lg-3 position-relative">
          <SearchAirline
           id="searchAirline"
            source={"Select Airline"}
             airlinename={airline.airlinename} 
             airlinecode={airline.airlinecode}
            styleCss={"field_box"}
            onSelect={setAirline}
          />

         </div>



    </div>


    </div>

   <div className="row ">

     <div className="col-lg-5 mb-3">
        <div className="row"> 
    <div className='col-lg-7 position-relative'>

       <SelectClass source={"Travel Class"} onClassChange={setSelectedClass} />
       
    </div>

    <div className='col-lg-5'> 
         <div> Price per person</div>
         <div className="mt-1"><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" id="startingfrom" /></div>

    </div> 
</div>
       </div>
 
       <div className="col-lg-7 mb-3">

         <UploadImage source="Select an Image for To City" onUpload={setImagePath} />


       </div>

<hr/>
       <div className="col-lg-12 text-end">
           <button onClick={handleFlightDeals} className="btn btn-primary"> Save Featured Flight Deals </button>

       </div>

    </div>

    <div className="row">

  <div className="col-12 mt-4"> Your selected <b>featured flight deal</b> will look like  
    <TbHandFingerDown className="text-warning fs-5 ms-1" /></div>
        <div className="col-lg-12">
        
          <table className="table">
            <thead>
                <tr>
                    <th>Country</th>
                    <th> Trip Type </th>
                    <th>From</th>
                    <th>To</th>
                    <th>Starts On</th>
                    <th>Ends On</th>
                    <th>Travel Class </th>
                    <th>Airline </th>
                    <th>Price </th>
                    
                </tr>
            </thead>

                   <tbody>
                <tr>
                  <td>{country ? <div>{country}</div> : <div>No Country Selected</div>}</td>
                    <td>{status === 1 ? "Round Trip" : "One Way"}</td>
                    <td>{fromLocation.city}, {fromLocation.citycode}</td>
                    <td>{toLocation.city}, {toLocation.citycode}</td>
                    <td>{departureDate.format("MMM DD")}</td>
                    <td>{returnDate.format("MMM DD")}</td>
                    <td>{selectedClass}</td>
                    <td> {airline.airlinecode ?
                    
                    <div>{airline.airlinename}, {airline.airlinecode}</div> : 
                    <div>No Airline Selected</div>}</td>

                    <td> {price ?
                    <div>{price}</div> : 
                    <div>null</div>}
                    </td>
                    
                </tr>
            </tbody>
          </table>

        </div>

   
    </div>

    </div>
     </div>
     
</>
  )
}
