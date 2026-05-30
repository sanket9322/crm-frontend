import { useState } from "react";
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
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    padding: "35px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  },
  heading: {
    color: "#2c3e50",
    marginTop: "0",
    marginBottom: "25px",
    fontSize: "22px",
    fontWeight: "600",
    borderBottom: "2px solid #f1f3f5",
    paddingBottom: "12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5f6368",
  },
  input: {
    padding: "12px 15px",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none",
    color: "#333333",
    backgroundColor: "#ffffff",
  },
  textarea: {
    padding: "12px 15px",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none",
    color: "#333333",
    backgroundColor: "#ffffff",
    minHeight: "120px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  submitBtn: {
    backgroundColor: "#6f42c1", // Deep purple/indigo for support & ticketing modules
    color: "white",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s ease",
  },
};

const AddTickets = () => {
  const [ticket, setTicket] = useState({
    title: "",
    body: "",
    contact: "",
    email: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIX: Send JWT token in Authorization header
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(ticket)
      });

      alert("Ticket added successfully!");
      setTicket({ title: "", body: "", contact: "", email: "" });
      navigate("/tickets");
    } catch (error) {
      console.error("Error filing ticket:", error);
      alert("Failed to submit ticket.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Ticket</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Ticket Title */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Ticket Title</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              placeholder="e.g., Database connection timeout"
              value={ticket.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Issue Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              name="body"
              placeholder="Provide context about the issue here..."
              value={ticket.body}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Reference */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Contact Number</label>
            <input
              style={styles.input}
              type="text"
              name="contact"
              placeholder="Phone number"
              value={ticket.contact}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Reference */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Associated account email"
              value={ticket.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Action Button */}
          <button type="submit" style={styles.submitBtn}>
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTickets;