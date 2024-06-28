import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  async function register(ev) {
    ev.preventDefault();
    setLoading(true);
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      setUsername('');
      setEmail('');
      setPassword('');
      alert('registration successful');
    } else {
      setLoading(false);
      alert('registration failed');
    }
  }
  return (
    <>
    {loading && (
      <div className="preloader">
        <CircularProgress />
      </div>
    )}
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
        placeholder="Username"
        value={username}
        onChange={ev => setUsername(ev.target.value)} />
      <input type="text"
        placeholder="Email"
        value={email}
        onChange={ev => setEmail(ev.target.value)} />
      <input type="password"
        placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
      <button className="log-bton">Register</button>
    </form>
    </>
  );
}