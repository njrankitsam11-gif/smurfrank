'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      setLoading(false);
      return;
    }

    window.location.href = '/login';
  }

  return (
    <main style={{backgroundColor: '#050507', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      
      <div style={{width: '100%', maxWidth: '420px', padding: '0 24px'}}>
        
        <a href="/" style={{display: 'block', fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white', textAlign: 'center', marginBottom: '40px'}}>
          Smurf<span style={{color: '#FF6A00'}}>Rank</span>
        </a>

        <div style={{background: '#0f0f17', border: '1px solid #1a1a1a', padding: '40px'}}>
          <h1 style={{fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px', textAlign: 'center'}}>Create Account</h1>
          <p style={{color: '#666', fontSize: '13px', textAlign: 'center', marginBottom: '32px'}}>Join SmurfRank to buy and sell accounts</p>

          {error && (
            <div style={{background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', color: '#ff6b6b', padding: '12px', fontSize: '13px', marginBottom: '20px', textAlign: 'center'}}>
              {error}
            </div>
          )}

          <div style={{marginBottom: '16px'}}>
            <div style={{fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px'}}>Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{width: '100%', background: '#050507', border: '1px solid #1a1a1a', color: 'white', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
            />
          </div>

          <div style={{marginBottom: '16px'}}>
            <div style={{fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px'}}>Email</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{width: '100%', background: '#050507', border: '1px solid #1a1a1a', color: 'white', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
            />
          </div>

          <div style={{marginBottom: '24px'}}>
            <div style={{fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px'}}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              style={{width: '100%', background: '#050507', border: '1px solid #1a1a1a', color: 'white', padding: '12px 16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{width: '100%', background: '#FF6A00', color: '#000', border: 'none', padding: '14px', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', marginBottom: '16px'}}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p style={{textAlign: 'center', fontSize: '13px', color: '#666'}}>
            Already have an account?{' '}
            <a href="/login" style={{color: '#FF6A00', textDecoration: 'none'}}>Sign In</a>
          </p>
        </div>
      </div>
    </main>
  );
}