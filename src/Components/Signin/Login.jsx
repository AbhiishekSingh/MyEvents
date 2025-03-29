import React, { useEffect } from "react";
import { useAuth } from "../AuthContext"; 
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication response from the backend
    fetch("http://localhost:5000/auth/user", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.email) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/"); // Redirect to homepage
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign in to Continue</h2>
        <button onClick={login} className="google-login-btn">
          
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
