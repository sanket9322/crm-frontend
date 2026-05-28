import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "../Pages/AboutUs";
import AddTickets from "../Pages/AddTickets";
import AllTickets from "../Pages/AllTickets";
import Feedback from "../Pages/Feedback";
import Services from "../Pages/Services";
import Support from "../Pages/Support";

// --- Inline Style Objects ---
const styles = {
  dashboardWrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7f6",
    margin: 0,
    overflow: "hidden", // Prevents full-page scroll, keeps scroll in main area
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#2c3e50", // Dark slate blue
    color: "#ecf0f1",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    zIndex: 10,
  },
  sidebarHeader: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "15px",
    borderBottom: "1px solid #34495e",
    color: "#ffffff",
  },
  navContainer: {
    flex: 1, // Allows this section to grow, pushing the exit button down
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  exitContainer: {
    marginTop: "auto",
    paddingTop: "20px",
    borderTop: "1px solid #34495e",
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
  },
  mainContent: {
    flex: 1,
    padding: "40px",
    overflowY: "auto", // Allows scrolling if inner content is tall
  },
};

// Helper function to handle active menu states dynamically
const getMenuItemStyle = (currentPage, targetPage) => {
  const isActive = currentPage === targetPage;
  return {
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: isActive ? "#34495e" : "transparent",
    color: isActive ? "#ffffff" : "#bdc3c7",
    fontWeight: isActive ? "bold" : "normal",
    transition: "background-color 0.2s ease, color 0.2s ease",
    margin: 0,
  };
};

const CustomerDashboard = () => {
  const [page, setPage] = useState("AboutUs");
  const navigate = useNavigate();

  const renderPage = () => {
    switch (page) {
      case "AboutUs":
        return <AboutUs />;
      case "services":
        return <Services />;
      case "addtickets":
        return <AddTickets />;
      case "alltickets":
        return <AllTickets />;
      case "feedback":
        return <Feedback />;
      case "support":
        return <Support />;
      default:
        return <p>No Page Found</p>;
    }
  };

  return (
    <div style={styles.dashboardWrapper}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Customer</div>

        <div style={styles.navContainer}>
          <p 
            style={getMenuItemStyle(page, "AboutUs")} 
            onClick={() => setPage("AboutUs")}
          >
            About Us
          </p>
          <p 
            style={getMenuItemStyle(page, "services")} 
            onClick={() => setPage("services")}
          >
            Services
          </p>
          <p 
            style={getMenuItemStyle(page, "addtickets")} 
            onClick={() => setPage("addtickets")}
          >
            Add Tickets
          </p>
          <p 
            style={getMenuItemStyle(page, "alltickets")} 
            onClick={() => setPage("alltickets")}
          >
            All Tickets
          </p>
          <p 
            style={getMenuItemStyle(page, "feedback")} 
            onClick={() => setPage("feedback")}
          >
            Feedback
          </p>
          <p 
            style={getMenuItemStyle(page, "support")} 
            onClick={() => setPage("support")}
          >
            Support
          </p>
        </div>

        {/* Exit Button at the bottom */}
        <div style={styles.exitContainer}>
          <button style={styles.exitButton} onClick={() => navigate("/")}>
            Exit Dashboard
          </button>
        </div>
      </div>

      {/* Right Section / Main Content */}
      <div style={styles.mainContent}>
        {renderPage()}
      </div>
      
    </div>
  );
};

export default CustomerDashboard;