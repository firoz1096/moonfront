import { Tabs, Tab } from "react-bootstrap";
import { FaPlane, FaBed, FaUmbrellaBeach } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Flights from "./Flights";
import Hotels from "./Hotels";

export default function TabsHome() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on the current URL
  const getActiveKey = () => {
    if (location.pathname.startsWith("/flights")) return "flights";
    if (location.pathname.startsWith("/hotels")) return "hotels";
    if (location.pathname.startsWith("/holidays")) return "holidays";
    return "flights";
  };

  const handleSelect = (key) => {
    if (key && key !== getActiveKey()) {
      navigate(`/${key}`);
    }
  };

// Map pathname to heading + paragraph
  // const pageContent = () => {
  //   const map = {
  //     "/flights": {
  //       heading: "Flights",
  //       paragraph: "Book Domestic and International",
  //     },
  //     "/hotels": {
  //       heading: "Hotels",
  //       paragraph: "Find the best hotels for your stay",
  //     },
  //     "/holidays": {
  //       heading: "Holidays",
  //       paragraph: "Explore amazing holiday packages",
  //     },
  //   };

    // Match the route or fallback
  //   const match = Object.keys(map).find((path) => location.pathname.startsWith(path));
  //   return match ? map[match] : { heading: "", paragraph: "" };
  // };

  // const { heading, paragraph } = pageContent();


  return (
    <div className="container search_panel_block">
        {/* <h2 className="text-white m-0">{heading}</h2>
        <p className="text-white">{paragraph}</p> */}

      <Tabs activeKey={getActiveKey()} onSelect={handleSelect} >
        <Tab eventKey="flights" title={<span><FaPlane /> Flights</span>}>
          <Flights />
        </Tab>

        <Tab eventKey="hotels" title={<span><FaBed /> Hotels</span>}>
          <Hotels />
        </Tab>

        <Tab eventKey="holidays" title={<span><FaUmbrellaBeach /> Holidays</span>}>
          {/* <div className="text-center py-4">Coming soon...</div> */}
        </Tab>
      </Tabs>
    </div>
  );
}
