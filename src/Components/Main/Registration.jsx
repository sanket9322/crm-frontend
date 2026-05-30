import axios from 'axios';
import { useState } from 'react';
import { FaUsers } from "react-icons/fa";
import { FaPhone } from 'react-icons/fa6';
import { MdEmail, MdLocationCity } from 'react-icons/md';
import { TbPasswordMobilePhone } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

// --- Inline Style Objects ---
const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7f6",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "450px",
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
    fontWeight: "600",
  },
  inputGroup: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    padding: "10px 15px",
    marginBottom: "20px",
  },
  icon: {
    color: "#555555",
    fontSize: "20px",
    marginRight: "12px",
  },
  input: {
    border: "none",
    background: "transparent",
    width: "100%",
    fontSize: "16px",
    outline: "none",
    color: "#333333",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    fontSize: "16px",
    color: "#333333",
    outline: "none",
    marginBottom: "25px",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },
};

const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    password: "",
    role: "USER"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // ✅ FIXED: Was calling POST /api/users (requires auth → 403).
      //           Now correctly calls POST /api/auth/register (public endpoint).
      await axios.post("http://localhost:8080/api/auth/register", user);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Registration Here!</h2>

        <form onSubmit={handleAdd}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <FaUsers style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div style={styles.inputGroup}>
            <MdEmail style={styles.icon} />
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Field */}
          <div style={styles.inputGroup}>
            <FaPhone style={styles.icon} />
            <input
              style={styles.input}
              type="tel"
              name="contact"
              placeholder="Enter phone"
              onChange={handleChange}
              required
            />
          </div>

          {/* City Field */}
          <div style={styles.inputGroup}>
            <MdLocationCity style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              name="city"
              placeholder="Enter city"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <TbPasswordMobilePhone style={styles.icon} />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection Dropdown — ✅ FIXED: Added ROLE_ADMIN option */}
          <select
            style={styles.select}
            name="role"
            onChange={handleChange}
            value={user.role}
          >
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="CUSTOMER">Customer</option>
          </select>

          {/* Submit Button */}
          <button type="submit" style={styles.submitBtn}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
