import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import MainLayout from '../components/MainLayout';
import { IoWarningOutline } from "react-icons/io5";


function LoginPage() {
  //const { login, register } = useAuth();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [shakeFields, setShakeFields] = useState({ username: false, password: false }); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Validate a single field
  const validateField = (name, value) => {
    let message = "";
    if (name === "username" && !value.trim()) {
      message = "Please enter the username";
    }
    if (name === "password" && !value.trim()) {
      message = "Please enter the password";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));

    if (message) {
      setShakeFields((prev) => ({ ...prev, [name]: true }));
      setTimeout(() => setShakeFields((prev) => ({ ...prev, [name]: false })), 500);
    }

    return message === "";
  };

  // Validate all fields before login
  const validateForm = () => {
    const uValid = validateField("username", username);
    const pValid = validateField("password", password);
    return uValid && pValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await login(username, password);
      navigate("/dashboard"); 
    } catch (error) {
      // alert("Invalid credentials");
        setLoginError(true);
       setLoading(false);
    }
  };

  
//   const handleRegister = async () => {
//     try {
//       await register(username, password);
//       alert("User registered, now login!");
//     } catch (error) {
//       alert("Error registering user");
//     }
//   };

useEffect(() => {
  if (username || password) setLoginError(false);
}, [username, password]);

  return (
    <> 
      <MainLayout> 
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div   
        className="login_section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="mb-3">Agent Login</h3>

                    {/* Username */}
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username </label>
                      <input
                        className={`form-control ${errors.username ? "is-invalid" : ""} ${shakeFields.username ? "shake" : ""}`}
                        id="username"
                        type="text"
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

                    {/* Password */}
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password </label>
                      <input
                        className={`form-control ${errors.password ? "is-invalid" : ""} ${shakeFields.password ? "shake" : ""}`}
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) validateField("password", e.target.value);
                        }}
                        onBlur={(e) => validateField("password", e.target.value)}
                        autoComplete="current-password"   // 👈 add this
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Remember & Submit */}
                    <div className="mb-1">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="rememberme" />
                            <label className="form-check-label" htmlFor="rememberme">
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                      </button>

                           {/* <button onClick={handleRegister}>Register</button> */}
                        </div>
                      </div>
                    </div>
                        {loginError && <div className="text-danger text-end"> <IoWarningOutline />Invalid credentials </div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </form>
      </MainLayout>
    </>
  );
}

export default LoginPage;
