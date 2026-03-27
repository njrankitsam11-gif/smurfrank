'use client';
import React from 'react';

const seo = {
  title: "Verified Seller Portal | List Your Account | SmurfRank",
  description: "Securely upload your account details and screenshots. Reach thousands of buyers with our premium gold-tier seller dashboard."
};

export default function SellPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#fff', paddingBottom: '100px' }}>
      {/* 1. HEADER */}
      <section style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <div style={{ color: '#D4AF37', fontSize: '12px', fontWeight: 900, letterSpacing: '3px', marginBottom: '20px', textTransform: 'uppercase' }}>
          Asset Deployment
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 75px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-2px' }}>
          LIST YOUR <span style={{ color: '#D4AF37', textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>LEGACY</span>
        </h1>
      </section>

      {/* 2. THE PREMIUM FORM */}
      <section style={{ maxWidth: '900px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(145deg, #111, #080808)',
          border: '1px solid #D4AF37',
          borderRadius: '24px',
          padding: '50px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
        }}>

          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

            {/* --- TEXT DETAILS --- */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Listing Title</label>
              <input type="text" placeholder="e.g. Stacked Valorant Account - All Battlepasses" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Game Tier</label>
              <select style={inputStyle}>
                <option>Valorant</option>
                <option>CS2</option>
                <option>GTA V</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Asking Price ($)</label>
              <input type="number" placeholder="0.00" style={inputStyle} />
            </div>

            {/* --- 📸 NEW: SCREENSHOT UPLOAD SECTION --- */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Account Visuals (Screenshots)</label>
              <div style={{
                border: '2px dashed #333',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                background: 'rgba(212, 175, 55, 0.02)',
                transition: 'border 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#333'}
              >
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🖼️</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#D4AF37', marginBottom: '5px' }}>UPLOAD PROOF OF OWNERSHIP</div>
                <div style={{ fontSize: '11px', color: '#555' }}>Drag and drop screenshots of your lobby, skins, or rank (PNG, JPG)</div>
                <input type="file" multiple style={{ display: 'none' }} id="fileUpload" />
                <label htmlFor="fileUpload" style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  fontSize: '12px',
                  fontWeight: 900,
                  color: '#000',
                  background: '#D4AF37',
                  padding: '8px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>SELECT FILES</label>
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Detailed description</label>
              <textarea placeholder="List all rare skins, peak ranks, and region info..." style={{...inputStyle, height: '120px', resize: 'none'}} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <button style={{
                width: '100%',
                background: 'linear-gradient(45deg, #D4AF37, #AA8A2E)',
                color: '#000',
                padding: '20px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
                textTransform: 'uppercase'
              }}>
                Deploy Listing
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 900,
  textTransform: 'uppercase',
  color: '#D4AF37',
  marginBottom: '10px',
  letterSpacing: '1.5px'
};

const inputStyle = {
  width: '100%',
  background: '#0a0a0b',
  border: '1px solid #222',
  padding: '18px',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box'
};