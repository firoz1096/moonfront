
import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



export default function ReturnCalendar() {

         //datepicker return ui show
         const [retDate, setRetDate] =useState(false)

        //set return date
        const [returnDate, setReturnDate] = useState(dayjs().add(1, 'day'));

         //split return date into 4 part
        let retDay = returnDate.format('DD'); // Get 2-digit day (01)
        let retMonth = returnDate.format('MMM') + "'"; // Get 3-digit month (Aug')
        let retYear = returnDate.format('YY'); // Get 2-digit year (25)
        let retDayName = returnDate.format('dddd'); // Get day name (Monday)
    
      //show ui for depature
      const handleRetCalander = () => {
        setRetDate(true);
    }
  

      
     const handleRetDateChange = (newValue2) => {
       //if new date is selected then update departure date
       if (newValue2) {
            retDay = newValue2;
            retMonth = newValue2;
            retYear = newValue2;
            retDayName = newValue2;
        } 

        setReturnDate(newValue2);
        // console.log(newValue);
        setRetDate(false);
      };



  return (


<>
             <div className='field_box' onClick={handleRetCalander} >
           <div className='title'>Return  <IoIosArrowDown /></div>
            <div className='fieldfirst'>{retDay} <span className='fieldsecond'>{retMonth}{retYear}</span> </div>
            <div className='fieldlast'>{retDayName}</div>  
            </div>
        
            {retDate &&

              <div className='calendar_display'>      
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    open={true} 
                    disablePast={true}
                    defaultValue={dayjs(new Date())} 
                    value={returnDate}
                    onChange={handleRetDateChange}
                    />
                </LocalizationProvider> 
              </div>

            }

</>

    




  );
}
