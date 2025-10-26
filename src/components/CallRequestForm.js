import { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function CallRequestForm({callFor = "", product = ""}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    
    name: "",
    email: "",
    phone: "",
  });

  // ✅ Validation
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^[0-9]{10,15}$/.test(value);

  // ✅ Real-time handlers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value && !validateEmail(value) ? "⚠️ Invalid email format." : "",
    }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setErrors((prev) => ({
      ...prev,
      phone: value && !validatePhone(value)
        ? "⚠️ Contact must be 10–15 digits."
        : "",
    }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({
      ...prev,
      name: !value ? "⚠️ Please enter your name." : "",
    }));
  };


  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
     
      name: !name ? "⚠️ Please enter your name." : "",
      email: !email || !validateEmail(email)
        ? "⚠️ Please enter a valid email."
        : "",
      phone: !phone || !validatePhone(phone)
        ? "⚠️ Please enter a valid phone number."
        : "",
    };

    setErrors(newErrors);

    // If any errors exist
    if (Object.values(newErrors).some((err) => err)) {
      setMessage("❌ Please fix the errors above before submitting.");
      return;
    }




    const payload = {
      callFor,  //pass props
      product, //pass props
      name,
      email,
      phone,
    
    };

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(`${API_BASE}/call-request`, payload);

      // success response
      if (res.status === 201 || res.data?._id) {
        setMessage("✅ Our experts will get back to you soon!");
     
        setName("");
        setEmail("");
        setPhone("");
        setErrors({ name: "", email: "", phone: "" });
      } else {
        setMessage("❌ Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting call request:", error);
      setMessage("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-3 shadow-sm bg-white">

     
  <h4 className="fw-bold mb-4">Let us Call You</h4>

      <form onSubmit={handleSubmit}>


        {/* Name */}
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.name ? "is-invalid" : name ? "is-valid" : ""
            }`}
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

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
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Contact No.</label>
          <input
            type="text"
            className={`form-control ${
              errors.phone ? "is-invalid" : phone ? "is-valid" : ""
            }`}
            value={phone}
            onChange={handlePhoneChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 fw-bold"
          disabled={loading}
        >
          {loading ? "Submitting..." : "SUBMIT REQUEST"}
        </button>
      </form>
    </div>
  );
}
