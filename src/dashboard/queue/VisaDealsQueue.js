import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function VisaDealsQueue() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    country: "",
    email: "",
    phone: "",
    visaType: "",
    travellers: 1,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [message, setMessage] = useState("");

  // Fetch enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/visa-enquiry`);
      if (res.data.success) setEnquiries(res.data.data);
    } catch (err) {
      console.error("Error fetching visa enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update enquiry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/visa-enquiry/${formData._id}`, formData);
      setMessage("✅ Enquiry updated successfully!");
      setFormData({
        _id: "",
        country: "",
        email: "",
        phone: "",
        visaType: "",
        travellers: 1,
      });
      setIsEditing(false);
      setShowEditModal(false);
      fetchEnquiries();
    } catch (err) {
      console.error("Error updating enquiry:", err);
      setMessage("❌ Failed to update enquiry.");
    }
  };

  // Open edit modal
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowEditModal(true);
    setMessage("");
  };

  // Open delete modal
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/visa-enquiry/${deleteId}`);
      setMessage("🗑️ Enquiry deleted successfully!");
      setShowDeleteModal(false);
      fetchEnquiries();
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      setMessage("❌ Failed to delete enquiry.");
      setShowDeleteModal(false);
    }
  };

  return (
  <> 
  <MainLayout>  

    <div className="container mt-4">
      <h4 className="fw-bold mb-3">Visa Enquiry Management</h4>

      {message && (
        <div
          className={`alert ${
            message.startsWith("✅") || message.startsWith("🗑️")
              ? "alert-success"
              : "alert-danger"
          } py-2`}
        >
          {message}
        </div>
      )}

      {/* Table List */}
      {loading ? (
        <div className="text-center py-4">Loading enquiries...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Country</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Visa Type</th>
                <th>Travellers</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((item) => (
                  <tr key={item._id}>
                    <td>{item.country || "-"}</td>
                    <td>{item.email}</td>
                    <td>{item.phone || "-"}</td>
                    <td>{item.visaType}</td>
                    <td>{item.travellers}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Visa Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                name="country"
                className="form-control"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="mb-2">
              <input
                name="email"
                className="form-control"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                name="phone"
                className="form-control"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                name="visaType"
                className="form-control"
                placeholder="Visa Type"
                value={formData.visaType}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <input
                name="travellers"
                type="number"
                className="form-control"
                placeholder="Travellers"
                value={formData.travellers}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" variant="primary" className="w-100 mt-2">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this enquiry?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </MainLayout>
     
     </>

  );
}
