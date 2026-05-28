import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAllCustomers } from '../service/api';

const CustomerList = () => {
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = () => {
    getAllCustomers()
      .then(res => setCustomer(res.data));
  };

  // const handledelete=(id)=>{
  //     deleteUserById(id) ;
  //     console.log("User deleted");
  //     fetchUsers();
  // }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Customer List</h2>
      
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>Id</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Contact</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((item, index) => (
            <tr 
              key={item.id}
              style={{
                ...styles.tr,
                // Alternating row background colors
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9"
              }}
            >
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}><strong>{item.name}</strong></td>
              <td style={styles.td}>{item.email}</td>
              <td style={styles.td}>{item.contact}</td>
              <td style={styles.td}>{item.city}</td>
              <td style={styles.td}>
                <button 
                  onClick={() => navigate(`/update/${item.id}`)}
                  style={styles.updateBtn}
                >
                  Update
                </button>
                {/* <button onClick={()=>handledelete(item.id)}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Extracted styles object to keep code elegant
const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  thRow: {
    backgroundColor: "#4A90E2", // Professional blue header
  },
  th: {
    color: "#ffffff",
    textAlign: "left",
    padding: "14px 16px",
    fontWeight: "600",
    fontSize: "14px",
  },
  tr: {
    borderBottom: "1px solid #eeeeee",
  },
  td: {
    padding: "14px 16px",
    color: "#555",
    fontSize: "14px",
    verticalAlign: "middle",
  },
  updateBtn: {
    padding: "8px 14px",
    backgroundColor: "#2ECC71", // Balanced green theme
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  }
};

export default CustomerList;