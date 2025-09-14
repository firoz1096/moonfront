
import { FaAngleRight } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


export default function UmrahDealCard({ price, city, noOfDays, title, shortDes, thumbnail, hotelRating  }) {
  return (

    <div className="card h-100">
    <img
    src={thumbnail}
    alt={title}
    className="card-img-top"
    />
           <div className="position-absolute end-0">{[...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < hotelRating ? "text-warning" : "text-muted"} /> ))}   
      </div>
    <div className="card-body">
    <div className="noOfDays rounded"> 
       <div className="row align-items-center text-white">
        <div className="col-6 text-end"><FaLocationDot /> {city}   </div>
        <div className="col-6 text-start"><FaRegCalendarCheck /> {noOfDays} Days    </div>
        </div>         
    </div>
      

    <div className='row align-items-center'>

    <div className='col-12'>
    <h5>{title}</h5>
    </div>

    <div className='col-12'>
        {shortDes}
    </div>


    <div className='col-12 mt-2'>
    <div className='d-flex align-items-center'>
    <div><small>Starting from</small></div>
    <div className='ms-auto text-primary fs-5'>
  
      £<b>{price}</b> <FaAngleRight />
    
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
                     
  );
}
