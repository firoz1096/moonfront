
import { FaGlobeAmericas, FaCalendarCheck, FaPlaneDeparture } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center mb-3">
       <h1 className="mb-4">How It Works</h1>
      
        <div className="row">
          
          {/* Step 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 step_card">
              <div className="card-body">
                <div
                  className="rounded-circle bg-primary text-white mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{ width: "70px", height: "70px", fontSize: "28px" }}
                >
                  <FaGlobeAmericas />
                </div>
                <h5 className="card-title fw-bold">1. Choose Your Destination</h5>
                <p className="card-text text-muted">
                  Browse from our curated list of popular and offbeat locations.
                  Whether it’s a solo trip, family vacation, or group tour—we’ve got it covered.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 step_card">
              <div className="card-body">
                <div
                  className="rounded-circle bg-success text-white mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{ width: "70px", height: "70px", fontSize: "28px" }}
                >
                  <FaCalendarCheck />
                </div>
                <h5 className="card-title fw-bold">2. Plan Your Journey</h5>
                <p className="card-text text-muted">
                  Select travel dates, preferred accommodation, and any custom requests.
                  Our team ensures your itinerary is smooth, secure, and tailored to your needs.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 step_card">
              <div className="card-body">
                <div
                  className="rounded-circle bg-danger text-white mx-auto mb-4 d-flex align-items-center justify-content-center"
                  style={{ width: "70px", height: "70px", fontSize: "28px" }}
                >
                  <FaPlaneDeparture />
                </div>
                <h5 className="card-title fw-bold">3. Book & Travel Hassle-Free</h5>
                <p className="card-text text-muted">
                  Confirm your booking with a simple checkout process. Then sit back,
                  relax, and get ready to explore—we’ll take care of everything else.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
