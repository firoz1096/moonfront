import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import axios from "axios";
import UploadImage from "../multer/UploadImage";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";


const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";


const PostVisaCountryInfo = () => {

const editorConfig = {
  height: 300,
};

  const [formData, setFormData] = useState({
    country: "",
    region: "",
    thumbnail: "",
    visaSampleCopy: "",
    documentsRequired: "",
    faqs: [{ question: "", answer: "" }],
   
  });

  const [existingCountries, setExistingCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/visa-info-country`);
        if (Array.isArray(data)) {
          const countries = data
            .filter((c) => typeof c === "string" && c.trim() !== "")
            .map((c) => c.toLowerCase());
          setExistingCountries(countries);
        } else if (Array.isArray(data.data)) {
          const countries = data.data
            .filter((c) => typeof c.country === "string")
            .map((c) => c.country.toLowerCase());
          setExistingCountries(countries);
        } else {
          setExistingCountries([]);
        }
      } catch (error) {
        console.error("Error fetching existing countries:", error);
        setExistingCountries([]);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (imagePath) => {
    setFormData((prev) => ({ ...prev, thumbnail: imagePath }));
  };

  const handleVisaSampleUpload = (imagePath) => {
    setFormData((prev) => ({ ...prev, visaSampleCopy: imagePath }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const countryName = formData.country.trim();
      if (!countryName || !formData.thumbnail) {
        setMessage({
          type: "danger",
          text: "Country and thumbnail are required.",
        });
        setLoading(false);
        return;
      }

      if (existingCountries.includes(countryName.toLowerCase())) {
        setMessage({
          type: "danger",
          text: `Visa info for "${countryName}" already exists.`,
        });
        setLoading(false);
        return;
      }

      const submitData = {
        ...formData,
        country: countryName,
        faqs: formData.faqs.filter(
          (faq) => faq.question.trim() !== "" && faq.answer.trim() !== ""
        ),
      };

      const res = await axios.post(`${API_BASE}/visa-info-country`, submitData);

      setMessage({
        type: "success",
        text: res.data.message || "Visa information created successfully!",
      });

      setFormData({
        country: "",
        region: "",
        thumbnail: "",
        visaSampleCopy: "",
        documentsRequired: "",
        faqs: [{ question: "", answer: "" }],
        
      });

      setExistingCountries((prev) => [...prev, countryName.toLowerCase()]);
    } catch (error) {
      console.error("Error creating visa info:", error);
      setMessage({
        type: "danger",
        text:
          error.response?.data?.error ||
          "Server error creating visa info. Please check logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <MainLayout>
    <div className="container py-4">
      <div className="row justify-content-center">
        
        <div className="col-lg-6">

           <h3>Create Country </h3>
        </div>

        <div className="col-lg-6 text-end">
           <Link className="text-primary text-decoration-none" to="/visa-country-queue"> <MdKeyboardArrowRight />
 Country Queue</Link>
        </div>

        <div className="col-lg-12 mt-4">
          <div>
       
            <div>
              {message.text && (
                <div
                  className={`alert alert-${message.type} alert-dismissible fade show`}
                >
                  {message.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage({ type: "", text: "" })}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Country */}
                <div className="row">


 <div className='col-lg-6 mb-3'>
<label htmlFor="country" className="form-label">
                    Country <span className="text-danger">*</span>
                  </label>
                              <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country name (e.g., India)"
                    required
                  />
 </div>

         

            <div className='col-lg-6 mb-3'>
                <label htmlFor="region" className="form-label">Select Region</label>
            <select
                className="form-select"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
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

                  <UploadImage
                    source="Select an Image for Thumbnail"
                    onUpload={handleThumbnailUpload}
                  />

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
                    tabIndex={1}
                     config={editorConfig}
                    onBlur={(newContent) =>
                      setFormData((prev) => ({ ...prev, documentsRequired: newContent }))
                    }
                    onChange={() => {}}
                  />
                </div>

                {/* FAQs */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label"><b>Frequently Asked Questions</b></label>
   
                  </div>

                  {formData.faqs.map((faq, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Question?</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter question"
                            value={faq.question}
                            onChange={(e) =>
                              handleFaqChange(index, "question", e)
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Answer</label>
                          <JoditEditor
                            value={faq.answer}
                            tabIndex={2}
                           
                            onBlur={(newContent) =>
                              handleFaqChange(index, "answer", { target: { value: newContent } })
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
                                     <button
                      type="button"
                      className="btn btn-sm btn-outline-success"
                      onClick={addFaq}
                    >
                      + Add FAQ
                    </button>
                    <hr/>
                  </div>
                </div>

                {/* Visa Sample */}
                <div className="mb-4">

                  <div className="row align-items-center">
                    <div className="col-lg-8"> 
                  <UploadImage
                    source="Select a Visa Copy Sample"
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
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      "Create Visa Information"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

      </MainLayout>
    
    </>

  );
};

export default PostVisaCountryInfo;
