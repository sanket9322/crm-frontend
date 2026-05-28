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
  btnContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "10px",
  },
  registerBtn: {
    backgroundColor: "#007bff", // Vibrant blue
    color: "white",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },
  loginText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#666666",
    margin: "15px 0 0 0",
  },
  loginLinkBtn: {
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

const AddCustomers = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Data Submitted:", user);
    // Add your API registration call logic here
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Registration Here!</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <FaUsers style={styles.icon} />
            <input 
              style={styles.input}
              type="text" 
              placeholder='Enter name here'  
              name="name" 
              value={user.name}
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
              placeholder='Enter email here'  
              name="email" 
              value={user.email}
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
              placeholder='Enter phone here'  
              name="contact" 
              value={user.contact}
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
              placeholder='Enter city here'  
              name="city" 
              value={user.city}
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
              placeholder='Enter password here'  
              name="password" 
              value={user.password}
              onChange={handleChange} 
              required
            />
          </div>

          {/* Button Section */}
          <div style={styles.btnContainer}>
            <button type="submit" style={styles.registerBtn}>
              Register
            </button>
          </div>

          <p style={styles.loginText}>
            Already Registered?{" "}
            <button 
              type="button" 
              style={styles.loginLinkBtn} 
              onClick={() => navigate("/")}
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddCustomers;