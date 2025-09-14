import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CrudRoundtripDeals() {
  const [deals, setDeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDeal, setCurrentDeal] = useState(null);

  // Fetch deals
  const fetchDeals = async () => {
    try {
      const res = await fetch("http://localhost:5000/round-trip-flight-deals");
      const data = await res.json();
      setDeals(data);
    } catch (err) {
      console.error("Error fetching deals:", err);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  // Open modal with selected deal
  const handleEdit = (deal) => {
    setCurrentDeal(deal);
    setShowModal(true);
  };

  // Handle input changes in modal
  const handleChange = (e) => {
    setCurrentDeal({ ...currentDeal, [e.target.name]: e.target.value });
  };

  // Update deal
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/round-trip-flight-deals/${currentDeal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDeal),
      });
      setShowModal(false);
      fetchDeals(); // Refresh table
    } catch (err) {
      console.error("Error updating deal:", err);
    }
  };

  // Delete deal
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this deal?")) return;

    try {
      await fetch(`http://localhost:5000/round-trip-flight-deals/${id}`, {
        method: "DELETE",
      });
      setDeals(deals.filter((deal) => deal._id !== id));
    } catch (err) {
      console.error("Error deleting deal:", err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Manage Round-Trip Flight Deals</h2>

      <table className="table table-striped table-bordered align-middle shadow-sm">
        <thead className="table-dark">
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
          {deals.length > 0 ? (
            deals.map((deal, index) => (
              <tr key={deal._id}>
                <td>{index + 1}</td>
                <td>
                  <div>{deal.fromCity?.city}, ({deal.fromCity?.citycode})</div>
                    <div className="text-muted"><small>{deal.fromCity?.airport}</small></div>
                </td>
                <td>
                  <div>{deal.toCity?.city}, ({deal.toCity?.citycode})</div>
                  <div className="text-muted"><small>{deal.toCity?.airport}</small></div>
                  </td>
                <td>{deal.country}</td>
                <td>{deal.price}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(deal)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(deal._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No deals found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && currentDeal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Deal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">

                <div className="row">

                <div className="mb-3 col-12">
                  <label className="form-label">Region</label>
                  <input
                    type="text" disabled
                    className="form-control" 
                    name="country"
                    value={currentDeal.country || ""}
                    onChange={handleChange}
                  />
                 </div>

                <div className="mb-3 col-12">

                <div className="row">

                  {/* From City */}
                  <div className="col-8">
                    <label className="form-label">From City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.fromCity?.city || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          fromCity: {
                            ...currentDeal.fromCity, // keep existing fields
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="col-4">
                    <label className="form-label">City Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.fromCity?.citycode || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          fromCity: {
                            ...currentDeal.fromCity,
                            citycode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <label className="form-label">Airport</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.fromCity?.airport || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          fromCity: {
                            ...currentDeal.fromCity,
                            airport: e.target.value,
                          },
                        })
                      }
                    />
                  </div>


                </div>

                </div>

                <div className="mb-3 col-12">

                <div className="row">

                  {/* To City */}
                  <div className="col-8">
                    <label className="form-label">To City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.toCity?.city || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          toCity: {
                            ...currentDeal.toCity, // keep existing fields
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="col-4">
                    <label className="form-label">City Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.toCity?.citycode || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          toCity: {
                            ...currentDeal.toCity,
                            citycode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <label className="form-label">Airport</label>
                    <input
                      type="text"
                      className="form-control"
                      value={currentDeal.toCity?.airport || ""}
                      onChange={(e) =>
                        setCurrentDeal({
                          ...currentDeal,
                          toCity: {
                            ...currentDeal.toCity,
                            airport: e.target.value,
                          },
                        })
                      }
                    />
                  </div>


                </div>

                </div>


                </div>

         


        
                
      
  
                <div className="mb-3">
                  <label className="form-label">Price (£)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={currentDeal.price || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Update Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
