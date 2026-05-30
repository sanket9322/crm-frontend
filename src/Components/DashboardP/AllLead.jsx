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
    backgroundColor: "#e8f0fe",
    color: "#1a73e8",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tableContainer: {
    overflowX: "auto",
    marginBottom: "25px",
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
  actionCell: {
    display: "flex",
    gap: "8px",
  },
  btnDelete: {
    backgroundColor: "#fce8e6",
    color: "#c5221f",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  btnUpdate: {
    backgroundColor: "#e8f0fe",
    color: "#1a73e8",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "500",
  },
  btnBack: {
    backgroundColor: "#757575",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "500",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#80868b",
    fontSize: "16px",
  },
};

const getStatusBadgeStyle = (status) => {
  const base = {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
    textTransform: "capitalize",
  };

  if (!status) return { ...base, backgroundColor: "#f1f3f5", color: "#5f6368" };

  switch (status.toLowerCase()) {
    case "new":
      return { ...base, backgroundColor: "#e8f0fe", color: "#1a73e8" };
    case "active":
      return { ...base, backgroundColor: "#e6f4ea", color: "#137333" };
    case "pending":
    case "followup":
      return { ...base, backgroundColor: "#fef7e0", color: "#b06000" };
    case "closed":
      return { ...base, backgroundColor: "#f1f3f5", color: "#5f6368" };
    default:
      return { ...base, backgroundColor: "#e8f0fe", color: "#1a73e8" };
  }
};

// ✅ FIX: authAxios replace — axios + JWT token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AllLead = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/leads", {
        headers: getAuthHeaders()
      });
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const deleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/leads/${id}`, {
        headers: getAuthHeaders()
      });
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lead List</h2>
        <span style={styles.count}>{leads.length} RECORDS</span>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.td}>
                  <div style={styles.emptyState}>No leads found</div>
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id}>
                  <td style={styles.td}>{l.name}</td>
                  <td style={styles.td}>{l.email}</td>
                  <td style={styles.td}>{l.contact}</td>
                  <td style={styles.td}>{l.city}</td>
                  <td style={styles.td}>
                    <span style={getStatusBadgeStyle(l.status)}>
                      {l.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionCell}>
                      <button style={styles.btnUpdate} onClick={() => navigate(`/updatelead/${l.id}`)}>
                        Update
                      </button>
                      <button style={styles.btnDelete} onClick={() => deleteLead(l.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div>
        <button style={styles.btnBack} onClick={() => navigate("/udashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AllLead;
