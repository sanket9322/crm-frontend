import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    body: "",
    contact: "",
    email: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data));
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket)
    });

    alert("Ticket updated successfully!");
    navigate("/tickets");
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>Update Ticket</h2>
        
        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Ticket Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter ticket title"
              value={ticket.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description / Body</label>
            <textarea
              name="body"
              placeholder="Describe the issue"
              value={ticket.body}
              onChange={handleChange}
              required
              style={{ ...styles.input, ...styles.textarea }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Name</label>
            <input
              type="text"
              name="contact"
              placeholder="Contact person"
              value={ticket.contact}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Contact email"
              value={ticket.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate("/tickets")} 
              style={{ ...styles.btn, ...styles.cancelBtn }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ ...styles.btn, ...styles.submitBtn }}
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Extracted styles object for consistency and clean code
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
  },
  formCard: {
    width: "100%",
    maxWidth: "550px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    margin: "0 0 24px 0",
    color: "#333333",
    fontSize: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Provides uniform vertical layout spacing
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555555",
  },
  input: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#fafafa",
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  btn: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#2ECC71", // Green accent for updates
    color: "#ffffff",
  },
  cancelBtn: {
    backgroundColor: "#e0e0e0",
    color: "#333333",
  }
};

export default UpdateTickets;