import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaPlane } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import Flights from './Flights';
import Hotels from './Hotels';
import { useLocation, useNavigate } from "react-router-dom";


export default function TabsHome() {

  const location = useLocation();
  const navigate = useNavigate();
// Determine active tab from URL
  const getActiveKey = () => {
    if (location.pathname === "/flights") return "flights";
    if (location.pathname === "/hotels") return "hotels";
    return "flights"; // default
  };
  return (
    

<>

<div className='container search_panel_block'>
  <div className='row'>
    <div className='col-12'>
<Tabs
            activeKey={getActiveKey()}
            onSelect={(k) => navigate(`/${k}`)} // change URL when switching tab
            className=""
          >
            <Tab eventKey="flights" title={<span><FaPlane /> Flights </span>}>
              <Flights />
            </Tab>

            <Tab eventKey="hotels" title={<span><FaBed /> Hotels </span>}>
              <Hotels />
            </Tab>
          </Tabs>

    </div>
  </div>
</div>

</>



  )
}
