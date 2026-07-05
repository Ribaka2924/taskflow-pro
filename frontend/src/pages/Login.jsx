import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "100px auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <h1>TaskFlow Pro</h1>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
