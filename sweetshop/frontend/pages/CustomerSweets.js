import { useEffect, useState } from 'react';
import api from '../api';

export default function CustomerSweets() {
  const [sweets, setSweets] = useState([]);

  const load = async () => {
    const res = await api.get('/sweets');
    setSweets(res.data);
  };

  useEffect(() => { load(); }, []);

  const buy = async (id) => {
    await api.post(`/sweets/${id}/purchase`);
    load();
  };

  return (
    <>
      <h2>Sweets</h2>
      {sweets.map(s => (
        <div key={s._id}>
          {s.name} ({s.quantity})
          <button onClick={() => buy(s._id)}>Buy</button>
        </div>
      ))}
    </>
  );
}
