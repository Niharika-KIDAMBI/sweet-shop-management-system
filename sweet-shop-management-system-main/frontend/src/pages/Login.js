import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '320px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#ff8c42',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  link: {
    marginTop: '15px',
    color: '#ff8c42',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    nav('/menu');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={submit} style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>Login</button>

        <p style={styles.link} onClick={() => nav('/register')}>
          Don’t have an account? Register
        </p>
      </form>
    </div>
  );
}
