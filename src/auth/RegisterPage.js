import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { IoWarningOutline } from "react-icons/io5";

function RegisterPage() {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Validate a single field
  const validateField = (name, value) => {
    let message = "";

    if (name === "username" && !value.trim()) message = "Please enter the username";
    if (name === "email") {
      if (!value.trim()) message = "Please enter your email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email";
    }
    if (name === "password" && !value.trim()) message = "Please enter the password";
    if (name === "confirmPassword" && value !== password) message = "Passwords do not match";

    setErrors((prev) => ({ ...prev, [name]: message }));

    if (message) {
      setShakeFields((prev) => ({ ...prev, [name]: true }));
      setTimeout(() => setShakeFields((prev) => ({ ...prev, [name]: false })), 500);
    }

    return message === "";
  };

  // Validate all fields
  const validateForm = () => {
    const uValid = validateField("username", username);
    const eValid = validateField("email", email);
    const pValid = validateField("password", password);
    const cValid = validateField("confirmPassword", confirmPassword);
    return uValid && eValid && pValid && cValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setApiError("");
      await register(username, email, password);
      alert("User registered successfully! Please login.");
      navigate("/login");
    } catch (error) {
      setApiError(error.response?.data?.message || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username || email || password || confirmPassword) setApiError("");
  }, [username, email, password, confirmPassword]);

  return (
    <MainLayout>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="login_section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="mb-3">Agent Register</h3>

                    {/* Username */}
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        id="username"
                        type="text"
                        className={`form-control ${errors.username ? "is-invalid" : ""} ${shakeFields.username ? "shake" : ""}`}
                        placeholder="Username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          if (errors.username) validateField("username", e.target.value);
                        }}
                        onBlur={(e) => validateField("username", e.target.value)}
                        autoComplete="username"
                      />
                      {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""} ${shakeFields.email ? "shake" : ""}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) validateField("email", e.target.value);
                        }}
                        onBlur={() => validateField("email", email)}
                        autoComplete="email"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        id="password"
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""} ${shakeFields.password ? "shake" : ""}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) validateField("password", e.target.value);
                        }}
                        onBlur={() => validateField("password", password)}
                        autoComplete="new-password"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""} ${shakeFields.confirmPassword ? "shake" : ""}`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) validateField("confirmPassword", e.target.value);
                        }}
                        onBlur={() => validateField("confirmPassword", confirmPassword)}
                        autoComplete="new-password"
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    {/* API Error */}
                    {apiError && (
                      <div className="text-danger text-end mb-2">
                        <IoWarningOutline /> {apiError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="mb-3 text-end">
                      <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                      </button>
                    </div>

                    {/* Link to Login */}
                    <div className="mt-3 text-center">
                      Already have an account? <Link to="/login">Login here</Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </MainLayout>
  );
}

export default RegisterPage;
