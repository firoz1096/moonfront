import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import SmileyWarningAnimated from "../../components/SmileyWarningAnimated";
import { useNavigate } from "react-router-dom";


const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export default function HolidayDealsQueue() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    
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
      const res = await fetch(`${API_BASE}/holiday-deals`);
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
    navigate(`/update-holiday-deal/${deal._id}`);
  };
 

const confirmDelete = (deal) => {
    setDealToDelete(deal);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE}/holiday-deals/${dealToDelete._id}`, {
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
 <h4 className="mb-4">Holiday Deals Queue</h4>
  <div className="table-responsive"> 
      <table className="table table-striped table-bordered align-middle shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>City</th>
            <th>Country</th>
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
                  <div>{deal.title}</div>
    
                </td>
                <td>
                  <div>{deal.city} </div>
                 
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
