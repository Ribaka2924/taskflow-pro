import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #e9d5ff)",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <div className="text-center mb-4">
          <h1 style={{ fontSize: "60px" }}>📋</h1>

          <h2
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
            }}
          >
            TaskFlow Pro
          </h2>

          <p className="text-muted">Organize your work. Achieve your goals.</p>
        </div>

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100 rounded-pill"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

        <hr />

        <p
          className="text-center text-muted"
          style={{
            fontStyle: "italic",
          }}
        >
          "Success is the sum of small efforts repeated every day."
        </p>
      </div>
    </div>
  );
}

export default Login;
