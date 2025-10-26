import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const PostVisaType = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [formData, setFormData] = useState({
    visaInfoId: "",
    title: "",
    processingTime: "",
    stayPeriod: "",
    validity: "",
    entryType: "Single",
    fees: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Fetch countries from backend
useEffect(() => {
  setLoadingCountries(true);
  axios
    .get(`${API_BASE}/visa-info-country`)
    .then((res) => {
      if (res.data.success && Array.isArray(res.data.data)) {
        const countryList = res.data.data
          .filter((item) => item.visaInfo && item.visaInfo._id && item.country)
          .map((item) => ({
            id: item.visaInfo._id,   // ✅ visaInfo._id, not item._id
            name: item.country,      // ✅ country name
          }));
        setCountries(countryList);
      } else {
        setCountries([]);
      }
    })
    .catch((err) => {
      console.error("Error fetching countries:", err);
      setMessage("❌ Error fetching countries.");
      setIsSuccess(false);
    })
    .finally(() => setLoadingCountries(false));
}, []);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.visaInfoId) newErrors.visaInfoId = "Please select a country";
    if (!formData.title.trim()) newErrors.title = "Visa title is required";
    if (!formData.processingTime) newErrors.processingTime = "Processing time is required";
    if (!formData.stayPeriod) newErrors.stayPeriod = "Stay period is required";
    if (!formData.validity) newErrors.validity = "Validity is required";
    if (!formData.fees) newErrors.fees = "Fees amount is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSuccess(false);

    if (!validateForm()) return;

    setLoadingSubmit(true);

    try {
      const payload = {
        ...formData,
        processingTime: Number(formData.processingTime),
        stayPeriod: Number(formData.stayPeriod),
        validity: Number(formData.validity),
        fees: Number(formData.fees),
      };

      console.log("Submitting payload:", payload);

      await axios.post(`${API_BASE}/visa-type`, payload);

      setMessage("✅ Visa Type created successfully!");
      setIsSuccess(true);

      // Reset form
      setFormData({
        visaInfoId: "",
        title: "",
        processingTime: "",
        stayPeriod: "",
        validity: "",
        entryType: "Single",
        fees: "",
        isActive: true,
      });
      setErrors({});
    } catch (err) {
      console.error("Axios error response:", err.response?.data || err);
      setMessage(err.response?.data?.error || "❌ Server error creating visa type");
      setIsSuccess(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="container my-5">
      
      <div className="row align-items-center mb-4">
        <div className="col-lg-6">
          <h2 className="text-primary fw-semibold">Create Visa</h2>
        </div>

         <div className="col-lg-6">
         
         <Link to="/post-visa-country-info" className="btn btn-outline-primary float-end">
          Create Country
         </Link>

         </div>
      </div>

      {message && (
        <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        {/* Country */}
        <div className="mb-3">
          <label className="form-label">Country</label>
<select
  name="visaInfoId"
  className={`form-select ${errors.visaInfoId ? "is-invalid" : ""}`}
  value={formData.visaInfoId}
  onChange={handleChange}
  disabled={loadingCountries}
>
  <option value="">
    {loadingCountries ? "Loading countries..." : "Select Country"}
  </option>

  {countries.map((country) => (
    <option key={country.id} value={country.id}>
      {country.name}
    </option>
  ))}
</select>

          {errors.visaInfoId && <div className="invalid-feedback">{errors.visaInfoId}</div>}
        </div>

        {/* Visa Title */}
        <div className="mb-3">
          <label className="form-label">Visa Type Title</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Processing Time */}
        <div className="mb-3">
          <label className="form-label">Processing Time (days)</label>
          <input
            type="number"
            name="processingTime"
            className={`form-control ${errors.processingTime ? "is-invalid" : ""}`}
            value={formData.processingTime}
            onChange={handleChange}
          />
          {errors.processingTime && <div className="invalid-feedback">{errors.processingTime}</div>}
        </div>

        {/* Stay Period */}
        <div className="mb-3">
          <label className="form-label">Stay Period (days)</label>
          <input
            type="number"
            name="stayPeriod"
            className={`form-control ${errors.stayPeriod ? "is-invalid" : ""}`}
            value={formData.stayPeriod}
            onChange={handleChange}
          />
          {errors.stayPeriod && <div className="invalid-feedback">{errors.stayPeriod}</div>}
        </div>

        {/* Validity */}
        <div className="mb-3">
          <label className="form-label">Validity (days)</label>
          <input
            type="number"
            name="validity"
            className={`form-control ${errors.validity ? "is-invalid" : ""}`}
            value={formData.validity}
            onChange={handleChange}
          />
          {errors.validity && <div className="invalid-feedback">{errors.validity}</div>}
        </div>

        {/* Entry Type */}
        <div className="mb-3">
          <label className="form-label">Entry Type</label>
          <select
            name="entryType"
            className="form-select"
            value={formData.entryType}
            onChange={handleChange}
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Multiple">Multiple</option>
          </select>
        </div>

        {/* Fees */}
        <div className="mb-3">
          <label className="form-label">Fees (USD)</label>
          <input
            type="number"
            name="fees"
            className={`form-control ${errors.fees ? "is-invalid" : ""}`}
            value={formData.fees}
            onChange={handleChange}
          />
          {errors.fees && <div className="invalid-feedback">{errors.fees}</div>}
        </div>

        {/* Active */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isActive">
            Active
          </label>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100" disabled={loadingSubmit}>
          {loadingSubmit ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            "Save Visa Type"
          )}
        </button>
      </form>
    </div>
  );
};

export default PostVisaType;
