import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TravellerSelector from "./controls/TravellerSelector";
import CustomInputField from "./controls/CustomInputField";
import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { AirportData } from "../data/AirportData";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function EnquiryForm({ buttonTitle, tripName }) {
  const [modalShow, setModalShow] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [formData, setFormData] = useState({
    destination:"",
    name: "",
    phone: "",
    email: "",
    from: "",
    adult: 1,
    children: 0,
    infant: 0,
    fromDate: dayjs().format("YYYY-MM-DD"),
    toDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
    requirements: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, from: value }));

    // clear error when typing
    if (errors.from) {
      setErrors((prev) => ({ ...prev, from: "" }));
    }

    if (value.length > 0) {
      const filtered = AirportData.filter(
        (item) =>
          item.city.toLowerCase().includes(value.toLowerCase()) ||
          item.airport.toLowerCase().includes(value.toLowerCase()) ||
          item.citycode.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (airport) => {
    setFormData((prev) => ({
      ...prev,
      from: `${airport.city} (${airport.citycode})`,
    }));
    setErrors((prev) => ({ ...prev, from: "" })); // clear error
    setSuggestions([]);
  };

const validate = () => {
  const newErrors = {};

  if (!formData.name) newErrors.name = "Name is required";

  // Phone validation
  if (!formData.phone) {
    newErrors.phone = "Phone number is required";
  } else if (!/^\d{10,15}$/.test(formData.phone)) {
    newErrors.phone = "Phone number is invalid (must be 10–15 digits)";
  }


  // Email validation
  if (!formData.email) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Enter a valid email";

  // Airport validation
  if (!formData.from) newErrors.from = "City/Airport is required";

  // Dates validation
  if (!formData.fromDate) newErrors.fromDate = "From date is required";
  if (!formData.toDate) newErrors.toDate = "To date is required";




  return newErrors;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        `${API_BASE}/holiday-enquiry`,
        formData
      );

      if (response.status === 201 || response.status === 200) {
        alert("Your enquiry has been submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          from: "",
          adult: 1,
          children: 0,
          infant: 0,
          fromDate: dayjs().format("YYYY-MM-DD"),
          toDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
          requirements: "",
        });
        setModalShow(false);
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Something went wrong while submitting your enquiry. Please try again.");
    }
  };

  const handleWhatsAppQuote = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const message = `Hi, I'd like to get a quote 
for: ${tripName}
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
From: ${formData.from}
Travellers: ${formData.adult} Adult, ${formData.children} Children, ${formData.infant} Infant
From Date: ${formData.fromDate}
To Date: ${formData.toDate}
Requirement: ${formData.requirements}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
    
  };

  useEffect(() => {
  if (tripName) {
    setFormData((prev) => ({ ...prev, destination: tripName })); // ✅ save tripName as destination
  }
}, [tripName]);

  return (
    <>
      <Modal
        size="lg"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">{tripName}</h4>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container-fluid">
            <p>
            Please provide your details and our team will assist you with booking.
            </p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <form className="row g-3" onSubmit={handleSubmit} noValidate>
                {/* Name */}

                <CustomInputField
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                />

                {/* Phone */}
                <CustomInputField
                  label="Phone"
                  type="number"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                  colClass="col-md-6"
                />

                {/* Email */}
                <CustomInputField 
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  errors={errors}
                  setErrors={setErrors}
                  setFormData={setFormData}
                  colClass="col-md-6"
                />

                {/* From - Airport special case */}
                <div className="col-md-6 position-relative">
                  <label className="form-label">From</label>
                  <input
                    type="text"
                    className={`form-control ${errors.from ? "is-invalid" : ""}`}
                    placeholder="Type city or airport..."
                    value={formData.from}
                    onChange={handleInputChange}
                  />
                  {errors.from && (
                    <div className="invalid-feedback">{errors.from}</div>
                  )}

                  {suggestions.length > 0 && (
                    <ul
                      style={{ zIndex: "8", maxHeight:"200px", overflow:'auto' }}
                      className="list-group position-absolute w-100 mt-1 shadow"
                    >
                      {suggestions.map((airport, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelect(airport)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-center">
                            <div>
                              <strong>{airport.city}</strong>
                            </div>
                            <div className="ms-auto">
                              <small>({airport.citycode})</small>
                            </div>
                          </div>
                          <div className="text-muted">
                            <small>
                              {airport.airport}, {airport.country}
                            </small>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* People */}
                <div className="col-md-6">
                  <TravellerSelector
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>

                {/* Dates */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="fromDate" className="form-label">
                        From Date
                      </label>
                      <DatePicker
                        value={dayjs(formData.fromDate)}
                        onChange={(newValue) =>
                          setFormData((prev) => ({
                            ...prev,
                            fromDate: newValue
                              ? dayjs(newValue).format("YYYY-MM-DD")
                              : prev.fromDate,
                          }))
                        }
                        slotProps={{
                          textField: {
                            id: "fromDate",
                            fullWidth: true,
                            className: "form-control",
                          },
                        }}
                        minDate={dayjs()}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="toDate" className="form-label">
                        To Date
                      </label>
                      <DatePicker
                        value={dayjs(formData.toDate)}
                        onChange={(newValue) =>
                          setFormData((prev) => ({
                            ...prev,
                            toDate: newValue
                              ? dayjs(newValue).format("YYYY-MM-DD")
                              : prev.toDate,
                          }))
                        }
                        slotProps={{
                          textField: {
                            id: "toDate",
                            fullWidth: true,
                            className: "form-control",
                          },
                        }}
                        minDate={dayjs(formData.fromDate)}
                      />
                    </div>
                  </div>
                </LocalizationProvider>

                {/* Requirements */}
                <div className="col-12">
                  <label className="form-label">
                    Any Specific Requirement
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Type your requirements..."
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        requirements: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex gap-3">
                  <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-success"
                    onClick={handleWhatsAppQuote}
                  >
                    <BsWhatsapp /> Get Free Quote on WhatsApp
                  </button>
                </div>
              </form>
            </LocalizationProvider>
          </div>
        </Modal.Body>
      </Modal>

      <button
        className="btn btn-primary ms-2"
        onClick={() => setModalShow(true)}
      >
        {buttonTitle}
      </button>
    </>
  );
}
