

import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



export default function DatePickerField() {

        //datepicker depature ui show
         const [depDate, setDepDate] =useState(false)
         //datepicker return ui show
         const [retDate, setRetDate] =useState(false)
        
        
        //set depature date
        const [departureDate, setDepartureDate] = useState(dayjs(new Date()));
        //set return date
        const [returnDate, setReturnDate] = useState(dayjs(new Date()));

        //split depature date into 4 part
        let depDay = departureDate.format('DD'); // Get 2-digit day (01)
        let depMonth = departureDate.format('MMM') + "'"; // Get 3-digit month (Aug')
        let depYear = departureDate.format('YY'); // Get 2-digit year (25)
        let depDayName = departureDate.format('dddd'); // Get day name (Monday)



         //split return date into 4 part
        let retDay = returnDate.format('DD'); // Get 2-digit day (01)
        let retMonth = returnDate.format('MMM') + "'"; // Get 3-digit month (Aug')
        let retYear = returnDate.format('YY'); // Get 2-digit year (25)
        let retDayName = returnDate.format('dddd'); // Get day name (Monday)


      //show ui for depature
      const handleDepCalander = () => {
        setDepDate(true);
    }

    
      //show ui for depature
      const handleRetCalander = () => {
        setRetDate(true);
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

      
     const handleRetDateChange = (newValue2) => {
       //if new date is selected then update departure date
       if (newValue2) {
            depDay = newValue2;
            depMonth = newValue2;
            depYear = newValue2;
            depDayName = newValue2;
        } 

        setReturnDate(newValue2);
        // console.log(newValue);
        setRetDate(false);
      };



      // useEffect(() => {

      //  console.log(departureDate);

    

      // }, [departureDate])
      


  return (


    <div className='row g-0'>

       <div className='col-lg-6 position-relative'> 
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

        </div> 

       <div className='col-lg-6 position-relative'> 
             <div className='field_box' onClick={handleRetCalander} >
           <div className='title'>Return  <IoIosArrowDown className='text-primary'/></div>
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

        </div> 

 
        
    </div>  

    




  );
}
