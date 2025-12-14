import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>All Orders (Admin)</h2>

      {orders.map(o => (
        <div key={o._id}>
          {o.user.email} | {o.sweet.name} | Qty: {o.quantity} | ₹{o.price}
        </div>
      ))}
    </div>
  );
}
