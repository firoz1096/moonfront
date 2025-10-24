import Slider from "@mui/material/Slider";
import { useState } from "react";
// Optional: import PropTypes from "prop-types";

export default function PriceRangeSlider({
  source,
  min = 100,
  max = 2000,
  defaultValue = [100, 2000],
  onChange,
}) {
  const [price, setPrice] = useState(defaultValue);

  const handleChange = (e, newValue) => {
    setPrice(newValue);
    if (onChange) {
      onChange(newValue); // Send updated value to parent
    }
  };

  return (
    <div className="field_box">
      <div className="title">{source}</div>

      <Slider
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          color: "#001f4d",
        }}
      />

      <div className="fieldlast trim_text">
        £{price[0]} — £{price[1]}
      </div>
    </div>
  );
}

// Optional: Prop validation
// PriceRangeSlider.propTypes = {
//   source: PropTypes.string,
//   min: PropTypes.number,
//   max: PropTypes.number,
//   defaultValue: PropTypes.arrayOf(PropTypes.number),
//   onChange: PropTypes.func,
// };
