
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';
import {FiX } from "react-icons/fi";
// import { FiChevronDown, FiChevronUp} from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import PhoneNumber from './PhoneNumber';
// import AboutMenu from './Menu/AboutMenu';


export default function MainHeader() {

const [showNavbar, setShowNavbar] = useState(false);

// const [isCompanyMenu, setIsCompanyMenu] = useState(false);
// const RefCompany = useRef(null);



    // Add and Remove Class on scroll
  //   const [scrolltopdata, setscrolltopdata] = useState('');

  //   useEffect(() => {
  //     window.addEventListener('scroll', () => {
  //         if (window.scrollY < 800) {
  //             setscrolltopdata('');
  //         } else {
  //             setscrolltopdata('scrolled');
  //         }
  //     });
  // }, [])

  
//useRef API to handle outside click
const navRef = useRef(null);






 //handle outside click using addEventListener
  // useEffect(() => {
     
  //     document.addEventListener("click", handleClickOutside, true);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside, true);
  //     };
  
  //   }, []);

       //ends

  //   const handleClickOutside = event => {
  //       if (RefCompany.current && !RefCompany.current.contains(event.target)) {
  //         setIsCompanyMenu(false)
  //       }
        
  // }

  
  
  const showNavMobile = () => {
    navRef.current.classList.toggle("showMenuinMobile");
  }



  useEffect(() => {
    document.body.classList.toggle('overlay_body', showNavbar);
  },[showNavbar])

  return (
    

    // <div className={`main_header ${scrolltopdata}`}>
    <div className="main_header">
    <div className='container'>

<div className='row align-items-center'>


        <div className='col-lg-2 col-12'>

         <div className='row align-items-center'>
          <div className='col-9'>
             <Link to="/" className='me-3'> <img className='logo' src={logo} alt='' /></Link>
             </div>

             <div className='col-3'>
          <button 
      className='menu_bar ms-auto'
      onClick={showNavMobile} >     
      <span onClick={() => setShowNavbar(!showNavbar)}> {showNavbar ?<FiX/>:<RiMenu3Fill/>}</span>      
      </button>
             </div>

          </div>


        </div>


        <div className='col-lg-10 col-12'>
            <div ref={navRef} className='navbar_collapse'>
                  <div className='row align-items-center'> 
                  <div className='col-lg-9 col-12'>
                  <ul className='navbar_ul'>

                      <li className='nav_item'> <Link to="/flights">Flights</Link> </li>
                      <li className='nav_item'> <Link to="/hotels">Hotels</Link> </li>
                      <li className='nav_item'> <Link to="/holidays">Holidays</Link> </li>
                      <li className='nav_item'> <Link to="/umrah-packages">Umrah Packages</Link> </li>
                       <li className='nav_item'> <Link to="/blogs">Blogs</Link> </li>
                      <li className='nav_item hide_desktop'> <Link to="/company">Company</Link> </li>
                      <li className='nav_item hide_desktop'> <Link to="/contact-us">Contact Us</Link> </li>
                     
                     
                      {/* <li className='nav_item hide_mobile cursor-pointer' ref={RefCompany} onClick={() => setIsCompanyMenu(!isCompanyMenu)}> 
                      About { isCompanyMenu ?<FiChevronUp className='text-primary' />:<FiChevronDown /> }                       
                      
                      { isCompanyMenu ?<AboutMenu /> : null }
                        </li> */}

                  </ul>
                </div>

              <div className='col-lg-3 col-12'>
                <PhoneNumber/>
              </div>
              </div>
            </div>
        </div>


    

        </div>

    </div>

    </div>


  )
}
