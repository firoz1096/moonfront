import { useState } from "react";
import { FaClock } from "react-icons/fa";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function VisaApplyForm({ visaTypes = [], country = "" }) {

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [selectedVisa, setSelectedVisa] = useState("");
  const [adults, setAdults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    contact: "",
    visa: "",
  });



  const selectedVisaData = visaTypes.find((v) => v._id === selectedVisa);
  const totalFee = selectedVisaData ? selectedVisaData.fees * adults : 0;

  // Validation functions
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateContact = (value) => /^[0-9]{10,15}$/.test(value);

  // Real-time validation handlers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value && !validateEmail(value) ? "⚠️ Invalid email format." : "",
    }));
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    setContact(value);
    setErrors((prev) => ({
      ...prev,
      contact: value && !validateContact(value) ? "⚠️ Contact must be 10-15 digits." : "",
    }));
  };

  const handleVisaChange = (e) => {
    const value = e.target.value;
    setSelectedVisa(value);
    setErrors((prev) => ({
      ...prev,
      visa: value ? "" : "⚠️ Please select a visa type.",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submit
    const newErrors = {
      email: !email || !validateEmail(email) ? "⚠️ Please enter a valid email." : "",
      contact: !contact || !validateContact(contact) ? "⚠️ Please enter a valid contact number." : "",
      visa: !selectedVisa ? "⚠️ Please select a visa type." : "",
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.contact || newErrors.visa) {
      setMessage("❌ Please fix the errors above before submitting.");
      return;
    }

    const payload = {
      country, // <-- pass country here
      email,
      phone: contact,
      visaType: selectedVisaData?.title || "",
      travellers: adults,
    };

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${API_BASE}/visa-enquiry/`, payload);

      if (res.data.success) {
        setMessage("✅ Your visa request submitted successfully!");
        setEmail("");
        setContact("");
        setSelectedVisa("");
        setAdults(1);
        setErrors({ email: "", contact: "", visa: "" });
      } else {
        setMessage("❌ Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting visa enquiry:", error);
      setMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="p-4 border rounded-3 shadow-sm bg-white">
      <h4 className="fw-bold mb-3">Apply Online</h4>

      <div className="alert alert-warning d-flex align-items-center mb-3 py-2 rounded-3">
        <FaClock className="me-2 text-dark" />
        <small className="mb-0">
          It takes less than <strong>2 minutes</strong> to Apply
        </small>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-2">
          <label className="form-label">Email ID</label>
          <input
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : email ? "is-valid" : ""
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Contact */}
        <div className="mb-2">
          <label className="form-label">Contact No.</label>
          <input
            type="text"
            className={`form-control ${
              errors.contact ? "is-invalid" : contact ? "is-valid" : ""
            }`}
            value={contact}
            onChange={handleContactChange}
          />
          {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
        </div>

        {/* Visa Type Dropdown */}
        <div className="mb-2">
          <label className="form-label">Visa Type</label>
          <select
            className={`form-select ${
              errors.visa ? "is-invalid" : selectedVisa ? "is-valid" : ""
            }`}
            value={selectedVisa}
            onChange={handleVisaChange}
          >
            <option value="">Select</option>
            {visaTypes.map((visa) => (
              <option key={visa._id} value={visa._id}>
                {visa.title}
              </option>
            ))}
          </select>
          {errors.visa && <div className="invalid-feedback">{errors.visa}</div>}
        </div>

        {/* Number of Travelers */}
        <div className="mb-2">
          <label className="form-label">No. of Travelers</label>
          <select
            className="form-select"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Visa Fee */}
        <div className="text-end mb-3 fw-semibold fs-6">
          ₹{totalFee > 0 ? totalFee.toLocaleString("en-IN") : "0"}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`small mb-3 ${
              message.startsWith("✅") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </div>
        )}

        {/* Apply Button */}
        <button
          type="submit"
          className="btn btn-success w-100 py-3 fw-bold"
          disabled={loading}
        >
          {loading ? "Submitting..." : "APPLY NOW"}
        </button>
      </form>
    </div>
  );
}
