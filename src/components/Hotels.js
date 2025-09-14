
import SelectDate from "./controls/SelectDate";
import dayjs from 'dayjs';
import { useState } from "react";
import SearchHotel from "./controls/SearchHote";
import RoomandGuest from "./controls/RoomandGuest";
import SelectPrice from "./controls/SelectPrice";
import { useNavigate } from 'react-router-dom';

export default function Hotels() {

    // Add states for departure and return dates
    const [departureDate, setDepartureDate] = useState(dayjs()); // Today
    const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day')); // Tomorrow

    // From and To location states
    const [hotelDestination, setHotelDestination] = useState({
        city: "Dubai",
        country: "United Arab Emirates"
    });

    // Add state for room and guests information
    const [roomDetails, setRoomDetails] = useState({
        rooms: 1,
        guests: {
            adult: 1,
            child: 0,
            total: 1
        }
    });

    // Add state for price range
    const [priceRange, setPriceRange] = useState('£0-£50');

  const navigate = useNavigate();
   
  const passHotelParams = () => {
    // Basic validation
    if (!hotelDestination.city || !hotelDestination.country) {
      alert('Please select a destination');
      return;
    }

    // Calculate number of nights
    const nights = returnDate.diff(departureDate, 'day');
    if (nights < 1) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Prepare the hotel parameters
    const hotelParams = {
      hotelDestination,
      dates: {
        checkIn: departureDate.format('YYYY-MM-DD'),
        checkOut: returnDate.format('YYYY-MM-DD'),
        nights
      },
      roomDetails,
      priceRange,
      totalGuests: roomDetails.guests.adult + roomDetails.guests.child
    };

    // Navigate to booking form with parameters
    navigate('/hotel-booking', { 
      state: hotelParams
    });
  };
    
  return (
    <div className='field_section'> 
    <div className='row g-0 align-items-center'>
      
    <div className='col-lg-3 position-relative'>

          <SearchHotel 
          id="searchHotel"
          source={"Destination"}
          city={hotelDestination.city}
          country={hotelDestination.country}
          styleCss={"field_box"}
          onSelect={setHotelDestination}
          />
       
    </div>

    <div className="col-lg-8">

     <div className="row g-0">

        <div className='col-lg-5'>

        <div className='row g-0'>

        <div className='col-lg-6 position-relative'> 
        <SelectDate
        source={"Check-In"}
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
        source={"Check-Out"}
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

        <div className='col-lg-4 position-relative'>
          <RoomandGuest onUpdate={setRoomDetails} />
        </div>

        <div className='col-lg-3 position-relative'>
        <SelectPrice onPriceChange={setPriceRange} defaultValue={priceRange} />       
        </div>    
      

      </div> 

    </div>

    <div className='col-lg-1'> 
       <div className='btn_wrap'>
         <button onClick={passHotelParams} className='btn btn_search'> SEARCH </button>
       </div>
    </div> 



    </div>
    </div>
  )
}
