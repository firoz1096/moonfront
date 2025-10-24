import { useState } from 'react'
import SearchDestination from './controls/SearchDestination'
import PriceRangeslider from './controls/PriceRangeslider';



export default function HolidayWidget() {

        const [holidayDestination, setHolidayDestination] = useState({
            city: "Dubai",
            country: "United Arab Emirates"
        });

        

  return (

    <div className='field_section'> 
    <div className='row g-0 align-items-center'>
      
    <div className='col-lg-5 position-relative'>

   <SearchDestination 
        id="searchdestination"
          source={"Destination"}
          city={holidayDestination.city}
          country={holidayDestination.country}
          styleCss={"field_box"}
          onSelect={setHolidayDestination}

    />
    </div>

    <div className='col-lg-7 position-relative'>
       
      <PriceRangeslider
        source={"Price"}
        />
      
   
    </div>



     </div>
      </div>

 
  )
}
