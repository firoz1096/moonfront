import { useState } from "react";
import axios from "axios";

const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function UploadMultipleImages({ source, onUpload }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    setFiles(selectedFiles);
    setPreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
    setError("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("⚠️ Please select at least one image.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file); // 🔹 Must match backend field name
    });

    try {
      setError("");
      const res = await axios.post(`${IMAGE_BASE}/upload-multiple`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("✅ Images uploaded successfully!");
      setFiles([]);
      setPreviews([]);

      if (onUpload) {
        onUpload(res.data.imagePaths); // array of paths
      }
    } catch (err) {
      console.error(err);
      setError("❌ Upload failed. Please try again.");
    }
  };

  return (
    <>
      <div className="row align-items-top">
        <div className="col-7">
         
           <label className="form-label">
                   {source}
                  </label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </div>

        <div className="col-5">
          <div>&nbsp;</div>
          <div className="d-flex align-items-center">
            <div className="me-4">
              <button  type="button" className="btn btn-sm btn-secondary" onClick={handleUpload}>
                Upload
              </button>
            </div>

            {previews.length > 0 && (
              <div className="d-flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i}`}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
