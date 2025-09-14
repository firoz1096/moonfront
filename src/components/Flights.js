import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { PiArrowsLeftRight } from "react-icons/pi";
import dayjs from 'dayjs';
import SearchAirport from "./controls/SearchAirport";
import Travelers from "./controls/Travelers";
import SelectDate from "./controls/SelectDate";
import { useNavigate } from 'react-router-dom';


export default function Flights() {

    const [status, setStatus] = useState(1)
    const radioHandler = (status) => {
        setStatus(status);
    };


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
    const [travelers, setTravelers] = useState({
        passengers: {
            adult: 1,
            child: 0,
            infant: 0,
            total: 1
        },
        selectedClass: 'Economy'
    });

    const swapAirport = () => {
        const tempLocation = {...fromLocation};
        setFromLocation({...toLocation});
        setToLocation({...tempLocation});
    };


  const navigate = useNavigate();
   
  const passFlightParams = () => {
    // Basic validation
    if (!fromLocation.citycode || !toLocation.citycode) {
      alert('Please select both departure and arrival cities');
      return;
    }

    if (fromLocation.citycode === toLocation.citycode) {
      alert('Departure and arrival cities cannot be the same');
      return;
    }

    // Prepare the flight parameters
    const flightParams = {
      tripType: status === 1 ? 'Return' : 'One Way',
      fromLocation,
      toLocation,
      departureDate: departureDate.format('YYYY-MM-DD'),
      returnDate: status === 1 ? returnDate.format('YYYY-MM-DD') : null,
      passengers: travelers.passengers,
      class: travelers.selectedClass
    };

    // Navigate to booking form with parameters
    navigate('/flight-booking', { 
      state: flightParams
    });
  };


  return (
    
    <> 



        <div className='row'>
      <div className='col-12 mb-2'>
        <div className='flight_radio_line'>
            
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

           
    <div className='field_section'> 


  <div className='row g-0 align-items-center'>

    <div className='col-lg-6 position-relative'>
      <span className='switch_destination'>
        <button onClick={swapAirport}> <PiArrowsLeftRight/></button>
      </span>
    
      <div className='row g-0'>

       <div className='col-lg-6 position-relative'>
           <SearchAirport
            id="depAirport"
            source={"From"}
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
            source={"To"}
            city={toLocation.city || "New Delhi"}
            citycode={toLocation.citycode || "DEL"}
            airport={toLocation.airport || "Indira Gandhi International Airport"}
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
            source={"Departure"}
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

    
 {status === 1 && (  
    <div>
       <SelectDate
          source={"Return"}
          date={returnDate}
          onDateChange={(newValue) => {
            if (newValue && newValue.isAfter(departureDate)) {
              setReturnDate(newValue);
            }
          }}
          /> 
    
    </div>
)}
                   
                   
  {status === 2 && (

  <div className='field_box' onClick={() => radioHandler(1)}>
  <div className='title'>Return <IoIosArrowDown /></div>

  <div className='oneWayPickerLabel'>Tap to add a return date for bigger discounts</div>

  </div>
         
  )} 

</div> 



 
        
        </div>  
       
    </div>
       
    <div className='col-lg-2 position-relative'>

     <Travelers onUpdate={setTravelers} />
       
    </div>

    <div className='col-lg-1'> 
       <div className='btn_wrap'>
         <button onClick={passFlightParams} className='btn btn_search'> SEARCH </button>
       </div>
    </div> 

    </div>
    </div>
</>
  )
}
