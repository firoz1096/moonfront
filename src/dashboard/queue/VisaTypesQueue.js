import MainLayout from "../../components/MainLayout";
import  { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

const VisaTypesQueue = () => {
  const [visaData, setVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVisaData();
  }, []);

  const fetchVisaData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/visa-type`);
      setVisaData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (visaTypeId) => {
    if (!window.confirm("Are you sure you want to delete this visa type?")) return;
    try {
      await axios.delete(`${API_BASE}/visa-type/${visaTypeId}`);
      fetchVisaData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleEdit = (visaType) => {
    setEditItem(visaType);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API_BASE}/visa-type/${editItem._id}`, editItem);
      setShowModal(false);
      fetchVisaData();
    } catch (err) {
      console.error("Error updating:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  return (

      <> 
      <MainLayout>  

    <div className="container mt-4">
      <h3 className="mb-4">Visa Type Management</h3>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading data...</p>
        </div>
      ) : visaData.length === 0 ? (
        <p>No data available</p>
      ) : (
        visaData.map((countryItem) => (
          <div key={countryItem.country} className="card mb-4 shadow-sm">
            <div className="card-header bg-light">
              <strong>{countryItem.country}</strong>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Processing Time</th>
                    <th>Stay Period</th>
                    <th>Validity</th>
                    <th>Entry Type</th>
                    <th>Fees</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {countryItem.visaTypes?.map((v) => (
                    <tr key={v._id}>
                      <td>{v.title}</td>
                      <td>{v.processingTime}</td>
                      <td>{v.stayPeriod}</td>
                      <td>{v.validity}</td>
                      <td>{v.entryType}</td>
                      <td>{v.fees}</td>
                      <td>{v.isActive ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() =>
                            handleEdit({ ...v, country: countryItem.country })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(v._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Visa Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editItem && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={editItem.country || ""}
                    disabled
                    className="text-muted"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={editItem.title || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Processing Time</Form.Label>
                  <Form.Control
                    type="number"
                    name="processingTime"
                    value={editItem.processingTime || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Stay Period</Form.Label>
                  <Form.Control
                    type="number"
                    name="stayPeriod"
                    value={editItem.stayPeriod || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Validity</Form.Label>
                  <Form.Control
                    type="number"
                    name="validity"
                    value={editItem.validity || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Entry Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="entryType"
                    value={editItem.entryType || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fees</Form.Label>
                  <Form.Control
                    type="number"
                    name="fees"
                    value={editItem.fees || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Is Active"
                    name="isActive"
                    checked={!!editItem.isActive}
                    onChange={(e) =>
                      setEditItem((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>

    </MainLayout>
       
       </>  
  );
};

export default VisaTypesQueue;
