import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PiCallBellFill } from "react-icons/pi";
import { FaCalendarAlt } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useRef } from 'react';
// import emailjs from '@emailjs/browser';
import { MdFlightTakeoff, MdFlightLand} from "react-icons/md";
import RightInfoIcons from '../components/RightInfoIcons';

function FlightBookingForm() {
     
const form = useRef(); //To send email
const location = useLocation();
  
 const receivedFlightParams = location.state; // Access the passed state

 
   const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_message: ''
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thankMessage, setThankMessage] = useState(false);

//   bind city, airport and citycode
  const fromCity = receivedFlightParams.fromLocation.city;
  const fromCitycode = receivedFlightParams.fromLocation.citycode;
  const fromAirport = receivedFlightParams.fromLocation.airport;
  const departureAirport = fromCity + "," + fromCitycode + "," + fromAirport;

  const toCity = receivedFlightParams.toLocation.city;
  const toCitycode = receivedFlightParams.toLocation.citycode;
  const toAirport = receivedFlightParams.toLocation.airport;
  const arrivalAirport = toCity + "," + toCitycode + "," + toAirport;

  
 //create states
  const [fromDestination, setFromDestination] = useState(departureAirport);
  const [toDestination, setToDestination] = useState(arrivalAirport);
  const [departureDate, setDepartureDate] = useState(receivedFlightParams.departureDate);
  const [returnDate, setReturnDate] = useState(receivedFlightParams.returnDate);

  const [adult, setAdult] = useState(receivedFlightParams.passengers.adult);
  const [children, setChildren] = useState(receivedFlightParams.passengers.child);
  const [infant, setInfant] = useState(receivedFlightParams.passengers.infant);
  const [tripType, setTripType] = useState(receivedFlightParams.tripType);
  const [flightClass, setFlightClass] = useState(receivedFlightParams.class);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  //validate input fields
  const validateForm = () => {

    const newErrors = {};
    
    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.user_email)) {
      newErrors.user_email = 'Invalid email address';
    }

    if (!formData.user_phone.trim()) {
      newErrors.user_phone = 'Phone is required';
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.user_phone)) {
      newErrors.user_phone = 'Invalid phone number';
    }

    if (formData.user_message && formData.user_message.length > 500) {
      newErrors.user_message = 'Message is too long (max 500 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }


  };


  const handleSubmit = async (e) => {
   
    e.preventDefault();
   if (!validateForm()) return;
     
    setIsSubmitting(true);  
     setThankMessage(false);
     
     // save data to API
    try {  
      await axios.post('http://localhost:5000/post-flight-enquiry', 
        {fromDestination, toDestination, departureDate, returnDate, adult, children, infant, tripType, flightClass, name, email, phone, message}
       )
       
        // alert('Form submitted successfully!');      
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          user_message: ''
        });

      
      //send email 
     //  emailjs
     //  .sendForm('service_8ri3uot', 'template_7gsnoxi', form.current, {
     //    publicKey: 'Ycm97QAUQg63XeOZ4',
     //  })
     //  .then(
     //    () => {
     //      console.log('SUCCESS!');
     //    },
     //    (error) => {
     //      console.log('FAILED...', error.text);
     //    },
     //  );
      //send email ends.


    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
      setThankMessage(true);    
    }



  };

  const handleWhatsAppQuote = () => {
    
if (!validateForm()) return;

const message = `Hi, I'd like to get a quote for:
From: ${departureAirport}
To: ${arrivalAirport}
Departure: ${receivedFlightParams.departureDate}
Return: ${receivedFlightParams.returnDate}
Class: ${receivedFlightParams.flightClass}
Trip Type: ${receivedFlightParams.tripType}
Travellers: ${receivedFlightParams.adult + receivedFlightParams.children + receivedFlightParams.infants}
Name: ${formData.user_name}
Message: ${formData.user_message}`;

const encodedMessage = encodeURIComponent(message);
window.open(`https://wa.me/00917275591984?text=${encodedMessage}`, '_blank');

  };



  if (!receivedFlightParams) {
    return <p>No parameters received.</p>;
  }


  return (
    <> 
 <MainLayout>
    <div className='form_booking_details'>
      <div className="container">
     
        <div className="row">
       
         <div className="col-lg-8">
            <h2 className='text-white'><PiCallBellFill style={{color:'yellow'}} />Lowest Fare Secured – Final Step!</h2>
            <h5 className='mt-3 mb-4 text-white'>Lock in your special fare now – exclusive discounts available for a limited time. </h5>


   {thankMessage ? 
            
           <>
          <div className="fbd_fields me-lg-4">
          <div className='col-lg-8 offset-lg-2 mt-3 mb-3'>
              <div className="fbd_fields me-lg-4 text-center shadow">
                <div className='text-success' style={{fontSize: '3rem'}}><IoCheckmarkSharp /></div>
                <h2>Thank you For The Request!</h2>
                <p className='mb-2'>You will get a reply from us shortly.</p>
                <Link className='btn btn-lg btn-primary' to="/">Go to Homepage</Link>
              </div>
            </div>
          </div>
           </>
                        
            : 
            
          <>

          <form ref={form} onSubmit={handleSubmit} noValidate>
          
              <div className="fbd_fields bg-gradient me-lg-4">
                <div className='row'>
                    <h5 className='mb-4'>Please share your contact to confirm today's best deal.</h5>
                
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="from" className="form-label">From</label>
                      <input 
                       value={`${receivedFlightParams.fromLocation.city}, ${receivedFlightParams.fromLocation.airport}`}
                        onChange={(e) => {setFromDestination(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="from"
                        name='from' 
                        disabled={true} 
                      />
                    </div>
                  </div>

                    <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="to" className="form-label">To</label>
                      <input 
                        value={`${receivedFlightParams.toLocation.city}, ${receivedFlightParams.toLocation.airport}`}
                        onChange={(e) => {setToDestination(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="to"
                        name='to' 
                      disabled={true} 
                      />
                    </div>
                  </div>

               <div className='d-none'>
                   
               <input value={receivedFlightParams.fromLocation.airport}
                         type="text" 
                        id="fromAirport"
                        name='fromAirport'
                        readOnly
                      />

                    <input value={receivedFlightParams.toLocation.airport}
                         type="text" 
                        id="toAirport"
                        name='toAirport'
                        readOnly
                      />

                   
                     <input value={receivedFlightParams.passengers.adult}
                        onChange={(e) => {setAdult(e.target.value)}}
                        type="text" 
                        id="adult"
                        name='adult'
                        readOnly
                      />

                         <input value={receivedFlightParams.passengers.child}
                        onChange={(e) => {setChildren(e.target.value)}}
                        type="text" 
                        id="child"
                        name='child'
                        readOnly
                      />

                    <input value={receivedFlightParams.passengers.infant}
                        onChange={(e) => {setInfant(e.target.value)}}
                        type="text" 
                        id="infant"
                        name='infant'
                        readOnly
                      />


                    <input value={receivedFlightParams.departureDate}
                        onChange={(e) => {setDepartureDate(e.target.value)}}
                        type="text" 
                        id="departureDate"
                        name='departureDate'
                        readOnly
                      />

                      
                    <input value={receivedFlightParams.returnDate}
                        onChange={(e) => {setReturnDate(e.target.value)}}
                        type="text" 
                        id="returnDate"
                        name='returnDate'
                        readOnly
                      />

                    <input value={receivedFlightParams.tripType}
                        onChange={(e) => {setTripType(e.target.value)}}
                        type="text" 
                        id="tripType"
                        name='tripType'
                        readOnly
                      />

               <input value={receivedFlightParams.flightClass}
                        onChange={(e) => {setFlightClass(e.target.value)}}
                        type="text" 
                        id="flightClass"
                        name='flightClass'
                        readOnly
                      />

               </div>


                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="user_name" className="form-label">Name <span className="text-danger">*</span></label>
                      <input 
                        placeholder='Enter your name'
                        type="text" 
                        className="form-control" 
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        required
                        aria-required="true"
                        autoComplete="name"
                        // onChange={handleInputChange}

                          onChange={(e) => {
                            handleInputChange(e);
                            setName(e.target.value);
                          }}
                                            
                        aria-invalid={errors.user_name ? "true" : "false"}
                      />
                      {errors.user_name && <div className="invalid-feedback d-block">{errors.user_name}</div>}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="user_email" className="form-label">Email <span className="text-danger">*</span></label>
                      <input 
                        placeholder='Enter your email'
                        type="email" 
                        className="form-control" 
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        required
                        aria-required="true"
                        autoComplete="email"
                        // onChange={handleInputChange}
                            onChange={(e) => {
                            handleInputChange(e);
                            setEmail(e.target.value);
                          }}
                          
                        aria-invalid={errors.user_email ? "true" : "false"}
                      />
                      {errors.user_email && <div className="invalid-feedback d-block">{errors.user_email}</div>}
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="phuser_phoneone" className="form-label">Phone <span className="text-danger">*</span></label>
                      <input 
                        placeholder='Enter your phone number'
                        type="tel" 
                        className="form-control" 
                        id="user_phone"
                        name="user_phone"
                        value={formData.user_phone}
                        required
                        aria-required="true"
                        autoComplete="tel"
                        // onChange={handleInputChange}
                                    onChange={(e) => {
                            handleInputChange(e);
                            setPhone(e.target.value);
                          }}
                        aria-invalid={errors.user_phone ? "true" : "false"}
                      />
                      {errors.user_phone && <div className="invalid-feedback d-block">{errors.user_phone}</div>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label htmlFor="user_message" className="form-label">Message</label>
                      <textarea 
                        className="form-control" 
                        id="user_message"
                        name="user_message"
                        value={formData.user_message}
                        rows="3"
                        // onChange={handleInputChange}
                            onChange={(e) => {
                            handleInputChange(e);
                            setMessage(e.target.value);
                          }}

                        aria-invalid={errors.user_message ? "true" : "false"}
                      ></textarea>
                      {errors.user_message && <div className="invalid-feedback d-block">{errors.user_message}</div>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <button 
                      type="submit"
                      className="btn btn-lg btn-primary me-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        'Get Free Quote'
                      )}
                    </button>
                  

                    <button  type="button" className="btn btn-lg btn-success"  
                    onClick={handleWhatsAppQuote} >
                    <BsWhatsapp/> Get Free Quote on WhatsApp </button>

                  </div>
                </div>
              </div>

          </form>   

          </>
                      
          }

          </div>
     

          <div className="col-lg-4">

            <div className="fbd_fields text-center">
              <h6>Booking Details</h6>
              <hr/>
              <div className='row '>
                <div className="col-6 mb-3">
                  <div><b>From</b></div>
                  <div className='align-items-center d-flex justify-content-center'>
                   <MdFlightTakeoff className='fs-4 me-1' />
                          {receivedFlightParams.fromLocation.city} 
                  </div>
                   <div className='lh-1 text-muted'> <small> ({receivedFlightParams.fromLocation.airport})</small></div>
                </div>

                    <div className="col-6 mb-3">
                  <div><b>To</b></div>
                  <div className='align-items-center d-flex justify-content-center'>
                     <MdFlightLand className='fs-4 me-1' /> {receivedFlightParams.toLocation.city} 
                  </div>
                   <div className='lh-1 text-muted'> <small> ({receivedFlightParams.toLocation.airport})</small></div>
                 </div>


             <div className={`col-lg-6 mb-2 ${!receivedFlightParams.returnDate ? "col-lg-12 mb-2" : ""}`}>
                  <div><b>Departure</b></div>
                  <div><FaCalendarAlt/> {receivedFlightParams.departureDate}</div>
                </div>


               {receivedFlightParams.returnDate ? (  
                         <>
                         <div className="col-6 mb-3">
                                        <div><b>Return</b></div>
                                        <div><FaCalendarAlt/> {receivedFlightParams.returnDate}</div>
                         </div>
                         </> 
               ) : null}

              
                <div className="col-12">
                  <p> <b>Travellers: </b> 
                  

                   {receivedFlightParams.passengers.adult > 1 ?            
                <>{receivedFlightParams.passengers.adult} Adults,</>
                : (
                <> {receivedFlightParams.passengers.adult} Adult,</>
                )} 
                
                    {" "}

                  {receivedFlightParams.passengers.child} {receivedFlightParams.passengers.child === 1 ? "Child" : "Children"}

                    {", "}
                
                {receivedFlightParams.passengers.infant > 1 ?            
                <> {receivedFlightParams.passengers.infant} Infants</>
                : (
                <> {receivedFlightParams.passengers.infant} Infant</>
                )}
                    </p>

                  

                </div>

               <div className='col-12 mb-3'>
                    <div className='row align-items-center'>
                                <div className="col-6">
                  <div><b>Trip Type:</b>  {receivedFlightParams.tripType}</div>
                 
                </div>
               
               <div className="col-6">
                  <div><b>Class: </b>{receivedFlightParams.class} </div>
                </div>
                    </div>
               </div>

                {/* <hr/>

                <div className="col-12">
                  <button className='btn p-0'><FaRegEdit /> Edit</button>
                </div> */}
              </div>
            </div>

                  <div>  <RightInfoIcons /> </div>

                   
                 


          </div>
        </div>
        

      </div>
    </div>

</MainLayout>
</>

  )
}

export default FlightBookingForm