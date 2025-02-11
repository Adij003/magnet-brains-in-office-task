import React from 'react';

function SuccessPage() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Payment Successful!</h2>
      <p style={styles.text}>Thank you for your purchase.</p>
      <p style={styles.text}>Your order has been placed successfully.</p>
      <a href="/" style={styles.button}>Go to Home</a>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    color: '#28a745',
    marginBottom: '10px',
  },
  text: {
    fontSize: '18px',
    color: '#555',
  },
  button: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

export default SuccessPage;
