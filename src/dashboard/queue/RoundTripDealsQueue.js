
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import MainLayout from "../../components/MainLayout";
import Spinner from "../../components/Spinner";
import SmileyWarningAnimated from "../../components/SmileyWarningAnimated";
import { useNavigate } from "react-router-dom";



const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function RoundTripDealsQueue() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentDeal, setCurrentDeal] = useState(null);
    
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch deals
  const fetchDeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/round-trip-deals`);
      if (!res.ok) throw new Error("Failed to fetch deals");
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDeals = deals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(deals.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

 
const navigate = useNavigate();
  
const handleEdit = (deal) => {
    navigate(`/update-round-trip-deal/${deal._id}`);
  };

   // const handleEdit = (deal) => {
  //   setCurrentDeal(deal);
  //   setShowModal(true);
  // };


  const handleChange = (e) => {
    setCurrentDeal({ ...currentDeal, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE}/round-trip-deals/${currentDeal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDeal),
      });
      setShowModal(false);
      fetchDeals();
    } catch (err) {
      console.error("Error updating deal:", err);
    }
  };

const confirmDelete = (deal) => {
    setDealToDelete(deal);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE}/round-trip-deals/${dealToDelete._id}`, {
        method: "DELETE",
      });
      setDeals(deals.filter((deal) => deal._id !== dealToDelete._id));
    } catch (err) {
      console.error("Error deleting deal:", err);
    } finally {
      setShowDeleteModal(false);
      setDealToDelete(null);
    }
  };

  return (

    <> 
    <MainLayout>              
    <div className="container my-4 mb-5">
   {error && <p className="text-danger text-center">{error}</p>}

{loading ? 
//loader
<div><Spinner /></div>
:

//table and pagination
<> 
 <h4 className="mb-4">Round-Trip Flight Deals Queue</h4>
  <div className="table-responsive"> 
      <table className="table table-striped table-bordered align-middle shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>From</th>
            <th>To</th>
            <th>Region</th>
            <th>Price (£)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDeals.length > 0 ? (
            currentDeals.map((deal, index) => (
              <tr key={deal._id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <div>{deal.fromCity?.city} ({deal.fromCity?.citycode})</div>
                  <div className="text-muted"><small>{deal.fromCity?.airport}</small></div>
                </td>
                <td>
                  <div>{deal.toCity?.city} ({deal.toCity?.citycode})</div>
                  <div className="text-muted"><small>{deal.toCity?.airport}</small></div>
                </td>
                <td>{deal.country}</td>
                <td>{deal.price}</td>
                <td>
                <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(deal)}
                        >
                        <FaEdit />
                        </Button>

                        <Button
                              variant="warning"
                              size="sm"
                             className="me-2 d-none" 
                              onClick={() => handleEdit(deal)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => confirmDelete(deal)}
                            >
                              <FaTrash />
                            </Button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="6" className="text-center">No deals found</td>
              </tr>
            )
          )}
        </tbody>
      </table>

  </div>
      {/* Pagination */}
      {deals.length > 0 && (
      <nav>
        <ul className="pagination justify-content-start mt-3 mb-3">
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          {/* Next button */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      )}
</>

}

      {/* Modal form to edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Deal</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpdate}>
          <Modal.Body>
            {/* Region */}
            <div className="mb-3">
              <label className="form-label">Region</label>
              <input
                type="text"
                disabled
                className="form-control"
                name="country"
                value={currentDeal?.country || ""}
                onChange={handleChange}
              />
            </div>

            {/* From City */}
            <div className="mb-3 row">
              <div className="col-8">
                <label className="form-label">From City</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentDeal?.fromCity?.city || ""}
                  onChange={(e) => setCurrentDeal({
                    ...currentDeal,
                    fromCity: { ...currentDeal.fromCity, city: e.target.value }
                  })}
                />
              </div>
              <div className="col-4">
                <label className="form-label">City Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentDeal?.fromCity?.citycode || ""}
                  onChange={(e) => setCurrentDeal({
                    ...currentDeal,
                    fromCity: { ...currentDeal.fromCity, citycode: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Airport</label>
              <input
                type="text"
                className="form-control"
                value={currentDeal?.fromCity?.airport || ""}
                onChange={(e) => setCurrentDeal({
                  ...currentDeal,
                  fromCity: { ...currentDeal.fromCity, airport: e.target.value }
                })}
              />
            </div>

            {/* To City */}
            <div className="mb-3 row">
              <div className="col-8">
                <label className="form-label">To City</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentDeal?.toCity?.city || ""}
                  onChange={(e) => setCurrentDeal({
                    ...currentDeal,
                    toCity: { ...currentDeal.toCity, city: e.target.value }
                  })}
                />
              </div>
              <div className="col-4">
                <label className="form-label">City Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={currentDeal?.toCity?.citycode || ""}
                  onChange={(e) => setCurrentDeal({
                    ...currentDeal,
                    toCity: { ...currentDeal.toCity, citycode: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Airport</label>
              <input
                type="text"
                className="form-control"
                value={currentDeal?.toCity?.airport || ""}
                onChange={(e) => setCurrentDeal({
                  ...currentDeal,
                  toCity: { ...currentDeal.toCity, airport: e.target.value }
                })}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Price (£)</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={currentDeal?.price || ""}
                onChange={handleChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Update</Button>
          </Modal.Footer>
        </form>
      </Modal>


    {/* Modal form to delete */}

<Modal show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            size="sm"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="mb-3 text-center">  <SmileyWarningAnimated size={72} /></div>     
             <div>  Are you sure you want to delete this deal?</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>


    </div>
     </MainLayout>
     </>
  );
}
