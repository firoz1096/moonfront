import { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import { HotelData } from '../../data/HotelData';
import { CiLocationOn } from "react-icons/ci";


export default function SearchHotel({source, city, country, id, styleCss, onSelect}) {
  //data hotel 
  const [hotelCityList, setHotelList] = useState([])

    const hotelUIRef = useRef(null);
    
    // show/hide hotel suggestion widget
    const [showHotelWidget, setShowHotelWidget] = useState(false);

    const [search, setSearch] = useState("");
   
    //from
    const [cityName, setCityName] = useState(city);
    const [countryName, setCountryName] = useState(country);

    // Update local state when props change
    useEffect(() => {
        setCityName(city);
        setCountryName(country);
    }, [city, country]);


  // Filter data by city and city code.
  const filterHotel = hotelCityList.filter(item => item.city.toString().toLowerCase().includes(search.toString().toLowerCase())

)

const handleAirportList = ()=> {
    setShowHotelWidget(true); //show hotel Widget  
} 



// Handle item click
  const handleItemClick = (item) => {
    setShowHotelWidget(false) //hide hotel Widget  

    //show selected hotel items
    setCityName(item.city)
    setCountryName(item.country)
    
    // Notify parent component of the change
    if (onSelect) {
        onSelect({
            city: item.city,
            country: item.country        
        });
    }
    
    setSearch('') //clear input field after selection.
  };
  

const handleClickOutside = (event) => {
    if (hotelUIRef.current && !hotelUIRef.current.contains(event.target)) {
      setShowHotelWidget(false);
    }
  };



  useEffect(() => {

  setHotelList(HotelData)
    //hide hotel widget if click outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

   
}, [hotelCityList])



  return (
   
    <>

           <div id={id} className={showHotelWidget ? `${styleCss} active_state` : `${styleCss}`}  onClick={handleAirportList}>
           <div className='title'>{source}</div>
            <div className='fieldfirst trim_text'> {cityName}</div>
            <div className='fieldlast trim_text'> {countryName}</div>  
            </div>
         

            {showHotelWidget && 
            <div ref={hotelUIRef} className='airport_list_suggestion'>     
              
           <div className='mb-2'> <InputField id={'search_airport'} value={search} onChange={(e) => setSearch(e.target.value)}   /></div>
    
            <div className='list_show'> 
                    <ul>
                    {filterHotel.slice(0, 10).map((item, index) => (
                      <li key={index} onClick={() => handleItemClick(item)}>
                      
                        <div><CiLocationOn />{item.city} </div>
                      <div className='text-muted airport_name'><p>City in {item.country}</p></div>
                     
                        </li>
                    ))}
                    {filterHotel.length === 0 && <li>No results found.</li>}

          
                  </ul>
    
    
            </div>
              
              </div>
          }
    
    
    </>
  )
}
