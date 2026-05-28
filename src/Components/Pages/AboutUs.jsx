// --- Inline Style Objects ---
const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2c3e50", // Slate blue corporate primary
    marginBottom: "20px",
    position: "relative",
    paddingBottom: "10px",
    borderBottom: "3px solid #007bff", // Accent underline
    display: "inline-block",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#555555",
    marginBottom: "20px",
  },
  missionBox: {
    backgroundColor: "#f8f9fa",
    borderLeft: "4px solid #28a745", // Green success indicator accent line
    padding: "20px",
    borderRadius: "0 8px 8px 0",
    marginTop: "30px",
  },
  missionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e7e34",
    margin: "0 0 10px 0",
  },
  missionText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#495057",
    margin: 0,
    fontStyle: "italic",
  },
};

const AboutUs = () => {
  return (
    <div style={styles.wrapper}>
      {/* Title Heading */}
      <h2 style={styles.title}>About Us</h2>
      
      {/* Introduction Paragraph */}
      <p style={styles.paragraph}>
        At CRM System, we help businesses build stronger relationships with their customers through 
        smart, data-driven solutions. Our platform is designed to simplify customer management, 
        improve sales productivity, and deliver better customer experiences — all from one powerful 
        dashboard.
      </p>
      
      {/* Secondary Dynamic Workflows Paragraph */}
      <p style={styles.paragraph}>
        We understand that every business is unique. That’s why our CRM is built to be flexible, 
        scalable, and easy to use. Whether you’re a startup, growing business, or an enterprise, 
        our system adapts to your workflow and helps your teams collaborate more efficiently.
      </p>

      {/* Mission Core Highlight Box */}
      <div style={styles.missionBox}>
        <h3 style={styles.missionTitle}>Our Mission</h3>
        <p style={styles.missionText}>
          Our mission is to make customer relationship management simple, effective, and accessible 
          for every organization. We believe in combining modern technology with practical business 
          logic to help companies turn leads into loyal customers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;