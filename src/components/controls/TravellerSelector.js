import { useState } from "react";

export default function TravellerSelector({ formData, setFormData }) {
  const [open, setOpen] = useState(false);

  const handleChange = (field, value) => {
    if (value < 0) return; // prevent negative numbers
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
  <>
  
    <div className="col-12 position-relative">
        
        <div>Peoples</div>     
      <div
        className="form-select d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <span>
          {formData.adult} Adult, {formData.children} Children, {formData.infant} Infant
        </span>
        {/* <span className="text-muted">{open ? "▲" : "▼"}</span> */}
      
      </div>

      {open && (
      
     <div style={{width:'100%', top:'60px'}} className='airport_list_suggestion adult_pax_section'>   
          {[
            { label: "Adult", field: "adult", min: 1 },
            { label: "Children", field: "children", min: 0 },
            { label: "Infant", field: "infant", min: 0 }
          ].map(({ label, field, min }) => (
            
            <div
              key={field}
              className="d-flex justify-content-between align-items-center"
            >
              <span>{label}</span>
              <div className="mb-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => handleChange(field, formData[field] - 1)}
                  disabled={formData[field] <= min}
                >
                  -
                </button>
                <span>{formData[field]}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={() => handleChange(field, formData[field] + 1)}
                >
                  +
                </button>
              </div>
            </div>

            
          ))}

          <div className="text-end"> <button onClick={() => { setOpen(false)}} className="btn btn-sm text-primary"> Apply </button></div>
    </div>
    )}


    </div>
  </>
  );
}
