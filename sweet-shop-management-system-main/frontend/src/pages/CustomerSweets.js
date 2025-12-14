import { useEffect, useState } from 'react';
import api from '../api';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fff0f6, #fdf6ff)',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#d63384',
    marginBottom: '25px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
  },
  name: {
    fontWeight: 'bold',
    color: '#6a0572',
    marginBottom: '6px',
  },
  info: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  row: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    width: '70px',
    padding: '6px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#ff85b3',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  disabledButton: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#ffd6e8',
    color: '#999',
    fontWeight: 'bold',
    cursor: 'not-allowed',
  },
};

export default function CustomerSweets() {
  const [sweets, setSweets] = useState([]);
  const [qtyMap, setQtyMap] = useState({});

  const load = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const buy = async (id) => {
    try {
      const qty = Number(qtyMap[id] || 1);

      await api.post(`/sweets/${id}/purchase`, {
        quantity: qty
      });

      alert('Purchase successful 💖');
      setQtyMap({ ...qtyMap, [id]: '' });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🍭 Shop Sweets</h2>

      {sweets.map(s => (
        <div key={s._id} style={styles.card}>
          <div style={styles.name}>{s.name}</div>

          <div style={styles.info}>
            ₹{s.price} · Stock: {s.quantity}
          </div>

          <div style={styles.row}>
            <input
              style={styles.input}
              type="number"
              min="1"
              max={s.quantity}
              placeholder="Qty"
              value={qtyMap[s._id] || ''}
              onChange={(e) =>
                setQtyMap({ ...qtyMap, [s._id]: e.target.value })
              }
            />

            <button
              style={s.quantity === 0 ? styles.disabledButton : styles.button}
              disabled={s.quantity === 0}
              onClick={() => buy(s._id)}
            >
              {s.quantity === 0 ? 'Out of stock' : 'Buy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
