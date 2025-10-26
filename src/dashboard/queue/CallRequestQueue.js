import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner, Table, InputGroup, FormControl } from "react-bootstrap";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function CallRequestQueue() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    callFor: "",
    product: "",
    name: "",
    email: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all call requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/call-request`);
      // Sort by createdAt descending (newest first)
      const sortedData = res.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRequests(sortedData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load call requests.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch + auto-refresh every 30 seconds
  useEffect(() => {
    fetchRequests();
    // const interval = setInterval(fetchRequests, 30000); 
    // return () => clearInterval(interval); 
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Open modal for editing
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  // ✅ Close modal
  const handleClose = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  // ✅ Update call request
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`${API_BASE}/call-request/${editingItem._id}`, formData);
      fetchRequests();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update record");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete call request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`${API_BASE}/call-request/${id}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete record");
    }
  };

  // ✅ Helper to highlight search term
  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span style="background-color: yellow;">$1</span>');
  };

  // ✅ Filtered requests for search
const filteredRequests = requests.filter((item) =>
  [item.name, item.email, item.phone?.toString()] // convert phone to string
    .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
);


  return (
   
   <>  
    <MainLayout>
    <div className="container my-4">
      <h3 className="fw-bold mb-4">📞 Call Request Queue</h3>

      {/* Search Filter */}
      <InputGroup className="mb-3" style={{ maxWidth: 400 }}>
        <FormControl
          placeholder="Search by Name, Email or Phone No."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      )}
      {error && <div className="text-danger text-center">{error}</div>}

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Call For</th>
              <th>Product</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Requested At</th>
              <th style={{ width: "130px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(item.callFor) }}></td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(item.product || "-") }}></td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(item.name) }}></td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(item.email) }}></td>
                  <td dangerouslySetInnerHTML={{ __html: highlightMatch(item.phone?.toString()) }}></td>

                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="primary"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ✅ Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Form onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Call Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Call For</Form.Label>
              <Form.Control
                type="text"
                name="callFor"
                value={formData.callFor}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Form.Control
                type="text"
                name="product"
                value={formData.product || ""}
                onChange={handleChange}
                placeholder="e.g. Visa"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
     </MainLayout>
    </>

  );
}
