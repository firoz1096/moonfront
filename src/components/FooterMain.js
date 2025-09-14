import { FiPhoneCall, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube      } from "react-icons/fi";
import { PiTiktokLogoLight } from "react-icons/pi";
import { BsBuilding } from "react-icons/bs";
import { Link } from "react-router-dom";
import logowhite from '../assets/images/logo-white.png';
import aita from '../assets/images/IATA.png';
import atol from '../assets/images/atol-3.png';
import creditcards from '../assets/images/svg/we-accept-cards.svg';
import Spinner from "./Spinner";
import axios from "axios";
import { useEffect, useState } from "react";



export default function FooterMain() {

const [contactInfo, setContactInfo] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchContactInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact-info");
      setContactInfo(res.data);
    } catch (err) {
      console.error("Error fetching contact info:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchContactInfo();
}, []);


  return (
   



<section className='footer_section'>

<div className='container'>
<div className='row'>

<div className='col-lg-3 mb-3 mb-md-0 hide_mobile'>

<div className="mb-2"> <img className="img-fluid" src={logowhite} alt="" /> </div>

  <div className="text-white me-lg-3">
<small>Start your journey with Moon Travel — where every destination is just a plan away. Trusted by travelers for hassle-free holidays, spiritual journeys, and unforgettable getaways.</small>
  </div>
  
  <div className="mt-3 text-white"> <small>Company number 09835227</small></div>



</div>



<div className="col-lg-8 offset-lg-1">

<div className="row">
<div className='col-lg-4  mb-3 mb-md-0'>

    <h6>Information</h6>
<ul>
<li><Link to='/about-us'>About Us</Link></li>
<li><Link to='/contact-us'>Contact Us</Link></li>
<li><Link to='/blogs'>Blogs</Link></li>
<li><Link to='/terms-and-conditions'>Terms and Conditions</Link></li>
{/* <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
<li><Link to='/cookie-policy'>Cookie Policy</Link></li> */}
</ul>

</div>


<div className='col-lg-4 mb-3 mb-md-0'>

    <h6>Services</h6>
   <ul>
<li><Link to='/flights'>Flights</Link></li>
<li><Link to='/hotels'>Hotels</Link></li>
<li><Link to='/holidays'>Holidays</Link></li>
<li><Link to='/umrah-packages'>Umrah Packages</Link></li>
</ul>
   
</div>


<div className='col-lg-4 mb-3 mb-md-0'>

<div className='mb-4'>     
<h6>Contact</h6>

<ul>
{loading ? (
  <Spinner />
  ) : contactInfo ? (

<>
<li><FiPhoneCall /> {contactInfo.phone}</li>
<li><FiMail /> {contactInfo.email}</li>
<li><FiMapPin /> {contactInfo.address}</li>
<li><BsBuilding /> Walk-Ins Welcome. {contactInfo.workingHours}</li>

<li className="mt-3 social_icons"> 
  <Link target="_blank" to={contactInfo.facebookUrl}><FiFacebook /> </Link> 
  <Link target="_blank" to={contactInfo.twitterUrl}><FiTwitter /> </Link> 
  <Link target="_blank" to={contactInfo.instagramUrl}><FiInstagram /> </Link> 
  <Link target="_blank" to={contactInfo.tiktokUrl}><PiTiktokLogoLight /> </Link>
  
  {contactInfo?.youtubeUrl && (
  <Link target="_blank" to={contactInfo.youtubeUrl}><FiYoutube /></Link>
)}

  {contactInfo?.linkedinUrl && (
  <Link target="_blank" to={contactInfo.linkedinUrl}><FiLinkedin /> </Link>
)}
  

</li>
</>
) : (
<p className="text-danger">Failed to load contact info.</p>
)}
</ul>


    
</div>





</div>

</div>

</div>



</div>
</div>

<hr/>

<div className='container'>

<div className='row align-items-center'>
  <div className='col-lg-6 order-md-1 footer_mini_icons'> 
    
    <div className="row align-items-center">
      <div className="col-lg-4 col-6 mb-3 mb-md-0"><img style={{height:'34px'}} src={aita} alt="" /> </div>
        <div className="col-lg-4 col-6 mb-3 mb-md-0"> <img  style={{height:'34px'}} src={atol} alt="" /> </div>
       <div className="col-lg-4 col-12 mb-3 mb-md-0"> <img style={{height:'24px'}} src={creditcards} alt="" /> </div>
    </div> 
</div>

<div className='col-lg-6  mb-2 mb-md-0'> <span className='copyright'>Copyright © 2025 Moon Travel. All rights reserved.

</span></div>




</div>
</div>

</section>


  )
}
