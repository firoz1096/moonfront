import { useState } from "react";
import axios from "axios";

const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

export default function UploadImage({source,  onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(""); // NEW state for error messages
  const [success, setSuccess] = useState(""); // NEW state for success messages

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setError(""); // clear error when user selects a file
  };

  const handleUpload = async () => {
    if (!file) {
      setError("⚠️ Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setError(""); // clear previous error
      const res = await axios.post(`${IMAGE_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("✅ Image uploaded successfully!");
      setFile(null);
      setPreview(null);

      if (onUpload) {
        onUpload(res.data.imagePath);
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

         <label className="form-label"> {source} </label>
        
      <input className="form-control" type="file" accept="image/*" onChange={handleFileChange} />
       {error && <p className="text-danger"> {error}</p>}
         {success && <p className="text-success">{success}</p>}
         </div>

         <div className="col-5">

 <div>&nbsp; </div>
          <div className="d-flex align-items-center">
            <div className="me-4"> <button  type="button" className="btn btn-sm btn-secondary" onClick={handleUpload}> Upload </button> </div>
         
              {preview && (
        <div>
          <img style={{ maxWidth: "100%", height: "50px" }} src={preview} alt="Preview" />
        </div>
      )}
          </div>

     
 
  
  


         </div>

       
    </div>
    
    </>
 
  );
}
