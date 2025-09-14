import { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import { AirlineData } from '../../data/AirlineData';
import { IoIosArrowDown } from "react-icons/io";
export default function SearchAirline({source, airlinecode, airlinename, id, styleCss, onSelect}) {
 
    //data airport 
  const [airlineList, setAirlineList] = useState([])

    const airlineUIRef = useRef(null);

    // show/hide airline suggestion widget
    const [showAirlineWidget, setShowAirlineWidget] = useState(false);


    const [search, setSearch] = useState("");
   
    //from
    const [airlineCode, setAirlineCode] = useState("");
    const [airlineName, setAirlineName] = useState("");

    // Update local state when props change
    useEffect(() => {

        setAirlineCode(airlinecode);
        setAirlineName(airlinename);
    }, [airlinename, airlinecode]);



    
//filter airlines starts
const searchValue = search?.toString().toLowerCase() || "";

const filteredAirlines = airlineList.filter(item => {
  const name = item.airlinename?.toLowerCase() || "";
  const code = item.airlinecode?.toLowerCase() || "";
  return name.includes(searchValue) || code.includes(searchValue);
});
//filter airlines ends

const handleAirportList = ()=> {
    setShowAirlineWidget(true); //show airline Widget  
} 


// Handle item click
  const handleItemClick = (item) => {
    setShowAirlineWidget(false) //hide airline Widget  

    //show selected airline items
    setAirlineCode(item.airlinecode)
    setAirlineName(item.airlinename)

    // Notify parent component of the change
    if (onSelect) {
        onSelect({
            airlinecode: item.airlinecode,
            airlinename: item.airlinename
        });
    }
    
    setSearch('') //clear input field after selection.
  };
  

const handleClickOutside = (event) => {
    if (airlineUIRef.current && !airlineUIRef.current.contains(event.target)) {
      setShowAirlineWidget(false);
    }
  };



  useEffect(() => {

  setAirlineList(AirlineData)

    //hide airline widget if click outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

   
}, [airlineList])



  return (
   
    <>

            <div id={id} className={showAirlineWidget ? `${styleCss} active_state` : `${styleCss}`}  onClick={handleAirportList}>
           <div className='title'>{source} <IoIosArrowDown/></div>
            <div className='fieldfirst trim_text'> {airlineName}</div>
            <div className='fieldlast trim_text'>{airlineCode}</div>  
            </div>


            {showAirlineWidget &&
            <div ref={airlineUIRef} className='airport_list_suggestion'>

           <div className='mb-2'> <InputField id={'search_airline'} value={search} onChange={(e) => setSearch(e.target.value)}   /></div>

            <div className='list_show'>
                    <ul>
                    {filteredAirlines.slice(0, 10).map((item, index) => (
                      <li key={index} onClick={() => handleItemClick(item)}>
                      
                      <div className='d-flex align-items-center'>
                        <div> {item.airlinename}</div>
                        <div className='ms-auto city_code'> <b>{item.airlinecode}</b> </div>
                      </div>
                      <div className='text-muted airport_name'><p></p></div>

                        </li>
                    ))}
                    {filteredAirlines.length === 0 && <li>No results found.</li>}
                  </ul>
    
    
            </div>
              
              </div>
          }
    
    
    </>
  )
}
