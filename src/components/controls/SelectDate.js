
import { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export default function SelectDate({source, date, onDateChange}) {
        const [showDatePickerUi, setShowDatePickerUi] = useState(false)
        const [datepicker, setDatepicker] = useState(date)

        //split depature date into 4 part
        let day = datepicker.format('DD'); // Get 2-digit day (01)
        let month = datepicker.format('MMM') + "'"; // Get 3-digit month (Aug')
        let year = datepicker.format('YY'); // Get 2-digit year (25)
        let dayName = datepicker.format('dddd'); // Get day name (Monday)


      //show ui for depature
      const handleDepCalander = () => {
        setShowDatePickerUi(true);
         
    }

    

     const handleDepDateChange = (newValue) => {
       if (newValue) {
         setDatepicker(newValue);
         onDateChange(newValue);
       }
       setShowDatePickerUi(false);
     };

      useEffect(() => {
        setDatepicker(date);
      }, [date])
      
    

  return (


    <>
    
        <div className={showDatePickerUi ? 'field_box active_state' : 'field_box'} onClick={handleDepCalander} >
           <div className='title'>{source}  <IoIosArrowDown /></div>
            <div className='fieldfirst'>{day}<span className='fieldsecond'>{month}{year}</span> </div>
            <div className='fieldlast'>{dayName}</div>  
            </div>

            {showDatePickerUi &&


              <div className='calendar_display'>      
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    open={true} 
                    onClose={() => setShowDatePickerUi(false)}
                    disablePast={true}
                    value={datepicker}
                    minDate={source === "Return" || "Check-Out" ? date : undefined}
                    onChange={handleDepDateChange}
                   

                    />
                </LocalizationProvider> 
              </div>

            } 
    
    </>
    




  );
}
