import { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const res = await api.get('/orders/my');
    setOrders(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id}>
          {o.sweet.name} - ₹{o.price} - {o.status}
        </div>
      ))}
    </>
  );
}
