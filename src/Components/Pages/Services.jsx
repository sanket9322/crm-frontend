const Services = () => {
  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Our CRM Services</h2>
        <p style={styles.subheading}>
          We provide powerful and easy-to-use Customer Relationship Management (CRM) services 
          designed to help businesses manage customers, streamline operations, and grow faster.
        </p>
      </div>

      {/* Grouped into a single, well-styled Description List */}
      <dl style={styles.listContainer}>
        <div style={styles.serviceItem}>
          <dt style={styles.term}>Lead Management</dt>
          <dd style={styles.description}>
            Capture, track, and manage leads from multiple sources in one centralized system. 
            Assign leads to sales teams and monitor the complete customer journey.
          </dd>
        </div>

        <div style={styles.serviceItem}>
          <dt style={styles.term}>Customer Management</dt>
          <dd style={styles.description}>
            Store and organize complete customer information, communication history, and activity logs 
            to build strong relationships and improve customer retention.
          </dd>
        </div>

        <div style={styles.serviceItem}>
          <dt style={styles.term}>Support & Ticketing System</dt>
          <dd style={styles.description}>
            Easily manage customer complaints, queries, and technical issues through a structured 
            ticketing system with priority and status tracking.
          </dd>
        </div>

        <div style={styles.serviceItem}>
          <dt style={styles.term}>Email & SMS Integration</dt>
          <dd style={styles.description}>
            Send personalized emails and SMS messages directly from the CRM to engage customers 
            and improve communication.
          </dd>
        </div>
      </dl>
    </div>
  );
};

// Extracted styles object for a clean layout
const styles = {
  container: {
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerSection: {
    textAlign: "center",
    maxWidth: "700px",
    marginBottom: "40px",
  },
  heading: {
    color: "#2C3E50",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  subheading: {
    color: "#7F8C8D",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: 0,
  },
  listContainer: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Removes the need for <br /> tags entirely
    margin: 0,
    padding: 0,
  },
  serviceItem: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    borderLeft: "5px solid #4A90E2", // Blue accent bar on the side
    margin: 0,
  },
  term: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#555555",
    lineHeight: "1.6",
    margin: 0, // Reset default browser margin for <dd>
  },
};

export default Services;