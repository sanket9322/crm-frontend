import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5f6368",
    marginBottom: "6px",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    color: "#333333",
    backgroundColor: "#ffffff",
  },
  select: {
    width: "100%",
    padding: "12px 15px",
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    fontSize: "16px",
    color: "#333333",
    outline: "none",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#e67e22", // Warm amber/orange for edit/modifier actions
    color: "white",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
  },
};

function UpdateLead() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    contact: "",
    status: ""
  });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`http://localhost:8080/api/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setLead({
          name: res.data.name || "",
          email: res.data.email || "",
          contact: res.data.contact || "",
          status: res.data.status || ""
        });

      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (id) fetchLead();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8080/api/leads/${id}`, lead, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Lead updated successfully");
      navigate("/leads");

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update lead");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Modify Lead Details</h2>
        
        <form onSubmit={handleUpdate}>
          {/* Name Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              style={styles.input}
              name="name" 
              value={lead.name} 
              onChange={handleChange} 
              required
            />
          </div>

          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              style={styles.input}
              type="email"
              name="email" 
              value={lead.email} 
              onChange={handleChange} 
              required
            />
          </div>

          {/* Contact Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Contact Phone</label>
            <input 
              style={styles.input}
              name="contact" 
              value={lead.contact} 
              onChange={handleChange} 
              required
            />
          </div>

          {/* Status Dropdown Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Lead Status</label>
            <select 
              style={styles.select}
              name="status" 
              value={lead.status} 
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select status</option>
              <option value="Open">Open</option>
              <option value="New">New</option>
              <option value="Demo">Demo</option>
              <option value="Closed">Closed</option>
              <option value="FollowUp">FollowUp</option>
            </select>
          </div>

          {/* Action Button */}
          <button type="submit" style={styles.submitBtn}>
            Update Lead
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateLead;