import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

function VisaCountryInfoQueue() {
  const [visaData, setVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔹 Fetch all visa info
  const fetchVisaData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/visa-info-country`);
      if (res.data?.data) {
        setVisaData(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisaData();
  }, []);

  // 🔹 Delete item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${API_BASE}/visa-info-country/${id}`);
      setVisaData(visaData.filter((item) => item.visaInfo._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Visa Information Table</h4>

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Country</th>
            <th>Region</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visaData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            visaData.map((item, index) => (
              <tr key={item.visaInfo?._id || index}>
                <td>{index + 1}</td>
                <td>
                  {item.visaInfo?.thumbnail ? (
                    <img
                      src={`${IMAGE_BASE}${item.visaInfo.thumbnail}`}
                      alt="thumb"
                      width="70"
                      height="50"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{item.country}</td>
                <td>{item.visaInfo?.region || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() =>
                      navigate(`/edit-visa-country-info/${item.visaInfo._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item.visaInfo._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VisaCountryInfoQueue;
