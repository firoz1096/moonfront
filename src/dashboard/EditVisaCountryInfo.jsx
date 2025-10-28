import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import UploadImage from "../multer/UploadImage";
import JoditEditor from "jodit-react"; 


import { MdKeyboardArrowRight } from "react-icons/md";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

const EditVisaCountryInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    country: "",
    region: "",
    thumbnail: "",
    visaSampleCopy: "",
    documentsRequired: "",
    faqs: [{ question: "", answer: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [fetching, setFetching] = useState(true);

const editorConfig = {
  height: 300,
  toolbar: true,
  toolbarButtonSize: 'medium',
  buttons: [
    'bold', 'italic', 'underline', '|',
    'ul', 'ol', '|',
    'outdent', 'indent', '|',
    'align', 'undo', 'redo', '|',
    'link', 'image'
  ],
  enter: 'p', // critical: ensures Enter creates <p> inside <li>
};

  // 🔹 Fetch visa info by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/visa-info-country/id/${id}`);
        const data = res.data?.data;

        if (!data) throw new Error("Visa info not found");

        setFormData({
          country: data.country || "",
          region: data.visaInfo?.region || "",
          thumbnail: data.visaInfo?.thumbnail || "",
          visaSampleCopy: data.visaInfo?.visaSampleCopy || "",
          documentsRequired: data.visaInfo?.documentsRequired || "",
          faqs:
            data.visaInfo?.faqs?.length > 0
              ? data.visaInfo.faqs
              : [{ question: "", answer: "" }],
        });
      } catch (error) {
        console.error("Error fetching visa info:", error);
        setMessage({ type: "danger", text: "Failed to load visa info." });
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  // 🔹 Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Image upload handlers
  const handleThumbnailUpload = (path) =>
    setFormData((prev) => ({ ...prev, thumbnail: path }));
  const handleVisaSampleUpload = (path) =>
    setFormData((prev) => ({ ...prev, visaSampleCopy: path }));

  // 🔹 FAQ handlers
  const handleFaqChange = (index, field, e) => {
    const value = e.target.value;
    const faqs = [...formData.faqs];
    faqs[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    if (formData.faqs.length > 1) {
      const faqs = formData.faqs.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, faqs }));
    }
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        ...formData,
        faqs: formData.faqs.filter(
          (f) => f.question.trim() && f.answer.trim()
        ),
      };

      await axios.put(`${API_BASE}/visa-info-country/${id}`, payload);

      setMessage({
        type: "success",
        text: "Visa information updated successfully!",
      });

      setTimeout(() => navigate("/visa-country-queue"), 1500);
    } catch (error) {
      console.error("Update failed:", error);
      setMessage({
        type: "danger",
        text:
          error.response?.data?.error ||
          "Failed to update visa information. Please check logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-5">Loading visa data...</p>;

  return (
    <MainLayout>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h3>Edit Country Information for {formData.country}</h3>
          </div>

          <div className="col-lg-6 text-end">
            <Link className="text-primary text-decoration-none" to="/visa-country-queue">
              <MdKeyboardArrowRight /> Back to Country Queue
            </Link>
          </div>

          <div className="col-lg-12 mt-4">
            {message.text && (
              <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                {message.text}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage({ type: "", text: "" })}
                ></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Country & Region */}
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <label className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <label className="form-label">Select Region</label>
                  <select
                    className="form-select"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Asia">Asia</option>
                    <option value="Middle East">Middle East</option>
                    <option value="Africa">Africa</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="mb-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <UploadImage source="Update Thumbnail" onUpload={handleThumbnailUpload} />
                  </div>
                  <div className="col-lg-4">
                    {formData.thumbnail && (
                      <img
                        src={`${IMAGE_BASE}${formData.thumbnail}`}
                        alt="Thumbnail"
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Required */}
              <div className="mb-4">
                <label className="form-label">Documents Required</label>
                <JoditEditor
            
                  value={formData.documentsRequired}
                  config={editorConfig}
                  onBlur={(newContent) =>
                    setFormData((prev) => ({ ...prev, documentsRequired: newContent }))
                  }
                  onChange={() => {}}
                />
              </div>

              {/* FAQs */}
              <div className="mb-4">
                <label className="form-label fw-bold">Frequently Asked Questions</label>
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="card mb-3">
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Question?</label>
                        <input
                          type="text"
                          className="form-control"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(index, "question", e)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Answer</label>
                        <JoditEditor
                          value={faq.answer}
                          tabIndex={2}
                          onBlur={(content) =>
                            handleFaqChange(index, "answer", { target: { value: content } })
                          }
                          onChange={() => {}}
                        />
                      </div>
                      {formData.faqs.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFaq(index)}
                        >
                          Remove FAQ
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="text-end">
                  <button type="button" className="btn btn-sm btn-outline-success" onClick={addFaq}>
                    + Add FAQ
                  </button>
                  <hr />
                </div>
              </div>

              {/* Visa Sample Copy */}
              <div className="mb-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <UploadImage
                      source="Update Visa Sample Copy"
                      onUpload={handleVisaSampleUpload}
                    />
                  </div>
                  <div className="col-lg-4">
                    {formData.visaSampleCopy && (
                      <img
                        src={`${IMAGE_BASE}${formData.visaSampleCopy}`}
                        alt="Visa Sample"
                        style={{ width: "80px", height: "60px", objectFit: "cover" }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Updating...
                    </>
                  ) : (
                    "Update Visa Information"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditVisaCountryInfo;
