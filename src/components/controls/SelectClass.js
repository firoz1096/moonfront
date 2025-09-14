import { useState } from "react";

export default function SelectClass({ onClassChange, source }) {
    const [selectedValue, setSelectedValue] = useState('Economy');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        if (onClassChange) {
            onClassChange(newValue);
        }
    };

    return ( 
        <>
            <div className="row">
                <div className="col-12">
                    {source}
                </div>
                <div className="col-lg-12 mt-1">
                    <select className="form-select" value={selectedValue} onChange={handleChange}>
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business Class">Business Class</option>
                        <option value="First Class">First Class</option>
                    </select>
                </div>
            </div>
        </>
    );
}
