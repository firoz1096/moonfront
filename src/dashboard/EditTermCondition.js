import { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditTermCondition() {
  const [termInfo, setTermInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/terms-info");
        setTermInfo(res.data);
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
    setTermInfo((prev) => ({ ...prev, termsAndConditions: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/terms-info/${termInfo._id}`,
        termInfo
      );
      alert("Terms and Conditions updated successfully!");
    } catch (err) {
      console.error("Error updating Term info:", err);
      alert("Failed to update Terms and Conditions.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Terms and Conditions</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-12">
          <label className="form-label">Terms and Conditions</label>
          <div style={{ height: "450px", marginBottom: "50px" }}>
            <ReactQuill
              theme="snow"
              value={termInfo.termsAndConditions}
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
