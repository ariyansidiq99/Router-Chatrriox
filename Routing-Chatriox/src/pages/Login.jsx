import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login, isAuth } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [email,    setEmail]    = useState('ariyan@chatriox.com');
  const [password, setPassword] = useState('password123');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  // If already logged in — redirect away from login
  if (isAuth) {
    const from = location.state?.from?.pathname || '/campaigns';
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || '/campaigns';
      navigate(from, { replace: true });
      // Redirects to where user was trying to go before login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='login-page container'>
      <div className='login-card'>
        <h1>Welcome back</h1>
        <p>Sign in to your Chatriox account</p>
        {error && <div className='alert alert--error'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label>Email</label>
            <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='field'>
            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type='submit' className='btn btn--primary' disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className='login-hint'>Use: ariyan@chatriox.com / password123</p>
      </div>
    </div>
  );
}
export default Login;
