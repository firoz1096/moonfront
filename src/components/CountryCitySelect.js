import { useMemo, useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { City } from "country-state-city";

export default function CountryCitySelect({ onChange, defaultCountry = "", defaultCity = "" }) {
  const countries = useMemo(() => countryList().getData(), []);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Initialize with defaults when editing
  useEffect(() => {
    if (defaultCountry) {
      const countryOption = countries.find((c) => c.label === defaultCountry);
      if (countryOption) {
        setSelectedCountry(countryOption);
        // Load default city if exists
        if (defaultCity) {
          const cityOption = City.getCitiesOfCountry(countryOption.value)
            .map((c) => ({ value: c.name, label: c.name }))
            .find((c) => c.label === defaultCity);
          if (cityOption) setSelectedCity(cityOption);
        }
      }
    }
  }, [defaultCountry, defaultCity, countries]);

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
          isDisabled={!selectedCountry}
        />
      </div>
    </div>
  );
}
