import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PiCallBellFill } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import RightInfoIcons from '../components/RightInfoIcons';
function HotelBookingForm() {

  const form = useRef(); //To send email

  const location = useLocation();
  const receivedHotelParams = location.state;
  
   const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    user_message: ''
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [thankMessage, setThankMessage] = useState(false);

 //create states
  const [destination, setDestination] = useState(receivedHotelParams.hotelDestination.city);
  const [country, setCountry] = useState(receivedHotelParams.hotelDestination.country);
  const [checkIn, setCheckIn] = useState(receivedHotelParams.dates.checkIn);
  const [checkOut, setCheckOut] = useState(receivedHotelParams.dates.checkOut);
  const [room, setRoom] = useState(receivedHotelParams.roomDetails.rooms);
  const [adult, setAdult] = useState(receivedHotelParams.roomDetails.guests.adult);
  const [children, setChildren] = useState(receivedHotelParams.roomDetails.guests.child);
  
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
      await axios.post('http://localhost:5000/post-hotel-enquiry', 
        {destination, country, checkIn, checkOut, room, adult, children, name, email, phone, message}
       )
       
        // alert('Form submitted successfully!');      
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          user_message: ''
        });

      
      //send email 
      emailjs
      .sendForm('service_8ri3uot', 'template_7gsnoxi', form.current, {
        publicKey: 'Ycm97QAUQg63XeOZ4',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
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
Destination: ${receivedHotelParams.hotelDestination.city}, ${receivedHotelParams.hotelDestination.country}
Check-in: ${receivedHotelParams.dates.checkIn}
Check-out: ${receivedHotelParams.dates.checkOut}
Guests: ${receivedHotelParams.roomDetails.guests.adult + receivedHotelParams.roomDetails.guests.child}
Rooms: ${receivedHotelParams.roomDetails.rooms}

Name: ${formData.user_name}
Message: ${formData.user_message}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/00919305909271?text=${encodedMessage}`, '_blank');
  };


  if (!receivedHotelParams) {
    return <p>No parameters received.</p>;
  }

  return (
    <> 
 <MainLayout>
    <div className='form_booking_details'>
      <div className="container">
     
        <div className="row">
       
         <div className="col-lg-8">
            <h2 className='text-white'><PiCallBellFill style={{color:'yellow'}} /> Lowest Hotel Prices Found – Act Fast!</h2>
            <h3 className='mt-3 mb-4 text-white'>Rooms are filling up quickly. </h3>


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
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label htmlFor="destination" className="form-label">Destination</label>
                      <input 
                        value={receivedHotelParams.hotelDestination.city} 
                        onChange={(e) => {setDestination(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="destination"
                        name='destination'
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 d-none">
                    <div className="mb-3">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input 
                        value={receivedHotelParams.hotelDestination.country} 
                        onChange={(e) => {setCountry(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="country"
                        name='country'
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label htmlFor="checkin" className="form-label">Check-in</label>
                      <input 
                        value={receivedHotelParams.dates.checkIn} 
                        onChange={(e) => {setCheckIn(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="checkin"
                        name='checkin' 
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-4">
            <div className="mb-3">
                      <label htmlFor="checkout" className="form-label">Check-out</label>
                      <input 
                        value={receivedHotelParams.dates.checkOut} 
                        onChange={(e) => {setCheckOut(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="checkout"
                        name='checkout'
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 d-none">
                    <div className="mb-3">
                      <label htmlFor="room" className="form-label">No. of Room(s)</label>
                      <input 
                        value={receivedHotelParams.roomDetails.rooms} 
                        onChange={(e) => {setRoom(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="room"
                        name='room'
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 d-none">
                    <div className="mb-3">
                      <label htmlFor="adult" className="form-label">Adult(s)</label>
                      <input 
                        value={receivedHotelParams.roomDetails.guests.adult} 
                        onChange={(e) => {setAdult(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="adult"
                        name='adult'
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 d-none">
                    <div className="mb-3">
                      <label htmlFor="children" className="form-label">Children</label>
                      <input 
                        value={receivedHotelParams.roomDetails.guests.child} 
                        onChange={(e) => {setChildren(e.target.value)}}
                        type="text" 
                        className="form-control" 
                        id="children"
                        name='children' 
                        readOnly
                      />
                    </div>
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
              <div className='row align-items-center'>
                <div className="col-12 mb-3">
                  <div><b>Destination</b></div>
                  <div className='align-items-center d-flex justify-content-center'>
                    <CiLocationOn />{receivedHotelParams.hotelDestination.city}, {receivedHotelParams.hotelDestination.country}
                  </div>
                </div>

                <div className="col-6">
                  <div><b>Check-in Date</b></div>
                  <div><FaCalendarAlt/> {receivedHotelParams.dates.checkIn}</div>
                </div>

                <div className="col-6">
                  <div><b>Check-out Date</b></div>
                  <div><FaCalendarAlt/> {receivedHotelParams.dates.checkOut}</div>
                </div>

                <div className="col-6 mt-3 mb-3">
                  <div><b>No. of Room(s): </b> {receivedHotelParams.roomDetails.rooms}</div>
                </div>
                
                <div className="col-6 mt-3 mb-3">
                  <div><b>No. of Guests: </b> {receivedHotelParams.roomDetails.guests.adult + receivedHotelParams.roomDetails.guests.child}</div>
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
  );
}

export default HotelBookingForm;
