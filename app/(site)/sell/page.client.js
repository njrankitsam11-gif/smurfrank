'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const seo = {
  title: "Verified Seller Portal | List Your Account | SmurfRank",
  description: "Securely upload your account details and screenshots. Reach thousands of buyers with our premium gold-tier seller dashboard."
};

const emptyForm = { title: '', game: 'Valorant', price: '', description: '' };

export default function SellPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        router.push('/login?callbackUrl=/sell');
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#06070A', color: '#fff', paddingBottom: '100px' }}>
      {/* 1. HEADER */}
      <section style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <div style={{ color: '#FFC531', fontSize: '12px', fontWeight: 900, letterSpacing: '3px', marginBottom: '20px', textTransform: 'uppercase' }}>
          Asset Deployment
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 75px)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-2px' }}>
          LIST YOUR <span style={{ color: '#FFC531', textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>LEGACY</span>
        </h1>
      </section>

      {/* 2. THE PREMIUM FORM */}
      <section style={{ maxWidth: '900px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(145deg, #151923, #0A0C11)',
          border: '1px solid #FFC531',
          borderRadius: '24px',
          padding: '50px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
        }}>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
              <div style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
                Listing submitted for review
              </div>
              <p style={{ color: '#999', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
                Our team will review your account details and activate the listing once approved.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '30px', background: 'transparent', border: '1px solid #FFC531', color: '#FFC531', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700 }}
              >
                Submit Another Listing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

              {error && (
                <div role="alert" style={{ gridColumn: 'span 2', background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '12px 16px', borderRadius: '8px', fontSize: '13px' }}>
                  {error}
                </div>
              )}

              {/* --- TEXT DETAILS --- */}
              <div style={{ gridColumn: 'span 2' }}>
                <label htmlFor="listingTitle" style={labelStyle}>Listing Title</label>
                <input
                  className={'focus-ring'}
                  id="listingTitle"
                  type="text"
                  required
                  placeholder="e.g. Stacked Valorant Account - All Battlepasses"
                  style={inputStyle}
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="gameTier" style={labelStyle}>Game Tier</label>
                <select
                  className={'focus-ring'}
                  id="gameTier"
                  style={inputStyle}
                  value={form.game}
                  onChange={(e) => setForm({ ...form, game: e.target.value })}
                >
                  <option>Valorant</option>
                  <option>CS2</option>
                  <option>GTA V</option>
                </select>
              </div>

              <div>
                <label htmlFor="askingPrice" style={labelStyle}>Asking Price ($)</label>
                <input
                  className={'focus-ring'}
                  id="askingPrice"
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  style={inputStyle}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              {/* --- 📸 SCREENSHOT UPLOAD SECTION (visual only, not stored yet) --- */}
              <div style={{ gridColumn: 'span 2' }}>
                <span id="fileUploadLabel" style={labelStyle}>Account Visuals (Screenshots)</span>
                <label htmlFor="fileUpload" className="file-dropzone" style={{
                  display: 'block',
                  border: '2px dashed #333',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  background: 'rgba(212, 175, 55, 0.02)',
                  transition: 'border 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#FFC531'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#3A4054'}
                >
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>🖼️</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFC531', marginBottom: '5px' }}>UPLOAD PROOF OF OWNERSHIP</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>Drag and drop screenshots of your lobby, skins, or rank (PNG, JPG)</div>
                  <input aria-labelledby="fileUploadLabel" className={'focus-ring'} type="file" multiple style={{ opacity: 0, width: '1px', height: '1px', position: 'absolute' }} id="fileUpload" />
                  <span style={{
                    display: 'inline-block',
                    marginTop: '20px',
                    fontSize: '12px',
                    fontWeight: 900,
                    color: '#000',
                    background: '#FFC531',
                    padding: '8px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>SELECT FILES</span>
                </label>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label htmlFor="detailedDescription" style={labelStyle}>Detailed description</label>
                <textarea
                  className={'focus-ring'}
                  id="detailedDescription"
                  required
                  placeholder="List all rare skins, peak ranks, and region info..."
                  style={{...inputStyle, height: '120px', resize: 'none'}}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className={'focus-ring'}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(45deg, #FFC531, #AA8A2E)',
                    color: '#000',
                    padding: '20px',
                    borderRadius: '12px',
                    fontWeight: 900,
                    fontSize: '16px',
                    border: 'none',
                    cursor: submitting ? 'default' : 'pointer',
                    boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
                    textTransform: 'uppercase',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Deploying...' : 'Deploy Listing'}
                </button>
              </div>

            </form>
          )}
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
  color: '#FFC531',
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
