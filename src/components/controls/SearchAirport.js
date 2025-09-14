import { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import { AirportData } from '../../data/AirportData';

export default function SearchAirport({source, city, citycode, airport, id, styleCss, onSelect}) {
  //data airport 
  const [airportList, setAirportList] = useState([])


    const airportUIRef = useRef(null);
    
    // show/hide airport suggestion widget
    const [showAirportWidget, setShowAirportWidget] = useState(false);


    const [search, setSearch] = useState("");
   
    //from
    const [airportCity, setAirportCity] = useState(city);
    const [airportCode, setAirportCode] = useState(citycode);
    const [airportName, setAirportName] = useState(airport);

    // Update local state when props change
    useEffect(() => {
        setAirportCity(city);
        setAirportCode(citycode);
        setAirportName(airport);
    }, [city, citycode, airport]);

  // Filter data by city and city code.
  const filterAirport = airportList.filter(item => item.city.toString().toLowerCase().includes(search.toString().toLowerCase())
|| item.citycode.toString().toLowerCase().includes(search.toString().toLowerCase()) ||
item.airport.toString().toLowerCase().includes(search.toString().toLowerCase())

)

const handleAirportList = ()=> {
    setShowAirportWidget(true); //show airport Widget  
} 


// Handle item click
  const handleItemClick = (item) => {
    setShowAirportWidget(false) //hide airport Widget  
   
    //show selected airport items
    setAirportCity(item.city)
    setAirportCode(item.citycode)
    setAirportName(item.airport)
    
    // Notify parent component of the change
    if (onSelect) {
        onSelect({
            city: item.city,
            citycode: item.citycode,
            airport: item.airport
        });
    }
    
    setSearch('') //clear input field after selection.
  };
  

const handleClickOutside = (event) => {
    if (airportUIRef.current && !airportUIRef.current.contains(event.target)) {
      setShowAirportWidget(false);
    }
  };



  useEffect(() => {

  setAirportList(AirportData)

    //hide airport widget if click outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

   
}, [airportList])



  return (
   
    <>

            <div id={id} className={showAirportWidget ? `${styleCss} active_state` : `${styleCss}`}  onClick={handleAirportList}>
           <div className='title'>{source}</div>
            <div className='fieldfirst trim_text'> {airportCity}</div>
            <div className='fieldlast trim_text'>{airportCode}, {airportName}</div>  
            </div>
       
           
            {showAirportWidget && 
            <div ref={airportUIRef} className='airport_list_suggestion'>     
          
    
           <div className='mb-2'> <InputField id={'search_airport'} value={search} onChange={(e) => setSearch(e.target.value)}   /></div>
    
            <div className='list_show'> 
                    <ul>
                    {filterAirport.slice(0, 10).map((item, index) => (
                      <li key={index} onClick={() => handleItemClick(item)}>
                      
                      <div className='d-flex align-items-center'>
                        <div>{item.city} </div>
                        <div className='ms-auto city_code'> <b>{item.citycode}</b> </div>
                      </div>
                      <div className='text-muted airport_name'><p>{item.airport}</p></div>
                     
                        </li>
                    ))}
                    {filterAirport.length === 0 && <li>No results found.</li>}
    
    
    
           
                  </ul>
    
    
            </div>
              
              </div>
          }
    
    
    </>
  )
}
