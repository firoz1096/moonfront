

import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE || "http://localhost:5000";

function VisaCountryInfoQueue() {
  const [visaData, setVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    country: "",
    thumbnail: "",
    visaSampleCopy: "",
    documentsRequired: "",
   
  });

  // 🔹 Fetch Data
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

  // 🔹 Delete Item
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

  // 🔹 Edit Item (open modal)
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      country: item.country || "",
      thumbnail: item.visaInfo?.thumbnail || "",
      visaSampleCopy: item.visaInfo?.visaSampleCopy || "",
      documentsRequired: item.visaInfo?.documentsRequired || "",
     
    });
    setShowModal(true);
  };

  // 🔹 Save Edited Item
  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE}/visa-info-country/${editingItem.visaInfo._id}`, formData);
      setShowModal(false);
      fetchVisaData();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================== UI ==================
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Visa Information Table</h4>

      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Country</th>
            <th>Thumbnail</th>
            <th>Documents Required</th>
            <th>Notes</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visaData.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No records found
              </td>
            </tr>
          ) : (
            visaData.map((item, index) => (
              <tr key={item.visaInfo?._id || index}>
                <td>{index + 1}</td>
                <td>{item.country}</td>
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
                <td>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.visaInfo?.documentsRequired || "",
                    }}
                  ></div>
                </td>
     
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(item)}
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

      {/* ===== Modal for Editing ===== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Visa Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Documents Required (HTML)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="documentsRequired"
                value={formData.documentsRequired}
                onChange={handleChange}
              />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VisaCountryInfoQueue;
