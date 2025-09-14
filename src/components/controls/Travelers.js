import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosMan } from "react-icons/io";
import { FaChild } from "react-icons/fa6";
import SelectClass from "./SelectClass";


export default function Travelers({ onUpdate }) {

    // show/hide airport suggestion widget
    const [showPaxWidget, setShowPaxWidget] = useState(false);
    
    const paxUIRef = useRef(null);

    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);
    const [selectedClass, setSelectedClass] = useState('Economy');
    
    //calculate pax
    let  pax = adult + child + infant;

    // Update parent component whenever values change
    useEffect(() => {
        if (onUpdate) {
            onUpdate({
                passengers: {
                    adult,
                    child,
                    infant,
                    total: pax
                },
                selectedClass
            });
        }
    }, [adult, child, infant, selectedClass, pax, onUpdate]);


const handlePaxData = ()=> {
    setShowPaxWidget(true); //show pax Widget     
} 


const incAdult = () => {
    setAdult(adult +1)
}

const decAdult = () => {
    setAdult(adult -1)
}

const incChild = () => {
    setChild(child +1)
}

const decChild = () => {
    setChild(child -1)
    
}


const incInfant = () => {
    setInfant(infant +1)
}

const decInfant = () => {
    setInfant(infant -1)
}

const handleClickOutside = (event) => {
    if (paxUIRef.current && !paxUIRef.current.contains(event.target)) {
         setShowPaxWidget(false);
    }
  };



  useEffect(() => {
   
    
   
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }

   
}, [adult, child, infant, pax])




  return (
    
    <>
    <div className={showPaxWidget ? 'field_box active_state' : 'field_box'}  onClick={handlePaxData}>
       <div className='title'>Travellers & Class <IoIosArrowDown /></div>
        <div className='fieldfirst'>{pax} 
                     
                {pax > 1 ?            
               <span className='fieldsecond'> Travellers</span>  
                : (
                <span className='fieldsecond'> Traveller</span>
                )}
            
            </div>
        <div className='fieldlast'>{selectedClass}</div>  
        </div>

            {showPaxWidget && 

                <div ref={paxUIRef} className='airport_list_suggestion adult_pax_section'>   

                <div className="row align-items-center mb-2">
                    <div className="col-5"> 

                        <div className="d-flex align-items-center">

                            <div className="pax_icon"> <IoIosMan/></div>
                            <div>
                            <div className="pax_title"> Adults</div>
                              <div className="pax_age">{">"} 12 years</div>
                            </div>

                        </div>


                    </div>

                    <div className="col-2"> <button onClick={decAdult} disabled={adult === 1} className="btn btn-outline-secondary" > <FiMinus />  </button> </div>
                    <div className="col-2 text-center">   {adult}  </div>
                     <div className="col-2"> <button onClick={incAdult} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
                </div>

                <div className="row align-items-center mb-2">
                    <div className="col-5"> 

                        <div className="d-flex align-items-center">

                            <div className="pax_icon"> <FaChild/></div>
                            <div>
                            <div className="pax_title"> Children</div>
                              <div className="pax_age"> 2-12 years</div>
                            </div>

                        </div>


                    </div>

                    <div className="col-2"> <button onClick={decChild} disabled={child === 0} className="btn btn-outline-secondary"> <FiMinus />  </button> </div>
                    <div className="col-2 text-center">   {child}  </div>
                     <div className="col-2"> <button onClick={incChild} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
                </div>

                <div className="row align-items-center mb-2">
                    <div className="col-5"> 

                        <div className="d-flex align-items-center">

                            <div className="pax_icon"> <FaChild/></div>
                            <div>
                            <div className="pax_title"> Infants</div>
                              <div className="pax_age"> {"<2"} years</div>
                            </div>

                        </div>


                    </div>

                    <div className="col-2"> <button  onClick={decInfant} disabled={infant === 0} className="btn btn-outline-secondary"> <FiMinus />  </button> </div>
                    <div className="col-2 text-center">  {infant}  </div>
                     <div className="col-2"> <button onClick={incInfant} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
                </div>

                <div className="mt-3">
                    <SelectClass source={"Choose Travel Class"} onClassChange={setSelectedClass} />
                </div>

                <div className="text-end">
                <hr />
                <button onClick={() => { setShowPaxWidget(false)}} className="btn btn-sm text-primary"> Apply </button>

                </div>

                </div> 

            }
    </>
  )
}
