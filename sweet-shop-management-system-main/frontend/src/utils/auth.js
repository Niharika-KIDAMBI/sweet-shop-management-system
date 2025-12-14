export const getToken = () => localStorage.getItem('token');

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1])).role;
  } catch {
    return null;
  }
};

export const isAdmin = () => getRole() === 'ADMIN';

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
