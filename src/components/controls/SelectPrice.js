import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function SelectPrice({ onPriceChange, defaultValue = '£0-£50' }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [showPriceWidget, setShowPriceWidget] = useState(false);
  const priceUIRef = useRef(null);

  const handleClickOutside = (event) => {
    if (priceUIRef.current && !priceUIRef.current.contains(event.target)) {
      setShowPriceWidget(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onPriceChange) {
      onPriceChange(newValue);
    }
    setShowPriceWidget(false);
  };

  const handlePriceChange = () => {
    setShowPriceWidget(true);
  };

  return (
    <>
      <div
        className={showPriceWidget ? "field_box active_state" : "field_box"}
        onClick={handlePriceChange}
      >
        <div className="title">
          Price per Night <IoIosArrowDown />
        </div>
        <div className="fieldfirst">
          <span className="fieldsecond">{selectedValue}</span>
        </div>
      </div>

      {showPriceWidget && (
        <div
          ref={priceUIRef}
          className="airport_list_suggestion adult_pax_section"
        >
          <div className="row">
            <div className="col-12">
              <ul className="list-unstyled mb-0 price-range-list">
                <li
                  className={`price-range-item ${
                    selectedValue === "£0-£50" ? "active" : ""
                  }`}
                  onClick={() => handleChange({ target: { value: "£0-£50" } })}
                >
                  £0-£50
                </li>
                <li
                  className={`price-range-item ${
                    selectedValue === "£50-£100" ? "active" : ""
                  }`}
                  onClick={() => handleChange({ target: { value: "£50-£100" } })}
                >
                  £50-£100
                </li>
                <li
                  className={`price-range-item ${
                    selectedValue === "£100-£200" ? "active" : ""
                  }`}
                  onClick={() =>
                    handleChange({ target: { value: "£100-£200" } })
                  }
                >
                  £100-£200
                </li>
                <li
                  className={`price-range-item ${
                    selectedValue === "£200+" ? "active" : ""
                  }`}
                  onClick={() => handleChange({ target: { value: "£200+" } })}
                >
                  £200+
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
