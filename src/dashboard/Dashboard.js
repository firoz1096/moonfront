import MainLayout from '../components/MainLayout';
import { useAuth } from "../auth/AuthContext";
import { Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { FaUmbrellaBeach, FaKaaba, FaPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from 'axios';
import BarChart from '../components/BarChart';

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// ✅ Reusable Card Component
const StatCard = ({ icon, title, count }) => (
  <div className="col">
    <div className="card p-3 shadow-sm rounded-3">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <span className="p-2 bg-light border rounded">{icon}</span>
        </div>
        <div>
          <p className="text-muted mb-0"><small>{title}</small></p>
          <h4 className="p-0 m-0">{count}</h4>
        </div>
      </div>
    </div>
  </div>
);



function Dashboard() {



  const { user, logout } = useAuth();

  // States for deal counts
  const [countFlightDeals, setCountFlightDeals] = useState(0);
  const [countRoundTripDeals, setCountRoundTripDeals] = useState(0);
  const [countHolidayDeals, setCountHolidayDeals] = useState(0);
  const [countUmrahDeals, setCountUmrahDeals] = useState(0);

    // ✅ Fetch all counts together
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [flight, round, holiday, umrah] = await Promise.all([
          axios.get(`${API_BASE}/flight-deals`),
          axios.get(`${API_BASE}/round-trip-deals`),
          axios.get(`${API_BASE}/holiday-deals`),
          axios.get(`${API_BASE}/umrah-deals`),
        ]);

        setCountFlightDeals(flight.data.length);
        setCountRoundTripDeals(round.data.length);
        setCountHolidayDeals(holiday.data.length);
        setCountUmrahDeals(umrah.data.length);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchCounts();
  }, []);


  const dealLabels = ["Flight Deals", "Round Trip Deals", "Holiday Deals", "Umrah Deals"];
// const dealData = [12, 36, 7, 3];
  const dealData = [countFlightDeals, countRoundTripDeals, countHolidayDeals, countUmrahDeals];

  return (
    <> 
 <MainLayout> 

    <div className='container py-5'>

      <div className="row">


        <div className="col-lg-3">

          <div className="row align-items-center">
        <div className="col-12">

          <div className="d-flex align-items-center justify-content-between">

            <div>Hi, <b>{user.username}</b> welcome! 🎉 </div>
             <div><button className='btn btn-primary btn-sm' onClick={logout}><MdLogout /> Logout</button> </div>
          </div>
        <hr/>
    
        </div>

           
    </div>  
    
        <ul className="dashboard_links">
          
          <li>
            <h6> Post Deals</h6>
            <ul>
              <li>
                <Link className="text-primary" to="/post-flight-deals">Post Flight Deals </Link>
              </li>
              <li>
                <Link className="text-primary" to="/post-round-trip-deals"> Post Round Trip Deals </Link>
              </li>
          
              <li>
                <Link className="text-primary" to="/post-holiday-deals">Post Holiday Deals </Link>
              </li>
              <li>
                <Link className="text-primary" to="/post-umrah-deals">Post Umrah Deals </Link>
              </li>
            </ul>
          </li>
      
          <li>
            <h6> Queue</h6>
            <ul>

              <li>
                <Link className="text-primary" to="/flight-deals-queue">Flight Deals Queue</Link>
              </li>

            <li>
                <Link className="text-primary" to="/round-trip-deals-queue">Round Trip Deals Queue</Link>
              </li>

                <li>
                <Link className="text-primary" to="/holiday-deals-queue">Holiday Deals Queue</Link>
              </li>

                    <li>
                <Link className="text-primary" to="/umrah-deals-queue">Umrah Deals Queue</Link>
              </li>

            </ul>
          </li>
          
          <li>
            <h6>Blog Management</h6>
            <ul>
              <li>
                <Link className="text-primary" to="/post-blogs">Post Blog </Link>
              </li>
              <li>
                <Link className="text-primary" to="/post-blog-category">Blog Categories </Link>
              </li>
            </ul>
          </li>

          <li>
            <h6>Site Settings</h6>
            <ul>
              <li>
                <Link className="text-primary" to="/edit-contact">Edit Contact Info </Link>
              </li>
              <li>
                <Link className="text-primary" to="/edit-terms-and-conditions">Edit Terms & Conditions </Link>
              </li>
              <li>
                <Link className="text-primary" to="/edit-about-us">Edit About Us </Link>
              </li>
            </ul>
          </li>

        </ul>

      </div>

      <div className="col-lg-9 shadow-sm">

        <div className="row align-items-center">

                <StatCard 
                  icon={<FaPlane className="fs-2" />} 
                  title="Flight Deals" 
                  count={countFlightDeals} 
                />
                <StatCard 
                  icon={<FaPlane className="fs-2" />} 
                  title="Round Trip Deals" 
                  count={countRoundTripDeals} 
                />
                <StatCard 
                  icon={<FaUmbrellaBeach className="fs-2" />} 
                  title="Holiday Deals" 
                  count={countHolidayDeals} 
                />
                <StatCard 
                  icon={<FaKaaba className="fs-2" />} 
                  title="Umrah Deals" 
                  count={countUmrahDeals} 
                />

        </div>
         

      <div className="row">

    <div className="col-12 mb-4">
     <BarChart labels={dealLabels} data={dealData} title="" label="chart" />
    </div>

      </div>


      </div>

      </div>


    </div>
    </MainLayout>
    </>
  );
}

export default Dashboard;
