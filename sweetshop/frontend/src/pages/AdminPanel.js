import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminPanel() {
  const [sweets, setSweets] = useState([]);
  const [qtyMap, setQtyMap] = useState({});

  // New sweet form
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

  /* ADD NEW SWEET */
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

  /* RESTOCK */
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
    <div style={{ padding: '20px' }}>
      <h2>Admin Stock Management</h2>

      {/* ADD NEW SWEET */}
      <h3>Add New Sweet</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={addSweet}>Add Sweet</button>

      <hr />

      {/* RESTOCK EXISTING */}
      <h3>Existing Sweets</h3>

      {sweets.map(s => (
        <div key={s._id}>
          <b>{s.name}</b> | ₹{s.price} | Stock: {s.quantity}
          <input
            type="number"
            placeholder="Add qty"
            value={qtyMap[s._id] || ''}
            onChange={(e) =>
              setQtyMap({ ...qtyMap, [s._id]: e.target.value })
            }
          />
          <button onClick={() => restock(s._id)}>Restock</button>
        </div>
      ))}
    </div>
  );
}
