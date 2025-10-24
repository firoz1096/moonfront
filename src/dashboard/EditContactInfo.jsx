import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function EditContactInfo() {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/contact-info`);
        setContactInfo(res.data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE}/contact-info/${contactInfo._id}`,
        contactInfo
      );
      alert("Contact info updated successfully!");
    } catch (err) {
      console.error("Error updating contact info:", err);
      alert("Failed to update contact info.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Contact Info</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={contactInfo.address}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={contactInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={contactInfo.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Working Hours</label>
          <input
            type="text"
            name="workingHours"
            className="form-control"
            value={contactInfo.workingHours}
            onChange={handleChange}
          />
        </div>



        <div className="col-md-6">
          <label className="form-label">Facebook URL</label>
          <input
            type="text"
            name="facebookUrl"
            className="form-control"
            value={contactInfo.facebookUrl}
            onChange={handleChange}
          />
        </div>


        <div className="col-md-6">
          <label className="form-label">Twitter URL</label>
          <input
            type="text"
            name="twitterUrl"
            className="form-control"
            value={contactInfo.twitterUrl}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Instagram URL</label>
          <input
            type="text"
            name="instagramUrl"
            className="form-control"
            value={contactInfo.instagramUrl}
            onChange={handleChange}
          />
        </div>


        <div className="col-md-6">
          <label className="form-label">Tiktok URL</label>
          <input
            type="text"
            name="tiktokUrl"
            className="form-control"
            value={contactInfo.tiktokUrl}
            onChange={handleChange}
          />
        </div>

          <div className="col-md-6">
          <label className="form-label">Youtube URL</label>
          <input
            type="text"
            name="youtubeUrl"
            className="form-control"
            value={contactInfo.youtubeUrl}
            onChange={handleChange}
          />
        </div>

          <div className="col-md-6">
          <label className="form-label">Linkedin URL</label>
          <input
            type="text"
            name="linkedinUrl"
            className="form-control"
            value={contactInfo.linkedinUrl}
            onChange={handleChange}
          />
        </div>


        <div className="col-12">
          <label className="form-label">Google Map Embed URL</label>
          <textarea
            name="mapEmbedUrl"
            className="form-control"
            rows="3"
            value={contactInfo.mapEmbedUrl}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
