import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import JoditEditor from "jodit-react"; 
import UploadImage from "../multer/UploadImage";
import UploadMultipleImages from "../multer/UploadMultipleImages";
import CountryCitySelect from "../components/CountryCitySelect";
import Select from "react-select";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function UpdateUmrahDeal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);


//jodit editor config and refs
const editorConfig = {
  height: 300,
};
const overviewRef = useRef(null);
const termsRef = useRef(null);


  const ratingOptions = [
    { value: "1", label: "1 star" },
    { value: "2", label: "2 star" },
    { value: "3", label: "3 star" },
    { value: "4", label: "4 star" },
    { value: "5", label: "5 star" },
  ];

  const [formData, setFormData] = useState({
    hotelRating: "",
    city: "",
    country: "",
    title: "",
    thumbnail: "",
    shortDes: "",
    overview: "",
    price: "",
    noOfDays: "",
    inclusions: [""],
    exclusions: [""],
    termsConditions: "",
    gallery: [],
  });

  // Fetch deal by ID
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/umrah-deals/${id}`);
        setFormData({
          hotelRating: data.hotelRating?.toString() || "",
          city: data.city || "",
          country: data.country || "",
          title: data.title || "",
          thumbnail: data.thumbnail || "",
          shortDes: data.shortDes || "",
          overview: data.overview || "",
          price: data.price || "",
          noOfDays: data.noOfDays || "",
          inclusions: data.inclusions?.length ? data.inclusions : [""],
          exclusions: data.exclusions?.length ? data.exclusions : [""],
          termsConditions: data.termsConditions || "",
          gallery: data.gallery || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("❌ Fetch error:", err.response?.data || err.message);
        alert("Failed to load Umrah Deal ❌");
      }
    };
    fetchDeal();
  }, [id]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleArrayChange = (e, field, index) => {
    const values = [...formData[field]];
    values[index] = e.target.value;
    setFormData({ ...formData, [field]: values });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const handleThumbnailUpload = (imagePath) => {
    setFormData({ ...formData, thumbnail: imagePath });
  };

  const handleGalleryUpload = (imagePaths) => {
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...imagePaths],
    }));
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.hotelRating) newErrors.hotelRating = "Hotel rating is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.thumbnail) newErrors.thumbnail = "Thumbnail is required";
    if (!formData.shortDes) newErrors.shortDes = "Short description is required";

    const cleanOverview = formData.overview.replace(/<(.|\n)*?>/g, "").trim();
    if (!cleanOverview) newErrors.overview = "Overview is required";

    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a valid number";

    if (!formData.noOfDays) newErrors.noOfDays = "Number of Days is required";
    else if (isNaN(formData.noOfDays) || Number(formData.noOfDays) <= 0)
      newErrors.noOfDays = "Enter a valid number of days";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        noOfDays: Number(formData.noOfDays),
        hotelRating: Number(formData.hotelRating),
      };

      await axios.put(`${API_BASE}/umrah-deals/${id}`, payload);
      alert("✅ Umrah Deal Updated!");
      navigate("/umrah-deals-queue");
    } catch (err) {
      console.error("❌ Update error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Error updating deal ❌");
    }
  };

  if (loading) return <p className="text-center">Loading Umrah Deal...</p>;

  return (
    <MainLayout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h3 className="mb-4">Update Umrah Deal</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Title */}
                <div className="col-md-12 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <small className="text-danger">{errors.title}</small>}
                </div>

                {/* Hotel Rating */}
                <div className="col-md-3 mb-3">
                  <label className="form-label">Hotel</label>
                  <Select
                    options={ratingOptions}
                    value={ratingOptions.find(opt => opt.value === formData.hotelRating) || null}
                    onChange={(selected) =>
                      setFormData({ ...formData, hotelRating: selected ? selected.value : "" })
                    }
                    placeholder="Select Hotel"
                  />
                  {errors.hotelRating && <small className="text-danger">{errors.hotelRating}</small>}
                </div>

                {/* Country + City */}
                <div className="col-md-5 mb-3">
                <CountryCitySelect
                defaultCountry={formData.country}
                defaultCity={formData.city}
                onChange={({ country, city }) =>
                    setFormData({ ...formData, country, city })
                }
                />

                  {errors.country && <small className="text-danger">{errors.country}</small>}
                  {errors.city && <small className="text-danger">{errors.city}</small>}
                </div>

                {/* Price */}
                <div className="col-md-2 mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <small className="text-danger">{errors.price}</small>}
                </div>

                {/* Days */}
                <div className="col-md-2 mb-3">
                  <label className="form-label">Days</label>
                  <input
                    type="number"
                    name="noOfDays"
                    className={`form-control ${errors.noOfDays ? "is-invalid" : ""}`}
                    value={formData.noOfDays}
                    onChange={handleChange}
                  />
                  {errors.noOfDays && <small className="text-danger">{errors.noOfDays}</small>}
                </div>

                {/* Thumbnail */}
                <div className="col-md-12 mb-4">
                  <UploadImage source="Select Thumbnail" onUpload={handleThumbnailUpload} />
                  {formData.thumbnail && (
                    <img
                      src={`${IMAGE_BASE}${formData.thumbnail}`}
                      alt="Thumbnail"
                      style={{ width: "80px", height: "60px", objectFit: "cover" }}
                    />
                  )}
                  {errors.thumbnail && <small className="text-danger">{errors.thumbnail}</small>}
                </div>

                {/* Gallery */}
                <div className="col-md-12 mb-3">
                  <UploadMultipleImages source="Select Gallery" onUpload={handleGalleryUpload} />
                  {formData.gallery.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {formData.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={`${IMAGE_BASE}${img}`}
                          alt={`Gallery ${i}`}
                          style={{ width: "80px", height: "60px", objectFit: "cover" }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Inclusions */}
                <div className="col-md-12 mb-3">
                  <label>Inclusions</label>
                  {formData.inclusions.map((inc, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      value={inc}
                      onChange={(e) => handleArrayChange(e, "inclusions", i)}
                    />
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addField("inclusions")}>
                    + Add Inclusion
                  </button>
                </div>

                {/* Exclusions */}
                <div className="col-md-12 mb-3">
                  <label>Exclusions</label>
                  {formData.exclusions.map((exc, i) => (
                    <input
                      key={i}
                      className="form-control mb-2"
                      value={exc}
                      onChange={(e) => handleArrayChange(e, "exclusions", i)}
                    />
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => addField("exclusions")}>
                    + Add Exclusion
                  </button>
                </div>

                {/* Short Description */}
                <div className="col-md-12 mb-3">
                  <label>Short Description</label>
                  <textarea
                    name="shortDes"
                    className={`form-control ${errors.shortDes ? "is-invalid" : ""}`}
                    value={formData.shortDes}
                    onChange={handleChange}
                  />
                </div>

                {/* Overview */}
                <div className="col-md-12 mb-3">
                  <label>Overview</label>
            <JoditEditor
                ref={overviewRef}
                value={formData.overview}
                 config={editorConfig} 
                onBlur={(newContent) =>
                  setFormData({ ...formData, overview: newContent })
                }
              />
                </div>

                {/* Terms */}
                <div className="col-md-12 mb-3">
                  <label>Terms & Conditions</label>
              <JoditEditor
                  ref={termsRef}
                  value={formData.termsConditions}
                  config={editorConfig}
                  onBlur={(newContent) =>
                    setFormData({ ...formData, termsConditions: newContent })
                  }
                />
                </div>

                {/* Submit */}
                <div className="col-md-12 text-end">
                  <button type="submit" className="btn btn-lg btn-primary">
                    Update Deal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
