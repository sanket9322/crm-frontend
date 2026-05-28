import { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedback)
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      alert("Feedback submitted successfully!");
      setFeedback({ name: "", email: "", message: "" });

    } catch (err) {
      console.error(err);
      alert("Error submitting feedback!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>Add Feedback</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={feedback.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={feedback.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={feedback.message}
              onChange={handleChange}
              required
              style={{ ...styles.input, ...styles.textarea }}
            />
          </div>

          <button type="submit" style={styles.submitBtn}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

// Clean inline styles object for the form layout
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "20px",
  },
  formCard: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    margin: "0 0 24px 0",
    color: "#333333",
    fontSize: "24px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px", // Automatically spaces elements without needing <br /> tags
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#555555",
  },
  input: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    outline: "none",
    fontFamily: "inherit",
    backgroundColor: "#fafafa",
    transition: "border-color 0.2s",
  },
  textarea: {
    minHeight: "120px",
    resize: "vertical", // Allows users to scale height but wraps width nicely
  },
  submitBtn: {
    marginTop: "10px",
    padding: "14px",
    backgroundColor: "#4A90E2", // Professional blue to match your app theme
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  }
};

export default Feedback;