import { useState, useEffect } from "react";
import subscribe_bg from "../assets/images/flight-taking-off.jpg";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (message) {
      setFade(true); // start visible
      const timer = setTimeout(() => setFade(false), 4000); // start fade
      const removeTimer = setTimeout(() => setMessage(null), 4500); // remove completely
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message]);

  const validateEmail = (email) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage({ type: "error", text: "Email is required" });
    if (!validateEmail(email))
      return setMessage({ type: "error", text: "Please enter a valid email" });

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between text-white mt-5 mb-5 position-relative"
      style={{
        backgroundImage: `url(${subscribe_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 40px",
        minHeight: "400px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
        }}
      />
      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-md-6 text-white">
            <h2 className="fw-bold mb-3">Don’t Overpay for Flights Again</h2>
            <p className="fs-5">
              2.5M+ travelers already access exclusive airfare deals — join now
              and start saving big!
            </p>
          </div>
          <div className="col-md-5">
            <div className="bg-white p-4 rounded shadow" style={{ borderRadius: "12px" }}>
              <h5 className="fw-bold text-dark mb-2">Fly for Less — Guaranteed</h5>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <button className="btn btn-primary px-4" type="submit" disabled={loading}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>

              {/* Animated Alert */}
              {message && (
                <div
                  className={`p-1 ${
                    message.type === "success" ? "text-success" : "text-danger"
                  } fade ${fade ? "show" : ""}`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
