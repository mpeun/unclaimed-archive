import { useState } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 's1esbarg.') {
      setIsLoggedIn(true);
    } else {
      alert('Falsches Passwort!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!isLoggedIn ? (
        <>
          <h1>Admin Login</h1>
          <input type="password" placeholder="Passwort" onChange={e => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <h1>Admin Panel</h1>
      )}
    </div>
  );
}
