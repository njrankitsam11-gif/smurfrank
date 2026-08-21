'use client';
import { useEffect, useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  background: '#0a0a0a',
  border: '1px solid #333',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '13px',
};

const emptyForm = {
  title: '', game: 'Valorant', rank: '', region: '', price: '',
  level: '', wins: '', hours: '', type: '', instant: true,
  description: '', includes: '', images: '', active: true,
};

export default function AdminListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/listings');
      if (!res.ok) throw new Error('Failed to load listings');
      const data = await res.json();
      setListings(data.listings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startEdit(listing) {
    setEditingId(listing.id);
    setForm({
      title: listing.title, game: listing.game, rank: listing.rank, region: listing.region,
      price: String(listing.price), level: listing.level, wins: listing.wins, hours: listing.hours,
      type: listing.type, instant: listing.instant, description: listing.description,
      includes: listing.includes.join(', '), images: (listing.images || []).join(', '), active: listing.active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function submitForm(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...form,
      price: Number(form.price),
      includes: form.includes.split(',').map((s) => s.trim()).filter(Boolean),
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      const url = editingId ? `/api/admin/listings/${editingId}` : '/api/admin/listings';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save listing');
      }
      cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(listing) {
    setError('');
    try {
      const res = await fetch(`/api/admin/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !listing.active }),
      });
      if (!res.ok) throw new Error('Failed to update listing');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function approveListing(listing) {
    setError('');
    try {
      const res = await fetch(`/api/admin/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active', active: true }),
      });
      if (!res.ok) throw new Error('Failed to approve listing');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function rejectListing(listing) {
    setError('');
    try {
      const res = await fetch(`/api/admin/listings/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', active: false }),
      });
      if (!res.ok) throw new Error('Failed to reject listing');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteListing(id) {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
    setError('');
    try {
      const res = await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete listing');
      if (editingId === id) cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const pendingListings = listings.filter((l) => l.status === 'pending');

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
        Listings
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {pendingListings.length > 0 && (
        <div style={{
          background: 'linear-gradient(145deg, #1a1400, #110d00)',
          border: '1px solid #D4AF37',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '30px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px' }}>
            Pending Seller Submissions ({pendingListings.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingListings.map((listing) => (
              <div key={listing.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: '#0a0a0a', border: '1px solid #222', borderRadius: '10px', padding: '12px 16px',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{listing.title}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {listing.game} · ${listing.price.toFixed(2)} · submitted by {listing.sellerEmail || 'unknown'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => approveListing(listing)} style={{
                    background: '#D4AF37', color: '#050505', fontWeight: 700, border: 'none',
                    borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px',
                  }}>
                    Approve
                  </button>
                  <button onClick={() => rejectListing(listing)} style={{
                    background: 'transparent', color: '#f66', border: '1px solid #a33',
                    borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '12px',
                  }}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={submitForm} style={{
        background: 'linear-gradient(145deg, #111, #080808)',
        border: '1px solid #222',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '30px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '14px',
      }}>
        <div style={{ gridColumn: 'span 3', fontWeight: 700, fontSize: '15px' }}>
          {editingId ? 'Edit Listing' : 'New Listing'}
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Title</label>
          <input style={inputStyle} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Game</label>
          <select style={inputStyle} value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value })}>
            <option>Valorant</option>
            <option>CS2</option>
            <option>GTA V</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Rank</label>
          <input style={inputStyle} required value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Region</label>
          <input style={inputStyle} required value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Price ($)</label>
          <input style={inputStyle} required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Level</label>
          <input style={inputStyle} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Wins</label>
          <input style={inputStyle} value={form.wins} onChange={(e) => setForm({ ...form, wins: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Hours</label>
          <input style={inputStyle} value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Type</label>
          <input style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <label style={{ fontSize: '12px', color: '#999' }}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '70px' }} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <label style={{ fontSize: '12px', color: '#999' }}>Includes (comma separated)</label>
          <input style={inputStyle} value={form.includes} onChange={(e) => setForm({ ...form, includes: e.target.value })} />
        </div>

        <div style={{ gridColumn: 'span 3' }}>
          <label style={{ fontSize: '12px', color: '#999' }}>Image URLs (comma separated, optional — falls back to illustrated art)</label>
          <input style={inputStyle} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        </div>

        <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={form.instant} onChange={(e) => setForm({ ...form, instant: e.target.checked })} />
          Instant delivery
        </label>
        <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>

        <div style={{ gridColumn: 'span 3', display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={saving} style={{
            background: '#D4AF37', color: '#050505', fontWeight: 700, border: 'none',
            borderRadius: '10px', padding: '10px 20px', cursor: 'pointer', fontSize: '13px',
          }}>
            {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Listing'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} style={{
              background: 'transparent', color: '#ccc', border: '1px solid #444',
              borderRadius: '10px', padding: '10px 20px', cursor: 'pointer', fontSize: '13px',
            }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p style={{ color: '#999' }}>Loading listings...</p>
      ) : listings.length === 0 ? (
        <p style={{ color: '#999' }}>No listings yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#999', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>Title</th>
                <th style={{ padding: '10px' }}>Game</th>
                <th style={{ padding: '10px' }}>Rank</th>
                <th style={{ padding: '10px' }}>Price</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} style={{ borderBottom: '1px solid #161616' }}>
                  <td style={{ padding: '10px' }}>{listing.title}</td>
                  <td style={{ padding: '10px' }}>{listing.game}</td>
                  <td style={{ padding: '10px' }}>{listing.rank}</td>
                  <td style={{ padding: '10px' }}>${listing.price.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: listing.status === 'pending' ? '#D4AF37' : listing.status === 'rejected' ? '#f55' : listing.active ? '#5f5' : '#999' }}>
                      {listing.status === 'pending' ? 'Pending' : listing.status === 'rejected' ? 'Rejected' : listing.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '10px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEdit(listing)} style={linkBtn}>Edit</button>
                    <button onClick={() => toggleActive(listing)} style={linkBtn}>
                      {listing.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => deleteListing(listing.id)} style={{ ...linkBtn, color: '#f66' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const linkBtn = {
  background: 'transparent',
  border: 'none',
  color: '#D4AF37',
  cursor: 'pointer',
  fontSize: '12px',
  padding: 0,
};
