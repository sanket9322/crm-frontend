import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllLead from "../DashboardP/AllLead";
import AllFeedback from "../Pages/AllFeedback";
import AllTickets from "../Pages/AllTickets";
import CustomerList from "../Pages/CustomerList";

// --- Inline Style Objects ---
const styles = {
  dashboardWrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7f6",
    margin: 0,
    overflow: "hidden", // Keeps scrolling inside the main content area
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1a252f", // Deep dark blue for Admin accent
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
    backgroundColor: "#e74c3c", // Destructive red color
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background-color 0.2s ease",
  },
  mainContent: {
    flex: 1,
    padding: "40px",
    overflowY: "auto",
  },
};

// Helper function to handle active admin menu states dynamically
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

const AdminDashboard = () => {
  // Fixed: default value changed from "AboutUs" to "CustomerList" so a page loads initially
  const [page, setPage] = useState("CustomerList");
  const navigate = useNavigate();

  const renderPage = () => {
    switch (page) {
      case "CustomerList":
        return <CustomerList />;
      case "AllLead":
        return <AllLead />;
      case "AllTickets":
        return <AllTickets />;
      case "AllFeedback":
        return <AllFeedback />;
      default:
        return <p style={{ padding: "20px", color: "#e74c3c" }}>No Page Found</p>;
    }
  };

  return (
    <div style={styles.dashboardWrapper}>
      
      {/* Sidebar Section */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Admin Panel</div>

        <div style={styles.navContainer}>
          <p 
            style={getMenuItemStyle(page, "CustomerList")} 
            onClick={() => setPage("CustomerList")}
          >
            Customer List
          </p>
          <p 
            style={getMenuItemStyle(page, "AllLead")} 
            onClick={() => setPage("AllLead")}
          >
            All Leads
          </p>
          <p 
            style={getMenuItemStyle(page, "AllTickets")} 
            onClick={() => setPage("AllTickets")}
          >
            All Tickets
          </p>
          <p 
            style={getMenuItemStyle(page, "AllFeedback")} 
            onClick={() => setPage("AllFeedback")}
          >
            All Feedback
          </p>
        </div>

        {/* Exit Button Container */}
        <div style={styles.exitContainer}>
          <button style={styles.exitButton} onClick={() => navigate("/")}>
            Exit Panel
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        {renderPage()}
      </div>
      
    </div>
  );
};

export default AdminDashboard;