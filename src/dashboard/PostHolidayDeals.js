import { useState } from "react";
import axios from "axios";
import MainLayout from "../components/MainLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadImage from "../multer/UploadImage";
import UploadMultipleImages from "../multer/UploadMultipleImages";
import CountryCitySelect from "../components/CountryCitySelect";
import Select from "react-select";

export default function PostHolidayDeals() {

const [errors, setErrors] = useState({});

const categoryOptions = [
  { value: "adventure", label: "Adventure" },
  { value: "beach", label: "Beach" },
  { value: "camping", label: "Camping" },
  { value: "cultural", label: "Cultural" },
  { value: "family", label: "Family" },
  { value: "group", label: "Group" },
  { value: "hill station", label: "Hill Station" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "wildlife", label: "Wildlife" },
];


  const [formData, setFormData] = useState({
    category: "",
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

  // Regular text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // React Quill editor
  const handleQuillChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Arrays (inclusions / exclusions)
  const handleArrayChange = (e, field, index) => {
    const values = [...formData[field]];
    values[index] = e.target.value;
    setFormData({ ...formData, [field]: values });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // Handle single thumbnail upload
  const handleThumbnailUpload = (imagePath) => {
    setFormData({ ...formData, thumbnail: imagePath });
  };

  // Handle multiple gallery upload
const handleGalleryUpload = (imagePaths) => {
  setFormData((prev) => ({
    ...prev,
    gallery: [...prev.gallery, ...imagePaths], 
  }));
};



  // --- Validation function ---
const validateForm = () => {
  let newErrors = {};

  if (!formData.category) newErrors.category = "Category is required";
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

  return Object.keys(newErrors).length === 0; // ✅ valid if no errors
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return; // ❌ stop if invalid

  try {
    const payload = {
      ...formData,
      price: Number(formData.price),
      noOfDays: Number(formData.noOfDays),
    };

    await axios.post("http://localhost:5000/api/holiday-deals", payload);
    alert("✅ Holiday Deal Created!");

    setFormData({
      category: "",
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
    setErrors({});
  } catch (err) {
    console.error("❌ Upload error:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Error creating deal ❌");
  }
};




  return (
    <MainLayout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <h3 className="mb-4">Create Holiday Deal</h3>
<form onSubmit={handleSubmit}>
  <div className="row">

    {/* Title */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Title</label>
      <input
        name="title"
        className={`form-control ${errors.title ? "is-invalid" : ""}`}
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      {errors.title && <small className="text-danger">{errors.title}</small>}
    </div>

    {/* Category */}
    <div className="col-md-3 mb-3">
      <label className="form-label">Category</label>
      <Select
        options={categoryOptions}
        value={categoryOptions.find(opt => opt.value === formData.category) || null}
        onChange={(selected) =>
          setFormData({ ...formData, category: selected ? selected.value : "" })
        }
        placeholder="Select category..."
        isClearable
        className={errors.category ? "is-invalid" : ""}
      />
      {errors.category && <small className="text-danger">{errors.category}</small>}
    </div>

    {/* Country and City */}
    <div className="col-md-5 mb-3">
      <CountryCitySelect
        onChange={({ country, city }) =>
          setFormData({ ...formData, country, city })
        }
      />
      {errors.country && <small className="text-danger">{errors.country}</small>}
      {errors.city && <small className="text-danger">{errors.city}</small>}
    </div>

    {/* Price */}
    <div className="col-md-2 mb-3">
      <label className="form-label">Price (per person)</label>
      <input
        type="number"
        name="price"
        className={`form-control ${errors.price ? "is-invalid" : ""}`}
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      {errors.price && <small className="text-danger">{errors.price}</small>}
    </div>

    {/* No of Days */}
    <div className="col-md-2 mb-3">
      <label className="form-label">Number of Days</label>
      <input
        type="number"
        name="noOfDays"
        className={`form-control ${errors.noOfDays ? "is-invalid" : ""}`}
        placeholder="Number of Days"
        value={formData.noOfDays}
        onChange={handleChange}
      />
      {errors.noOfDays && <small className="text-danger">{errors.noOfDays}</small>}
    </div>

    {/* Thumbnail */}
    <div className="col-md-12 mb-4">
      <UploadImage
        source="Select an Image for Thumbnail"
        onUpload={handleThumbnailUpload}
      />
      {formData.thumbnail && (
        <div className="mt-2">
          <img
           src={`http://localhost:5000${formData.thumbnail}`} 
         
            alt="Thumbnail"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
          />
        </div>
      )}
      {errors.thumbnail && <small className="text-danger">{errors.thumbnail}</small>}
    </div>

    {/* Gallery */}
    <div className="col-md-12 mb-3">
      <UploadMultipleImages
        source="Select Images for Gallery"
        onUpload={handleGalleryUpload}
      />
      {formData.gallery.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mt-2">
          {formData.gallery.map((img, i) => (
            <img
              key={i}
             src={`http://localhost:5000${img}`} 
              alt={`Gallery ${i}`}
              style={{ width: "80px", height: "60px", objectFit: "cover" }}
            />
          ))}
        </div>
      )}
      {errors.gallery && <small className="text-danger">{errors.gallery}</small>}
    </div>

    {/* Inclusions */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Inclusions</label>
      {formData.inclusions.map((inc, i) => (
        <input
          key={i}
          className="form-control mb-2"
          value={inc}
          onChange={(e) => handleArrayChange(e, "inclusions", i)}
          placeholder="Inclusion"
        />
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => addField("inclusions")}
      >
        + Add Inclusion
      </button>
      {errors.inclusions && <small className="text-danger">{errors.inclusions}</small>}
    </div>

    {/* Exclusions */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Exclusions</label>
      {formData.exclusions.map((exc, i) => (
        <input
          key={i}
          className="form-control mb-2"
          value={exc}
          onChange={(e) => handleArrayChange(e, "exclusions", i)}
          placeholder="Exclusion"
        />
      ))}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => addField("exclusions")}
      >
        + Add Exclusion
      </button>
      {errors.exclusions && <small className="text-danger">{errors.exclusions}</small>}
    </div>

    {/* Short Description */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Short Description</label>
      <textarea
        name="shortDes"
        className={`form-control ${errors.shortDes ? "is-invalid" : ""}`}
        placeholder="Short Description"
        value={formData.shortDes}
        onChange={handleChange}
      />
      {errors.shortDes && <small className="text-danger">{errors.shortDes}</small>}
    </div>

    {/* Overview */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Overview</label>
      <ReactQuill
        theme="snow"
        value={formData.overview}
        onChange={(value) => handleQuillChange("overview", value)}
        style={{ height: "150px", marginBottom: "50px" }}
      />
      {errors.overview && <small className="text-danger">{errors.overview}</small>}
    </div>

    {/* Terms & Conditions */}
    <div className="col-md-12 mb-3">
      <label className="form-label">Terms & Conditions</label>
      <ReactQuill
        theme="snow"
        value={formData.termsConditions}
        onChange={(value) => handleQuillChange("termsConditions", value)}
        style={{ height: "150px", marginBottom: "50px" }}
      />
      {errors.termsConditions && (
        <small className="text-danger">{errors.termsConditions}</small>
      )}
    </div>

    {/* Submit */}
    <div className="col-md-12 text-end">
      <button type="submit" className="btn btn-lg btn-primary">
        Submit
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
