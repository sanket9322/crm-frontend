import axios from "axios";
import { useEffect, useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from "react-router-dom";
import AllLead from '../DashboardP/AllLead';
import DemoLead from '../DashboardP/Demolead';
import NewLead from '../DashboardP/NewLead';
import OpenLead from '../DashboardP/OpenLead';
import TodaysFollowup from '../DashboardP/TodaysFollowup';

// --- Inline Style Objects ---
const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa", // Light clean background
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    padding: "30px",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    paddingBottom: "15px",
    borderBottom: "1px solid #e9ecef",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#333333",
    margin: 0,
  },
  addBtn: {
    backgroundColor: "#007bff", // Professional vibrant blue
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0, 123, 255, 0.2)",
  },
  tabWrapper: {
    paddingTop: "20px", // Spacing below the tab navigation links
  },
};

const UserDashboard = () => {
  const [leads, setLeads] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/leads");
        setLeads(res.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  // Filtering leads based on status
  const openLeads = leads.filter(lead => lead.status === "Open");
  const newLeads = leads.filter(lead => lead.status === "New");
  const demoLeads = leads.filter(lead => lead.status === "Demo");
  const todaysFollowupLeads = leads.filter(
    lead => lead.status.toLowerCase() === "followup"
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* Top Header Row */}
        <div style={styles.headerSection}>
          <h2 style={styles.title}>User Dashboard</h2>
          <button style={styles.addBtn} onClick={() => Navigate("/createlead")}>
            + Add Lead
          </button>
        </div>

        {/* Bootstrap Tabs with minor inline structure styling */}
        <Tabs
          defaultActiveKey="allLead"
          id="dashboard-tab"
          className="mb-3" // Using built-in bootstrap margin class for line spacing
        >
          <Tab eventKey="allLead" title="All Lead">
            <div style={styles.tabWrapper}>
              <AllLead leads={leads} />
            </div>
          </Tab>

          <Tab eventKey="open" title="Open">
            <div style={styles.tabWrapper}>
              <OpenLead leads={openLeads} />
            </div>
          </Tab>

          <Tab eventKey="new" title="New Lead">
            <div style={styles.tabWrapper}>
              <NewLead leads={newLeads} />
            </div>
          </Tab>

          <Tab eventKey="demo" title="Demo">
            <div style={styles.tabWrapper}>
              <DemoLead leads={demoLeads} />
            </div>
          </Tab>

          <Tab eventKey="Followup" title="Today's Followup">
            <div style={styles.tabWrapper}>
              <TodaysFollowup leads={todaysFollowupLeads} />
            </div>
          </Tab>
        </Tabs>
        
      </div>
    </div>
  );
};

export default UserDashboard;