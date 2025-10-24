
import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";


export default function EditAboutUsInfo() {
  const [aboutInfo, setAboutInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/about-info`);
        setAboutInfo(res.data);
      } catch (err) {
        console.error("Error fetching Term info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTermInfo();
  }, []);

  // ✅ Correct handler for ReactQuill
  const handleQuillChange = (value) => {
    setAboutInfo((prev) => ({ ...prev, aboutUs: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE}/about-info/${aboutInfo._id}`,
        aboutInfo
      );
      alert("About Us updated successfully!");
    } catch (err) {
      console.error("Error updating Term info:", err);
      alert("Failed to update About Us.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit About Us</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label className="form-label">About Us</label>
          <div style={{ height: "450px", marginBottom: "50px" }}>
            <ReactQuill
              theme="snow"
              value={aboutInfo.aboutUs}
              onChange={handleQuillChange}
              style={{ height: "100%" }}
            />
          </div>
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
