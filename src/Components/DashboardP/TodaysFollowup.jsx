import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Inline Style Objects ---
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #f1f3f5",
    paddingBottom: "15px",
  },
  title: {
    fontSize: "22px",
    color: "#2c3e50",
    margin: 0,
    fontWeight: "600",
  },
  count: {
    backgroundColor: "#fef7e0",
    color: "#b06000",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "15px",
  },
  th: {
    backgroundColor: "#f8f9fa",
    color: "#5f6368",
    padding: "14px 16px",
    fontWeight: "600",
    borderBottom: "2px solid #dee2e6",
  },
  td: {
    padding: "14px 16px",
    borderBottom: "1px solid #e8eaed",
    color: "#3c4043",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
    backgroundColor: "#fef7e0", // Warm amber accent for follow-ups
    color: "#b06000",
  },
  emailBtn: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    padding: "6px 14px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#80868b",
    fontSize: "16px",
  },
};

const TodaysFollowup = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/leads");
      const filtered = res.data.filter(lead => lead.status.toLowerCase() === "followup");
      setLeads(filtered);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Header section */}
      <div style={styles.header}>
        <h2 style={styles.title}>Today's Follow-up Leads</h2>
        <span style={styles.count}>{leads.length} PENDING</span>
      </div>

      {/* Table section */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                {/* Fixed colSpan to 6 to properly cover all columns */}
                <td colSpan="6" style={styles.td}>
                  <div style={styles.emptyState}>No follow-up leads found for today</div>
                </td>
              </tr>
            ) : (
              leads.map(l => (
                <tr key={l.id}>
                  <td style={styles.td}>{l.name}</td>
                  <td style={styles.td}>{l.email}</td>
                  <td style={styles.td}>{l.contact}</td>
                  <td style={styles.td}>{l.city}</td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{l.status}</span>
                  </td>
                  <td style={styles.td}>
                    <button 
                      type='button' 
                      style={styles.emailBtn} 
                      onClick={() => navigate("/email")}
                    >
                      Send Email
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaysFollowup;