import { useState, useRef, useEffect } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosMan } from "react-icons/io";
import { FaChild } from "react-icons/fa6";
import { RiHotelBedFill } from "react-icons/ri";




export default function RoomandGuest({ onUpdate }) {

    // show/hide room and guest suggestion widget
    const [showRoomWidget, setShowRoomWidget] = useState(false);
    const roomUIRef = useRef(null);

    const [room, setRoom] = useState(1);
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);

    // Update parent component whenever values change
    useEffect(() => {
        if (onUpdate) {
            onUpdate({
                rooms: room,
                guests: {
                    adult: adult,
                    child: child,
                    total: adult + child
                }
            });
        }
    }, [room, adult, child, onUpdate]);

    const handleRoomData = () => {
        setShowRoomWidget(true); // show room and guest widget
    };


const MAX_ROOMS = 5;
const MAX_GUESTS_PER_ROOM = 8;

const getTotalGuests = () => adult + child;
const getMaxAllowedGuests = () => room * MAX_GUESTS_PER_ROOM;

const incRoom = () => {
    if (room < MAX_ROOMS) {
        setRoom(room + 1);
    }
}

const decRoom = () => {
    if (room > 1 && getTotalGuests() <= (room - 1) * MAX_GUESTS_PER_ROOM) {
        setRoom(room - 1);
    }
}

const incAdult = () => {
    const newTotal = getTotalGuests() + 1;
    if (newTotal <= getMaxAllowedGuests()) {
        setAdult(adult + 1);
    }
}

const decAdult = () => {
    if (adult > room) { // ensure at least one adult per room
        setAdult(adult - 1);
    }
}

const incChild = () => {
    const newTotal = getTotalGuests() + 1;
    if (newTotal <= getMaxAllowedGuests()) {
        setChild(child + 1);
    }
}

const decChild = () => {
    if (child > 0) {
        setChild(child - 1);
    }
}



const handleClickOutside = (event) => {
    if (roomUIRef.current && !roomUIRef.current.contains(event.target)) {
         setShowRoomWidget(false);
    }
  };


    useEffect(() => {
        // Ensure at least one adult per room
        if (adult < room) {
            setAdult(room);
        }
    }, [room, adult]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);
  


  return (

    <>
      <div className={showRoomWidget ? 'field_box active_state' : 'field_box'}  onClick={handleRoomData}>
       <div className='title'>Rooms & Guests <IoIosArrowDown /></div>
        <div className='fieldfirst'>{room} 
            
                {room > 1 ?            
               <span className='fieldsecond'> Rooms</span>  
                : (
                <span className='fieldsecond'> Room</span>
                )}
            
            
             </div>


        <div className='fieldlast'>
             <span>
  
               {adult} {adult === 1 ? "Adult" : "Adults"}{","} {" "}              
               {child} {child === 1 ? "Child" : "Children"}

            </span>
            
            
            </div>  
        </div>


         {showRoomWidget && 

                <div ref={roomUIRef} className='airport_list_suggestion adult_pax_section'>   

                <div className="row align-items-center mb-2">
                    <div className="col-5"> 

                        <div className="d-flex align-items-center">

                            <div className="pax_icon"> <RiHotelBedFill /></div>
                            <div>
                            <div className="pax_title"> Room(s)</div>
                
                            </div>

                        </div>


                    </div>

                    <div className="col-2"> <button onClick={decRoom} disabled={room === 1} className="btn btn-outline-secondary" > <FiMinus />  </button> </div>
                    <div className="col-2 text-center">   {room}  </div>
                     <div className="col-2"> <button onClick={incRoom} disabled={room >= MAX_ROOMS} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
                </div>


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

                    <div className="col-2"> <button onClick={decAdult} disabled={adult <= room} className="btn btn-outline-secondary" > <FiMinus />  </button> </div>
                    <div className="col-2 text-center">   {adult}  </div>
                     <div className="col-2"> <button onClick={incAdult} disabled={getTotalGuests() >= getMaxAllowedGuests()} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
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
                     <div className="col-2"> <button onClick={incChild} disabled={getTotalGuests() >= getMaxAllowedGuests()} className="btn btn-outline-secondary"> <FiPlus /> </button> </div>
               
               
                </div>

                <div>
                    <hr />
                    {getTotalGuests() >= getMaxAllowedGuests() && (
                        <div className="text-danger small mb-2">
                            {`Maximum guest capacity reached (${getTotalGuests()} / ${getMaxAllowedGuests()} guests)`}
                        </div>
                    )}
                    <div className="text-end">
                        <button onClick={() => { setShowRoomWidget(false)}} className="btn btn-sm text-primary"> Apply </button>
                    </div>
                </div>

                </div> 

            }



    </>


  )
}
