export const metadata = {
  title: 'Register | RankVault',
  description: 'Join RankVault to buy and sell premium ranked accounts.',
};

export default function RegisterPage() {
  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#0f0f17', border: '1px solid #1a1a1a' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <a href="/" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
            RANK<span style={{ color: '#FF6A00' }}>VAULT</span>
          </a>
          <h1 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginTop: '20px', letterSpacing: '1px' }}>Join the Elite</h1>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Username</label>
            <input type="text" placeholder="Gamer123" style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Email</label>
            <input type="email" placeholder="gamer@email.com" style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>
          <button type="submit" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Create Account</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#FF6A00', textDecoration: 'none' }}>Sign in</a>
        </p>
      </div>
    </main>
  );
}