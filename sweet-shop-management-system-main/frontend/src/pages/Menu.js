import { useNavigate } from 'react-router-dom';
import { isAdmin, logout } from '../utils/auth';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffe6f0, #fff5f9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  },
  title: {
    marginBottom: '20px',
    color: '#d63384',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#ff85b3',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  adminButton: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#c77dff',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  logout: {
    width: '100%',
    padding: '10px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#ffccd5',
    color: '#8b1e3f',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default function Menu() {
  const nav = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍬 Sweet Menu</h2>

        <button style={styles.button} onClick={() => nav('/sweets')}>
          Buy Sweets
        </button>

        <button style={styles.button} onClick={() => nav('/orders')}>
          My Orders
        </button>

        {isAdmin() && (
          <button style={styles.adminButton} onClick={() => nav('/admin')}>
            Admin Panel
          </button>
        )}

        <button style={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
