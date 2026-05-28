import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../service/api"; // Assuming these exist in your api.js

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    contact: "",
    city: ""
  });

  useEffect(() => {
    // Fetching current customer details to pre-populate the form
    getCustomerById(id)
      .then(res => setCustomer(res.data))
      .catch(err => console.error("Error fetching customer data:", err));
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateCustomer(id, customer);
      alert("Customer updated successfully!");
      navigate("/customers"); // Adjust this route path to match your layout
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Failed to update customer!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.heading}>Update Customer</h2>

        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Customer Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={customer.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={customer.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter contact number"
              value={customer.contact}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>City</label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={customer.city}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={() => navigate("/customers")} 
              style={{ ...styles.btn, ...styles.cancelBtn }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{ ...styles.btn, ...styles.submitBtn }}
            >
              Update Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Centralized styles object matching your CRM dashboard look
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
    gap: "20px",
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
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "10px",
  },
  btn: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitBtn: {
    backgroundColor: "#2ECC71", // Clean green theme for successful actions
    color: "#ffffff",
  },
  cancelBtn: {
    backgroundColor: "#e0e0e0",
    color: "#333333",
  }
};

export default UpdateCustomer;