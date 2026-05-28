const Support = () => {
  return (
    <div style={styles.container}>
      <div style={styles.headerSection}>
        <h2 style={styles.heading}>Support Center</h2>
        <p style={styles.subheading}>
          Need help? Our team is here to assist you. Select one of the options below 
          or check our documentation to get started.
        </p>
      </div>

      <div style={styles.gridContainer}>
        {/* Card 1: Open a Ticket */}
        <div style={styles.card}>
          <div style={{ ...styles.icon, color: "#4A90E2" }}>🎫</div>
          <h3 style={styles.cardTitle}>Submit a Ticket</h3>
          <p style={styles.cardText}>
            Experiencing a technical issue? File a detailed ticket and our support squad will investigate.
          </p>
          <button style={{ ...styles.btn, backgroundColor: "#4A90E2" }}>Open Ticket</button>
        </div>

        {/* Card 2: Knowledge Base */}
        <div style={styles.card}>
          <div style={{ ...styles.icon, color: "#2ECC71" }}>📚</div>
          <h3 style={styles.cardTitle}>Knowledge Base</h3>
          <p style={styles.cardText}>
            Skip the queue! Browse through our curated documentation, tutorials, and FAQs.
          </p>
          <button style={{ ...styles.btn, backgroundColor: "#2ECC71" }}>View Docs</button>
        </div>

        {/* Card 3: Live Chat */}
        <div style={styles.card}>
          <div style={{ ...styles.icon, color: "#F39C12" }}>💬</div>
          <h3 style={styles.cardTitle}>Live Chat Support</h3>
          <p style={styles.cardText}>
            Connect instantly with a customer success specialist for urgent, real-time problems.
          </p>
          <button style={{ ...styles.btn, backgroundColor: "#F39C12" }}>Start Chat</button>
        </div>
      </div>
    </div>
  );
};

// Extracted style objects for the Support layout
const styles = {
  container: {
    padding: "60px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerSection: {
    textAlign: "center",
    maxWidth: "600px",
    marginBottom: "40px",
  },
  heading: {
    color: "#2C3E50",
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  subheading: {
    color: "#7F8C8D",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: 0,
  },
  gridContainer: {
    display: "flex",
    gap: "24px",
    width: "100%",
    maxWidth: "1000px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    flex: "1 1 300px",
    maxWidth: "320px",
    backgroundColor: "#ffffff",
    padding: "30px 24px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "20px",
    color: "#2C3E50",
    fontWeight: "600",
    margin: "0 0 12px 0",
  },
  cardText: {
    fontSize: "14px",
    color: "#7F8C8D",
    lineHeight: "1.5",
    margin: "0 0 24px 0",
  },
  btn: {
    width: "100%",
    padding: "12px",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.15s ease",
  },
};

export default Support;