import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { IoIosAirplane } from "react-icons/io";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

export default function FeatureFlightDeals() {

  const [activeCountry, setActiveCountry] = useState("India");
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals(activeCountry);
  }, [activeCountry]);

  const fetchDeals = async (country) => {
    try {
      const res = await axios.get(`http://localhost:5000/flight-deals?country=${country}`);
      setDeals(res.data);
    } catch (err) {
      console.error("Error fetching deals:", err);
    }
  };

  return (
    <>
      <div className='feautured_flight_deals py-4'>
        <div className="container">
          <h1 className='text-center'>Featured Flight Deals</h1>
          <p className='text-center mb-md-3'>
            Flight deals with the lowest prices. Act fast – they all depart within the next three months.
          </p>

          <div className='row'>
            <div className="col-12">

              <Tabs
                activeKey={activeCountry}
                onSelect={(k) => setActiveCountry(k)}
                className="mb-3"
              >

              {/* India Tab */}
                <Tab eventKey="India" title="India Flights">
                  <div className="row">
                    {deals.length > 0 ? (
                      deals.map((deal) => (
                        <div key={deal._id} className="col-lg-3 mb-3">
                          <div className="card h-100">
                            <img
                              src={`http://localhost:5000${deal.imagePath}`}
                              alt={`${deal.fromCity.city} to ${deal.toCity.city}`}
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <div className='row align-items-center'>
                                <div className='col-12'>
                                  <h6>{deal.fromCity.city} to {deal.toCity.city}</h6>
                                </div>

                                <div className='col-12'>
                                     <div className='d-flex align-items-center'>
                                        <div><small>
                                            {format(new Date(deal.startsOn), "EEE d MMM")} - {format(new Date(deal.endsOn), "EEE d MMM")}
                                        </small></div>

                                    <div className='ms-auto text-muted'>
                                          <small><IoIosAirplane /> {deal.airline.airlinecode}</small>
                                    </div>

                                    </div>
                                </div>
                          
                          
                                <div className='col-12 mt-2'>
                                  <div className='d-flex align-items-center'>
                                    <div><small>Starting from</small></div>
                                   <div className='ms-auto text-muted'>
                                  <Link 
                                    to={`/flight/from/${deal.fromCity.city.toLowerCase()}/to/${deal.toCity.city.toLowerCase()}/${deal._id}`} 
                                    className="stretched-link"
                                  >
                                    £{deal.price} <FaAngleRight />
                                  </Link>
                                        </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No flight deals found for {activeCountry}.</p>
                    )}
                  </div>
                </Tab>

                {/* Pakistan Tab */}
                <Tab eventKey="Pakistan" title="Pakistan Flights">
                  <div className="row">
                    {activeCountry === "Pakistan" && deals.length > 0 ? (
                      deals.map((deal) => (
                        <div key={deal._id} className="col-lg-3 mb-3">
                          <div className="card h-100">
                            <img
                              src={`http://localhost:5000${deal.imagePath}`}
                              alt={`${deal.fromCity.city} to ${deal.toCity.city}`}
                              className="card-img-top"
                            />
                            <div className="card-body">
                              <div className='row align-items-center'>
                                <div className='col-12'>
                                  <h6>{deal.fromCity.city} to {deal.toCity.city}</h6>
                                </div>
                               <div className='col-12'>
                                    <div className='d-flex align-items-center'>
                                        <div><small>
                                            {format(new Date(deal.startsOn), "EEE d MMM")} - {format(new Date(deal.endsOn), "EEE d MMM")}
                                        </small></div>

                                   <div className='ms-auto text-muted'>
                                          <small><IoIosAirplane /> {deal.airline.airlinecode}</small>
                                    </div>

                                    </div>
                                </div>
                                <div className='col-12 mt-2'>
                                  <div className='d-flex align-items-center'>
                                    <div><small>Starting from</small></div>
                                    <div className='ms-auto'>
<Link 
  to={`/flight/from/${deal.fromCity.city.toLowerCase()}/to/${deal.toCity.city.toLowerCase()}/${deal._id}`} 
  className="stretched-link"
>
  £{deal.price} <FaAngleRight />
</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No flight deals found for {activeCountry}.</p>
                    )}
                  </div>
                </Tab>

                

                {/* Gulf Countries Tab */}
                <Tab eventKey="Gulf Countries" title="Gulf Countries Flights">
                  <div className="row">
                    {activeCountry === "Gulf Countries" && deals.length > 0 ? (
                      deals.map((deal) => (
                        <div key={deal._id} className="col-lg-3 mb-3">
                          <div className="card h-100">
                            <img
                              src={`http://localhost:5000${deal.imagePath}`}
                              alt={`${deal.fromCity.city} to ${deal.toCity.city}`}
                              className="card-img-top"
                            />
                       <div className="card-body">
                              <div className='row align-items-center'>
                                <div className='col-12'>
                                  <h6>{deal.fromCity.city} to {deal.toCity.city}</h6>
                                </div>
                                    <div className='col-12'>
                                    <div className='d-flex align-items-center'>
                                        <div><small>
                                            {format(new Date(deal.startsOn), "EEE d MMM")} - {format(new Date(deal.endsOn), "EEE d MMM")}
                                        </small></div>

                                    <div className='ms-auto'>
                                          <small><IoIosAirplane /> {deal.airline.airlinecode}</small>
                                    </div>

                                    </div>
                                </div>
                                <div className='col-12 mt-2'>
                                  <div className='d-flex align-items-center'>
                                    <div><small>Starting from</small></div>
                                    <div className='ms-auto'>
<Link 
  to={`/flight/from/${deal.fromCity.city.toLowerCase()}/to/${deal.toCity.city.toLowerCase()}/${deal._id}`} 
  className="stretched-link"
>
  £{deal.price} <FaAngleRight />
</Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No flight deals found for {activeCountry}.</p>
                    )}
                  </div>
                </Tab>

              </Tabs>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
