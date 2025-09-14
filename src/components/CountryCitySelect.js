import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { City } from "country-state-city";

export default function CountryCitySelect({ onChange }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Country list
  const countries = useMemo(() => countryList().getData(), []);

  // Handle country change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity(null); // reset city
    if (onChange) onChange({ country: country.label, city: "" });
  };

  // Handle city change
  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (onChange) onChange({ country: selectedCountry?.label, city: city.label });
  };

  // Get cities for selected country (ISO code required by country-state-city)
  const cityOptions =
    selectedCountry
      ? City.getCitiesOfCountry(selectedCountry.value).map((c) => ({
          value: c.name,
          label: c.name,
        }))
      : [];

  return (
    <div className="row">
      {/* Country Dropdown */}
      <div className="col-md-6 mb-3">
        <label className="form-label">Country</label>
        <Select
          options={countries}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select Country"
        />
      </div>

      {/* City Dropdown */}
      <div className="col-md-6 mb-3">
        <label className="form-label">City</label>
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
          isDisabled={!selectedCountry} // disable until country is picked
        />
      </div>
    </div>
  );
}
