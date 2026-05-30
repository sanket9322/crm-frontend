import axios from "axios";
import { useState } from "react";
import { FaPhone, FaUsers } from "react-icons/fa";
import { MdEmail, MdLocationCity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

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
    backgroundColor: "#28a745", // Vibrant Green for Action/Save
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

const CreateLead = () => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    status: "Open" // Set initial default string matching your dropdown option
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ FIX 2: Send JWT token in Authorization header
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/leads", lead, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      alert("Lead added successfully");
      setLead({ name: "", email: "", contact: "", city: "", status: "Open" });
      navigate("/alllead");
    } catch (err) {
      alert("Error adding lead");
      console.error(err);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Lead Here!</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <FaUsers style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="Enter name here"
              name="name"
              value={lead.name}
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
              placeholder="Enter email here"
              name="email"
              value={lead.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Field */}
          <div style={styles.inputGroup}>
            <FaPhone style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="Enter phone here"
              name="contact"
              value={lead.contact}
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
              placeholder="Enter city here"
              name="city"
              value={lead.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status Field Dropdown */}
          <select 
            style={styles.select} 
            name="status" 
            value={lead.status} 
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="New">New</option>
            <option value="Demo">Demo</option>
            <option value="Closed">Closed</option>
            <option value="FollowUp">FollowUp</option>
          </select>

          {/* Save Button */}
          <button type="submit" style={styles.submitBtn}>
            Save Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;