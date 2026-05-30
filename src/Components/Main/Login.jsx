import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: "center",
    color: "#333333",
    marginTop: "0",
    marginBottom: "30px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px 15px",
    marginBottom: "20px",
    border: "1px solid #cccccc",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
  },
  submitBtn: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  registerText: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "14px",
    color: "#666666",
  },
  registerLinkBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "0",
    textDecoration: "underline",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: user.email,
        password: user.password,
      });

      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        navigate("/admindash");
      } else if (role === "ROLE_USER") {
        navigate("/udashboard");
      } else {
        navigate("/customerdashboard");
      }
    } catch (error) {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Login Here</h2>
        <form style={styles.form} onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.submitBtn}>
            Login
          </button>
          <p style={styles.registerText}>
            Not registered?{" "}
            <button
              type="button"
              style={styles.registerLinkBtn}
              onClick={() => navigate("/register")}
            >
              Register Here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login ;