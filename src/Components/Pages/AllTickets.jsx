import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  const loadTickets = () => {
    fetch("http://localhost:8080/api/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const deleteTicket = async (id) => {
    await fetch(`http://localhost:8080/api/tickets/${id}`, {
      method: "DELETE"
    });
    alert("Ticket deleted!");
    loadTickets();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Tickets</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, index) => (
            <tr 
              key={t.id} 
              style={{
                ...styles.tr,
                // Simple alternating row colors for better readability
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9" 
              }}
            >
              <td style={styles.td}>{t.id}</td>
              <td style={styles.td}><strong>{t.title}</strong></td>
              <td style={styles.td}>{t.body}</td>
              <td style={styles.td}>{t.contact}</td>
              <td style={styles.td}>{t.email}</td>
              <td style={styles.td}>
                <div style={styles.actionGroup}>
                  <Link to={`/update-ticket/${t.id}`} style={{ textDecoration: "none" }}>
                    <button style={{ ...styles.button, ...styles.updateBtn }}>Update</button>
                  </Link>
                  <button 
                    onClick={() => deleteTicket(t.id)} 
                    style={{ ...styles.button, ...styles.deleteBtn }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Clean and organized inline styles object
const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  thRow: {
    backgroundColor: "#4A90E2",
  },
  th: {
    color: "#ffffff",
    textAlign: "left",
    padding: "14px 16px",
    fontWeight: "600",
    fontSize: "14px",
  },
  tr: {
    borderBottom: "1px solid #eeeeee",
    transition: "background-color 0.2s ease",
  },
  td: {
    padding: "14px 16px",
    color: "#555",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  actionGroup: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "opacity 0.2s",
  },
  updateBtn: {
    backgroundColor: "#2ECC71",
    color: "white",
  },
  deleteBtn: {
    backgroundColor: "#E74C3C",
    color: "white",
  }
};

export default AllTickets;