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

const emptyForm = { title: '', game: 'VAL', price: '', description: '', active: true };

export default function AdminBoostingPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/boosting');
      if (!res.ok) throw new Error('Failed to load boosting services');
      const data = await res.json();
      setServices(data.services);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function startEdit(service) {
    setEditingId(service.id);
    setForm({
      title: service.title, game: service.game, price: String(service.price),
      description: service.description, active: service.active,
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
    const payload = { ...form, price: Number(form.price) };
    try {
      const url = editingId ? `/api/admin/boosting/${editingId}` : '/api/admin/boosting';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save service');
      }
      cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(service) {
    setError('');
    try {
      const res = await fetch(`/api/admin/boosting/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !service.active }),
      });
      if (!res.ok) throw new Error('Failed to update service');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteService(id) {
    if (!confirm('Delete this boosting service? This cannot be undone.')) return;
    setError('');
    try {
      const res = await fetch(`/api/admin/boosting/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      if (editingId === id) cancelEdit();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
        Boosting Services
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
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
          {editingId ? 'Edit Service' : 'New Service'}
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ fontSize: '12px', color: '#999' }}>Title</label>
          <input style={inputStyle} required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Game</label>
          <select style={inputStyle} value={form.game} onChange={(e) => setForm({ ...form, game: e.target.value })}>
            <option value="VAL">Valorant</option>
            <option value="CS2">CS2</option>
            <option value="GTA">GTA V</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '12px', color: '#999' }}>Price ($)</label>
          <input style={inputStyle} required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>

        <div style={{ gridColumn: 'span 3' }}>
          <label style={{ fontSize: '12px', color: '#999' }}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '70px' }} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div style={{ gridColumn: 'span 3', display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={saving} style={{
            background: '#FFC531', color: '#050505', fontWeight: 700, border: 'none',
            borderRadius: '10px', padding: '10px 20px', cursor: 'pointer', fontSize: '13px',
          }}>
            {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Service'}
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
        <p style={{ color: '#999' }}>Loading boosting services...</p>
      ) : services.length === 0 ? (
        <p style={{ color: '#999' }}>No boosting services yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#999', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>Title</th>
                <th style={{ padding: '10px' }}>Game</th>
                <th style={{ padding: '10px' }}>Price</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} style={{ borderBottom: '1px solid #161616' }}>
                  <td style={{ padding: '10px' }}>{service.title}</td>
                  <td style={{ padding: '10px' }}>{service.game}</td>
                  <td style={{ padding: '10px' }}>${service.price.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: service.active ? '#5f5' : '#999' }}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '10px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEdit(service)} style={linkBtn}>Edit</button>
                    <button onClick={() => toggleActive(service)} style={linkBtn}>
                      {service.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => deleteService(service.id)} style={{ ...linkBtn, color: '#f66' }}>Delete</button>
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
  color: '#FFC531',
  cursor: 'pointer',
  fontSize: '12px',
  padding: 0,
};
