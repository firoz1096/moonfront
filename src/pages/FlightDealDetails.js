import MainLayout from '../components/MainLayout';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { PiCallBellFill } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import RightInfoIcons from '../components/RightInfoIcons';

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function FlightDealDetails() {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fromDestination: "",
    toDestination: "",
    adult: 1,
    children: 0,
    infant: 0,
    tripType: "",
    flightClass: "",
    airlineName: "",
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thankMessage, setThankMessage] = useState(false);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await axios.get(`${API_BASE}/flight-deals/${id}`);
        setDeal(res.data);

        // prefill hidden values from deal
        setFormData(prev => ({
          ...prev,
          fromDestination: `${res.data.fromCity.city} (${res.data.fromCity.citycode})`,
          toDestination: `${res.data.toCity.city} (${res.data.toCity.citycode})`,
          tripType: res.data.tripType,
          flightClass: res.data.travelClass,
          airlineName: res.data.airline.airlinename
        }));
      } catch (err) {
        console.error("Error fetching deal details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

if (loading) return (
  <div className="d-flex justify-content-center my-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

if (!deal && !loading) return (
  <div className="alert alert-danger">
    Could not fetch flight deal. Please try again later.
  </div>
);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (formData.message && formData.message.length > 500) {
      newErrors.message = "Message is too long (max 500 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setThankMessage(false);

    try {
      await axios.post(`${API_BASE}/post-flight-enquiry`, formData);

      setFormData({
        fromDestination: `${deal.fromCity.city} (${deal.fromCity.citycode})`,
        toDestination: `${deal.toCity.city} (${deal.toCity.citycode})`,
        adult: 1,
        children: 0,
        infant: 0,
        tripType: deal.tripType,
        flightClass: deal.travelClass,
        airlineName: deal.airline.airlinename,
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
      setThankMessage(true);
    }
  };

  const handleWhatsAppQuote = () => {
    if (!validateForm()) return;

    const message = `Hi, I'd like to get a quote for:
From: ${formData.fromDestination}
To: ${formData.toDestination}
Travel Class: ${formData.flightClass}
Trip Type: ${formData.tripType}
Travellers: ${formData.adult} Adult, ${formData.children} Children, ${formData.infant} Infant
Airline: ${deal.airline.airlinename} (${deal.airline.airlinecode})
Name: ${formData.name}
Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <MainLayout>
        <div className="form_booking_details">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <h1 className="text-white">
                  Flight from {deal.fromCity.city} to {deal.toCity.city}
                </h1>
                <h2 className="text-white">
                  <PiCallBellFill style={{ color: "yellow" }} />
                  Lowest Fare Secured – Final Step!
                </h2>
                <h5 className="mt-3 mb-4 text-white">
                  Lock in your special fare now – exclusive discounts available
                  for a limited time.
                </h5>

                {thankMessage ? (
                  <div className="fbd_fields me-lg-4">
                    <div className="col-lg-8 offset-lg-2 mt-3 mb-3">
                      <div className="fbd_fields me-lg-4 text-center shadow">
                        <div
                          className="text-success"
                          style={{ fontSize: "3rem" }}
                        >
                          <IoCheckmarkSharp />
                        </div>
                        <h2>Thank you For The Request!</h2>
                        <p className="mb-2">
                          You will get a reply from us shortly.
                        </p>
                        <Link className="btn btn-lg btn-primary" to="/">
                          Go to Homepage
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="fbd_fields bg-gradient me-lg-4">
                      <div className="row">
                        <h5 className="mb-4">
                          Please share your contact to confirm today's best deal.
                        </h5>

                        {/* From & To (readOnly) */}
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="fromDestination"
                              className="form-label"
                            >
                              From
                            </label>
                            <input
                              value={formData.fromDestination}
                              type="text"
                              className="form-control"
                              id="fromDestination"
                              name="fromDestination"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="toDestination"
                              className="form-label"
                            >
                              To
                            </label>
                            <input
                              value={formData.toDestination}
                              type="text"
                              className="form-control"
                              id="toDestination"
                              name="toDestination"
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Name */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label
                              htmlFor="name"
                              className="form-label"
                            >
                              Name <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Enter your name"
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              autoComplete="name"
                              aria-invalid={
                                errors.name ? "true" : "false"
                              }
                            />
                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="email"
                              className="form-label"
                            >
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Enter your email"
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              autoComplete="email"
                              aria-invalid={
                                errors.email ? "true" : "false"
                              }
                            />
                            {errors.email && (
                              <div className="invalid-feedback d-block">
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="phone"
                              className="form-label"
                            >
                              Phone <span className="text-danger">*</span>
                            </label>
                            <input
                              placeholder="Enter your phone number"
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              autoComplete="tel"
                              aria-invalid={
                                errors.phone ? "true" : "false"
                              }
                            />
                            {errors.phone && (
                              <div className="invalid-feedback d-block">
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label
                              htmlFor="message"
                              className="form-label"
                            >
                              Message
                            </label>
                            <textarea
                              className="form-control"
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows="3"
                              aria-invalid={
                                errors.message ? "true" : "false"
                              }
                            />
                            {errors.message && (
                              <div className="invalid-feedback d-block">
                                {errors.message}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-lg btn-primary me-3"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm me-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Submitting...
                              </>
                            ) : (
                              "Get Free Quote"
                            )}
                          </button>

                          <button
                            type="button"
                            className="btn btn-lg btn-success"
                            onClick={handleWhatsAppQuote}
                          >
                            <BsWhatsapp /> Get Free Quote on WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="col-lg-4">
                <div className="fbd_fields text-center">
                  <h6>Booking Details</h6>
                  <hr />
                  <div className="row ">
                    <div className="col-6 mb-3">
                      <div>
                        <b>From</b>
                      </div>
                      <div className="align-items-center d-flex justify-content-center">
                        <MdFlightTakeoff className="fs-4 me-1" />
                        {deal.fromCity.city}, ({deal.fromCity.citycode})
                      </div>
                      <div className="lh-1 text-muted">
                        {" "}
                        <small> ({deal.fromCity.airport})</small>
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <div>
                        <b>To</b>
                      </div>
                      <div className="align-items-center d-flex justify-content-center">
                        <MdFlightLand className="fs-4 me-1" /> {deal.toCity.city}
                        , ({deal.toCity.citycode})
                      </div>
                      <div className="lh-1 text-muted">
                        {" "}
                        <small> ({deal.toCity.airport})</small>
                      </div>
                    </div>

                    <div className="col-12">
                      <p>
                        {" "}
                        <b>Airline: </b> {deal.airline.airlinename} (
                        {deal.airline.airlinecode}){" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <img
                    src={`${IMAGE_BASE}${deal.imagePath}`}
                    alt={`${deal.toCity.city}`}
                    className="img-fluid object-cover rounded"
                  />
                </div>

                <div>
                  <RightInfoIcons/>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
