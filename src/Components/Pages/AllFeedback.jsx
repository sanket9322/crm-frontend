import { useEffect, useState } from "react";

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
    backgroundColor: "#e2f0d9",
    color: "#385723",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  tableContainer: { overflowX: "auto" },
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
    wordBreak: "break-word",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px 0",
    color: "#80868b",
    fontSize: "16px",
  },
};

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const loadFeedbacks = async () => {
    try {
      // ✅ FIX: Add JWT token to request
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/feedbacks", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error loading feedbacks", err);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>Customer Feedback Log</h2>
        <span style={styles.count}>{feedbacks.length} RESPONSES</span>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "60px" }}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="4" style={styles.td}>
                  <div style={styles.emptyState}>No customer feedback submitted yet.</div>
                </td>
              </tr>
            ) : (
              feedbacks.map((f) => (
                <tr key={f.id}>
                  <td style={{ ...styles.td, fontWeight: "bold", color: "#757575" }}>{f.id}</td>
                  <td style={styles.td}>{f.name}</td>
                  <td style={styles.td}>{f.email}</td>
                  <td style={styles.td}>{f.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllFeedback;
