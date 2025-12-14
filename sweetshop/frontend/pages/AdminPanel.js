import { useState } from 'react';
import api from '../api';

export default function AdminPanel() {
  const [name, setName] = useState('');

  const addSweet = async () => {
    await api.post('/sweets', {
      name,
      category: 'General',
      price: 10,
      quantity: 5
    });
    alert('Sweet added');
  };

  return (
    <>
      <h2>Admin Panel</h2>
      <input placeholder="Sweet name" onChange={e => setName(e.target.value)} />
      <button onClick={addSweet}>Add Sweet</button>
    </>
  );
}
