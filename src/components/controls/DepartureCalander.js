
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



export default function DepartureCalander() {

        //datepicker depature ui show
         const [depDate, setDepDate] =useState(false)

        //set depature date
        const [departureDate, setDepartureDate] = useState(dayjs(new Date()));


        //split depature date into 4 part
        let depDay = departureDate.format('DD'); // Get 2-digit day (01)
        let depMonth = departureDate.format('MMM') + "'"; // Get 3-digit month (Aug')
        let depYear = departureDate.format('YY'); // Get 2-digit year (25)
        let depDayName = departureDate.format('dddd'); // Get day name (Monday)


      //show ui for depature
      const handleDepCalander = () => {
        setDepDate(true);
    }

    

     const handleDepDateChange = (newValue) => {
       //if new date is selected then update departure date
       if (newValue) {
            depDay = newValue;
            depMonth = newValue;
            depYear = newValue;
            depDayName = newValue;
        } 

        setDepartureDate(newValue);
        // console.log(newValue);
        setDepDate(false);
      };

    

  return (


    <>
    
               <div className='field_box' onClick={handleDepCalander} >
           <div className='title'>Departure  <IoIosArrowDown /></div>
            <div className='fieldfirst'>{depDay} <span className='fieldsecond'>{depMonth}{depYear}</span> </div>
            <div className='fieldlast'>{depDayName}</div>  
            </div>
        
            {depDate &&

              <div className='calendar_display'>      
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    open={true} 
                    disablePast={true}
                    defaultValue={dayjs(new Date())} 
                    value={departureDate}
                    onChange={handleDepDateChange}
                    />
                </LocalizationProvider> 
              </div>

            } 
    
    </>
    




  );
}
