import { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map(o => (
        <div key={o._id}>
          {o.sweet.name} | Qty: {o.quantity} | ₹{o.price}
        </div>
      ))}
    </div>
  );
}
