import { useEffect, useState } from 'react';
import api from '../api';

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

      alert('Purchase successful');
      setQtyMap({ ...qtyMap, [id]: '' });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  return (
    <div>
      <h2>Shop Sweets</h2>

      {sweets.map(s => (
        <div key={s._id}>
          {s.name} | ₹{s.price} | Stock: {s.quantity}

          <input
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
            disabled={s.quantity === 0}
            onClick={() => buy(s._id)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
