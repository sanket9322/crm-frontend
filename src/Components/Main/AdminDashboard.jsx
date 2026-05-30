import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import EmailComposer from "../DashboardP/EmailComposer";
import AllFeedback from "../Pages/AllFeedback";
import AllTickets from "../Pages/AllTickets";
import CustomerList from "../Pages/CustomerList";
import AllLead from "../DashboardP/AllLead";

const styles = {
  dashboardWrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7f6",
    margin: 0,
    overflow: "hidden",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1a252f",
    color: "#ecf0f1",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 10px rgba(0,0,0,0.15)",
    zIndex: 10,
  },
  sidebarHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #2c3e50",
    color: "#ffffff",
    letterSpacing: "1px",
  },
  navContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  exitContainer: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid #2c3e50",
  },
  exitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
  // Count Cards
  cardsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  card: {
    flex: "1",
    minWidth: "150px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  cardNumber: {
    fontSize: "40px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  cardLabel: {
    fontSize: "14px",
    color: "#777",
    margin: 0,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  chartsRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  chartBox: {
    flex: "1",
    minWidth: "300px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  chartTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #f1f3f5",
  },
};

const getMenuItemStyle = (currentPage, targetPage) => {
  const isActive = currentPage === targetPage;
  return {
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: isActive ? "#34495e" : "transparent",
    color: isActive ? "#ffffff" : "#b4bcc2",
    fontWeight: isActive ? "bold" : "normal",
    transition: "all 0.2s ease",
    margin: 0,
  };
};

// Pie chart colors
const PIE_COLORS = ["#4A90E2", "#27ae60", "#f39c12", "#e74c3c", "#9b59b6"];

// Dashboard Overview Component
const DashboardOverview = () => {
  const [counts, setCounts] = useState({ customers: 0, leads: 0, tickets: 0, feedbacks: 0 });
  const [leadStats, setLeadStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("http://localhost:8080/api/users", { headers }).then(r => r.json()),
      fetch("http://localhost:8080/api/leads", { headers }).then(r => r.json()),
      fetch("http://localhost:8080/api/tickets", { headers }).then(r => r.json()),
      fetch("http://localhost:8080/api/feedbacks", { headers }).then(r => r.json()),
    ]).then(([customers, leads, tickets, feedbacks]) => {
      setCounts({
        customers: customers.length,
        leads: leads.length,
        tickets: tickets.length,
        feedbacks: feedbacks.length,
      });

      // Lead status wise count
      const statusMap = {};
      leads.forEach(l => {
        const s = l.status || "Unknown";
        statusMap[s] = (statusMap[s] || 0) + 1;
      });
      const statsArr = Object.entries(statusMap).map(([name, value]) => ({ name, value }));
      setLeadStats(statsArr);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "#777", padding: "20px" }}>Loading dashboard...</p>;

  const cardData = [
    { label: "Customers", value: counts.customers, color: "#4A90E2" },
    { label: "Leads",     value: counts.leads,     color: "#27ae60" },
    { label: "Tickets",   value: counts.tickets,   color: "#f39c12" },
    { label: "Feedback",  value: counts.feedbacks, color: "#9b59b6" },
  ];

  return (
    <div>
      <h2 style={{ color: "#2c3e50", marginBottom: "25px", fontSize: "22px" }}>
        📊 Dashboard Overview
      </h2>

      {/* Count Cards */}
      <div style={styles.cardsRow}>
        {cardData.map(c => (
          <div key={c.label} style={styles.card}>
            <p style={{ ...styles.cardNumber, color: c.color }}>{c.value}</p>
            <p style={styles.cardLabel}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={styles.chartsRow}>

        {/* Bar Chart */}
        <div style={styles.chartBox}>
          <p style={styles.chartTitle}>📈 Leads Status — Bar Chart</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leadStats}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Leads" fill="#4A90E2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={styles.chartBox}>
          <p style={styles.chartTitle}>🥧 Leads Status — Pie Chart</p>
          {leadStats.length === 0 ? (
            <p style={{ color: "#aaa", textAlign: "center", paddingTop: "80px" }}>No leads data</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={leadStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {leadStats.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [page, setPage] = useState("Dashboard");
  const navigate = useNavigate();

  const renderPage = () => {
    switch (page) {
      case "Dashboard":      return <DashboardOverview />;
      case "CustomerList":   return <CustomerList />;
      case "AllLead":        return <AllLead />;
      case "AllTickets":     return <AllTickets />;
      case "AllFeedback":    return <AllFeedback />;
      case "EmailComposer":  return <EmailComposer />;
      default: return <p style={{ padding: "20px", color: "#e74c3c" }}>No Page Found</p>;
    }
  };

  return (
    <div style={styles.dashboardWrapper}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Admin Panel</div>

        <div style={styles.navContainer}>
          <p style={getMenuItemStyle(page, "Dashboard")}    onClick={() => setPage("Dashboard")}>🏠 Dashboard</p>
          <p style={getMenuItemStyle(page, "CustomerList")} onClick={() => setPage("CustomerList")}>Customer List</p>
          <p style={getMenuItemStyle(page, "AllLead")}      onClick={() => setPage("AllLead")}>All Leads</p>
          <p style={getMenuItemStyle(page, "AllTickets")}   onClick={() => setPage("AllTickets")}>All Tickets</p>
          <p style={getMenuItemStyle(page, "AllFeedback")}  onClick={() => setPage("AllFeedback")}>All Feedback</p>
          <p style={getMenuItemStyle(page, "EmailComposer")} onClick={() => setPage("EmailComposer")}>📧 Email Composer</p>
        </div>

        <div style={styles.exitContainer}>
          <button
            style={styles.exitButton}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
          >
            Exit Panel
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboard;
