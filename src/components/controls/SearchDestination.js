import { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function SearchDestination({
  source,
  city,
  country,
  id,
  styleCss,
  onSelect,
}) {
  const [destinationList, setDestinationList] = useState([]); // API data
  const destinationUIRef = useRef(null);

  const [showDestinationWidget, setShowDestinationWidget] = useState(false);
  const [search, setSearch] = useState("");

  const [cityName, setCityName] = useState(city);
  const [countryName, setCountryName] = useState(country);

  // Update local state when props change
  useEffect(() => {
    setCityName(city);
    setCountryName(country);
  }, [city, country]);

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/holiday-deals`);
        if (res.data) {
          // Extract unique country+city pairs
          const uniqueDestinations = [];
          const seen = new Set();

          res.data.forEach((item) => {
            const key = `${item.city}-${item.country}`;
            if (!seen.has(key) && item.city && item.country) {
              seen.add(key);
              uniqueDestinations.push({
                city: item.city,
                country: item.country,
              });
            }
          });

          setDestinationList(uniqueDestinations);
        }
      } catch (err) {
        console.error("Error fetching holiday deals:", err);
      }
    };
    fetchData();
  }, []);

  // Filter data by city name
  const filterDestination = destinationList.filter((item) =>
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowWidget = () => {
    setShowDestinationWidget(true);
  };

  const handleItemClick = (item) => {
    setShowDestinationWidget(false);
    setCityName(item.city);
    setCountryName(item.country);

    if (onSelect) {
      onSelect({ city: item.city, country: item.country });
    }
    setSearch(""); // clear input
  };

  const handleClickOutside = (event) => {
    if (destinationUIRef.current && !destinationUIRef.current.contains(event.target)) {
      setShowDestinationWidget(false);
    }
  };

  // Close widget on outside click
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        id={id}
        className={`${styleCss} ${showDestinationWidget ? "active_state" : ""}`}
        onClick={handleShowWidget}
      >
        <div className="title">{source}</div>
        <div className="fieldfirst trim_text">{cityName}</div>
        <div className="fieldlast trim_text">{countryName}</div>
      </div>

      {showDestinationWidget && (
        <div ref={destinationUIRef} className="airport_list_suggestion">
          <div className="mb-2">
            <InputField
              id={"search_destination"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="list_show">
            <ul>
              {filterDestination.slice(0, 10).map((item, index) => (
                <li key={index} onClick={() => handleItemClick(item)}>
                  <div>
                    <CiLocationOn /> {item.city}
                  </div>
                  <div className="text-muted airport_name">
                    <p>City in {item.country}</p>
                  </div>
                </li>
              ))}
              {filterDestination.length === 0 && <li>No results found.</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
