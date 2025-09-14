    import  { useState } from 'react';


export default function SelectRegion() {

const [selectedRegion, setSelectedRegion] = useState(''); // Initialize with an empty string or a default value
    const regions = [
            { id: 'as', name: 'Asia' },
            { id: 'eu', name: 'Europe' },
            { id: 'af', name: 'Africa' },
            { id: 'am', name: 'Americas' },
            ];

  return (
    <div className='d-flex align-items-center'>
        <div><label htmlFor="region-select">Select Region:</label> </div>
        <div>    
       
        <select className='form-control'
          id="region-select"
          value={selectedRegion} // Binds the select's value to the state
          onChange={(e) => setSelectedRegion(e.target.value)} // Updates state on change
        >
          <option value="">Select</option> {/* Optional default option */}
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select></div>
       <div>
         <p>Selected Region: {selectedRegion}</p>
       </div>
      </div>
  )
}
