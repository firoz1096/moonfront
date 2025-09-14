import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from 'react'


export default function SearchBar() {

  
  //show hide component on click
  const [showSearchbar, setshowSearchbar] = useState(false);

  const [productItem, setProductItem] = useState([])
  // initialize the loading state as true
  const [loading, setLoading] = useState(true)
  // initialize the error state as null
  const [error, setError] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [filteredProduct, setFilteredProduct] = useState([])




 useEffect(() => {
  fetch('https://dummyjson.com/products/categories')
    .then(response => response.json())
    .then(data => {
      setProductItem(data)
      setFilteredProduct(data)
      console.log(data)
    })
    .catch(err => {
      console.log(err)
      // update the error state
      setError(err)
    })
    .finally(() => {
      // wether we sucessfully get the users or not, 
      // we update the loading state
      setLoading(false)
    })
}, [])


const handleInputChange = (e) => { 
  const searchTerm = e.target.value;
  setSearchItem(searchTerm)

  // filter the items using the apiUsers state
  const filteredItems = productItem.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilteredProduct(filteredItems);
}



// Handle item click
  const handleItemClick = (item) => {
    setSearchItem(item);
  };
  
  
  return (
   
<>

 <Link className="rT_btn" onClick={() => setshowSearchbar(true)}> <FiSearch /></Link>


 <div className={`searchbar ${showSearchbar ? "d-block" : ""}`} >

<div className='container'>

<div className='row'>

<div className='col-12'>
<div>  {searchItem}</div>
<div>
<table  cellSpacing="0" cellPadding="0" className='animate slideIn'>
          <thead>
          <tr>

            <td>
 
            <input
        type="text" 
        className='form-control'
        id='searchItem'
        placeholder='Type to search' 

        ref={(input) => {input && input.focus() }}  
        
        value={searchItem}
        onChange={handleInputChange}

      />
          
            </td>
           

            
        
    
          </tr>


            </thead>
</table>
</div>

<div className='autocompleteitems'> 
{/* if the data is loading, show a proper message */}
{loading && <p>Loading...</p>}

{/* if there's an error, show a proper message */}
{error && <p>There was an error loading the items</p>}


{/* if it finished loading, render the items */}  
{!loading && !error && filteredProduct.length === 0
  ?  
  <p>Not found</p>

  : 
  
  <ul>

    
    {filteredProduct.slice(0,10).map(item => 
    
    <li key={item}  onClick={() => handleItemClick(item)}>
      {item.name}
      
      </li>    
    )}

  </ul>
}

</div>

</div>

</div>

</div>


</div>

</>


  )
}
