import { useNavigate } from 'react-router-dom';
import { isAdmin, logout } from '../utils/auth';

export default function Menu() {
  const nav = useNavigate();

  return (
    <>
      <h2>Menu</h2>
      <button onClick={() => nav('/sweets')}>Buy Sweets</button>
      <button onClick={() => nav('/orders')}>My Orders</button>
      {isAdmin() && <button onClick={() => nav('/admin')}>Admin Panel</button>}
      <button onClick={logout}>Logout</button>
    </>
  );
}
