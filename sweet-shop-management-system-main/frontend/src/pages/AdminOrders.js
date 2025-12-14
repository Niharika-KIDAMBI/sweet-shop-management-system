import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [qtyMap, setQtyMap] = useState({});

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const load = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addSweet = async () => {
    if (!name || !price || !quantity) {
      alert('Fill all required fields');
      return;
    }

    try {
      await api.post('/sweets', {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity)
      });

      alert('Sweet added');
      setName('');
      setCategory('');
      setPrice('');
      setQuantity('');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Add sweet failed');
    }
  };

  const restock = async (id) => {
    try {
      const qty = Number(qtyMap[id]);

      if (!qty || qty <= 0) {
        alert('Enter valid quantity');
        return;
      }

      await api.put(`/sweets/${id}/restock`, {
        quantity: qty
      });

      alert('Stock updated');
      setQtyMap({ ...qtyMap, [id]: '' });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Restock failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '30px',
      background: 'linear-gradient(135deg, #ffe4ec, #f3d9ff)',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h2 style={{ color: '#c2185b', marginBottom: '20px' }}>
        Admin Stock Management
      </h2>

      {/* ADD NEW SWEET CARD */}
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '16px',
        width: '360px',
        boxShadow: '0 12px 30px rgba(194, 24, 91, 0.15)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#ad1457', marginBottom: '14px' }}>
          Add New Sweet
        </h3>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={inputStyle}
        />

        <button style={primaryBtn} onClick={addSweet}>
          + Add Sweet
        </button>
      </div>

      {/* EXISTING SWEETS */}
      <h3 style={{ color: '#6a1b9a', marginBottom: '14px' }}>
        Existing Sweets
      </h3>

      {sweets.map(s => (
        <div key={s._id} style={{
          background: '#fff',
          padding: '14px',
          borderRadius: '14px',
          marginBottom: '12px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ fontSize: '14px' }}>
            <b>{s.name}</b><br />
            ₹{s.price} • Stock {s.quantity}
          </div>

          <div>
            <input
              type="number"
              placeholder="+Qty"
              value={qtyMap[s._id] || ''}
              onChange={(e) =>
                setQtyMap({ ...qtyMap, [s._id]: e.target.value })
              }
              style={{
                width: '60px',
                padding: '6px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '6px'
              }}
            />
            <button
              onClick={() => restock(s._id)}
              style={{
                ...primaryBtn,
                padding: '6px',
                fontSize: '12px'
              }}
            >
              Restock
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* styles */
const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #f0c1d4',
  marginBottom: '10px',
  fontSize: '14px'
};

const primaryBtn = {
  width: '100%',
  padding: '10px',
  borderRadius: '10px',
  border: 'none',
  background: 'linear-gradient(135deg, #ec407a, #ba68c8)',
  color: '#fff',
  fontWeight: '600',
  cursor: 'pointer'
};
