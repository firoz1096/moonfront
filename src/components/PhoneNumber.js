
import phone from '../assets/images/gif/phone.gif';

export default function PhoneNumber() {
  return (
    
        <>
        <div className='align-items-start ps-md-0 ps-3'>
          <div><small>Need Help? Call us now</small></div>
      <div className='d-inline-flex align-items-center header_right_top'>
            <div> <img style={{height:'30px'}} src={phone} alt='' /></div>
             <div className='phone_number text-success'> <b>+44 1617959220</b></div>
        </div>  
        </div>
        </>

  )
}
