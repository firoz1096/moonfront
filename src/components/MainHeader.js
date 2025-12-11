import { Link, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.png';

import { ReactComponent as FlightsIcon } from '../assets/images/svg/flights.svg';
import { ReactComponent as HotelsIcon } from '../assets/images/svg/hotels.svg';
import { ReactComponent as HolidaysIcon } from '../assets/images/svg/holidays.svg';
import { ReactComponent as UmrahIcon } from '../assets/images/svg/umrah.svg';
import { ReactComponent as VisaIcon } from '../assets/images/svg/visa.svg';
import { ReactComponent as ActivitiesIcon } from '../assets/images/svg/sightseeing.svg';
import { ReactComponent as BlogIcon } from '../assets/images/svg/blog.svg';
import { ReactComponent as CompanyIcon } from '../assets/images/svg/company.svg';
import { ReactComponent as ContactIcon } from '../assets/images/svg/contact.svg';

// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import PhoneNumber from './PhoneNumber';
// import AboutMenu from './Menu/AboutMenu';
import { useAuth } from "../auth/AuthContext";

export default function MainHeader() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(false);
  // const [isCompanyMenu, setIsCompanyMenu] = useState(false);

  const navRef = useRef(null);
  // const RefCompany = useRef(null);

  // Close mobile navbar on route change
  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);

  // Handle outside click for company menu
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (RefCompany.current && !RefCompany.current.contains(event.target)) {
  //       setIsCompanyMenu(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => document.removeEventListener("click", handleClickOutside, true);
  // }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => setShowNavbar(prev => !prev);

  // Overlay body for mobile menu
  useEffect(() => {
    document.body.classList.toggle('overlay_body', showNavbar);
  }, [showNavbar]);

  // Close mobile menu on link click
  const handleLinkClick = () => setShowNavbar(false);

  // Helper to determine active link
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="main_header">
      <div className='container'>
        <div className='row align-items-center'>

          {/* Logo and mobile menu button */}
          <div className='col-lg-2 col-12'>
            <div className='row align-items-center'>
              <div className='col-9'>
                <Link to="/" onClick={handleLinkClick}>
                  <img className='logo me-3' src={logo} alt='Logo' />
                </Link>
              </div>
              <div className='col-3'>
                <button className='menu_bar ms-auto' onClick={toggleMobileMenu}>
                  {showNavbar ? <FiX /> : <RiMenu3Fill />}
                </button>
              </div>
            </div>
          </div>

          {/* Navbar Links */}
          <div className='col-lg-10 col-12'>
            <div ref={navRef} className={`navbar_collapse ${showNavbar ? "showMenuinMobile" : ""}`}>
              <div className='row align-items-center'>
                <div className={`col-12 ${user ? "col-lg-12" : "col-lg-9"}`}>
                  <ul className='navbar_ul'>

                  <li className={`nav_item ${(isActive("/flights") || isActive("/"))}`}>
                      <Link to="/flights" onClick={handleLinkClick}> <FlightsIcon className="h_icon"/>Flights</Link>
                    </li>
                    <li className={`nav_item ${isActive("/hotels")}`}>
                      <Link to="/hotels" onClick={handleLinkClick}> <HotelsIcon className="h_icon"/>Hotels</Link>
                    </li>
                   
                    <li className={`nav_item ${isActive("/holidays")}`}>
                      <Link to="/holidays" onClick={handleLinkClick}><HolidaysIcon className="h_icon"/>Holidays</Link>
                    </li>

                    <li className={`nav_item ${isActive("/activities")}`}>
                      <Link to="/activities" onClick={handleLinkClick}><ActivitiesIcon className="h_icon"/>Activities</Link>
                    </li>

                      <li className={`nav_item ${isActive("/visa")}`}>
                      <Link to="/visa" onClick={handleLinkClick}><VisaIcon className="h_icon"/>Visa</Link>
                    </li>

                    <li className={`nav_item ${isActive("/umrah-packages")}`}>
                      <Link to="/umrah-packages" onClick={handleLinkClick}><UmrahIcon style={{ height:'18px' }} className="h_icon"/>Umrah</Link>
                    </li>
                    <li className={`nav_item hide_desktop ${isActive("/blogs")}`}>
                      <Link to="/blogs" onClick={handleLinkClick}><BlogIcon className="h_icon"/>Blogs</Link>
                    </li>
                    <li className={`nav_item hide_desktop ${isActive("/about-us")}`}>
                      <Link to="/about-us" onClick={handleLinkClick}><CompanyIcon className="h_icon"/>About Us</Link>
                    </li>
                    <li className={`nav_item hide_desktop ${isActive("/contact-us")}`}>
                      <Link to="/contact-us" onClick={handleLinkClick}><ContactIcon className="h_icon"/>Contact Us</Link>
                    </li>

                    {/* Company submenu */}


                      {/* {!user && (
                      <li
                      className='nav_item hide_mobile cursor-pointer'
                      ref={RefCompany}
                      onClick={() => setIsCompanyMenu(prev => !prev)}
                      >
                      About {isCompanyMenu ? <FiChevronUp className='text-primary' /> : <FiChevronDown />}
                      {isCompanyMenu && <AboutMenu />}
                      </li>
                      )} */}

                

                    {/* User Links */}
                    {user && (
                      <>
                        <li className={`nav_item ${isActive("/dashboard")}`}>
                          <Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                        </li>
                        <li className='nav_item'>
                          <Link to="/" onClick={() => { logout(); handleLinkClick(); }}>Logout</Link>
                        </li>
                      </>
                    )}

                  </ul>
                </div>

                {/* Phone Number for guests */}
                {!user && (
                  <div className='col-lg-3 col-12 mt-3 mt-md-0'>
                    <PhoneNumber />
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
