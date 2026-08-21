'use client';
import { useEffect, useState } from 'react';

const ROLES = ['buyer', 'seller', 'admin'];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users');
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function changeRole(user, role) {
    if (role === user.role) return;
    setBusyId(user.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to update role');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function deleteUser(user) {
    if (!confirm(`Delete user ${user.email}? This cannot be undone.`)) return;
    setBusyId(user.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
        Users
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#999' }}>Loading users...</p>
      ) : users.length === 0 ? (
        <p style={{ color: '#999' }}>No users yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#999', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px' }}>Name</th>
                <th style={{ padding: '10px' }}>Role</th>
                <th style={{ padding: '10px' }}>Joined</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #161616' }}>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>{user.name || '—'}</td>
                  <td style={{ padding: '10px' }}>
                    <select
                      value={user.role}
                      disabled={busyId === user.id}
                      onChange={(e) => changeRole(user, e.target.value)}
                      style={{
                        background: '#0a0a0a', border: '1px solid #333', borderRadius: '6px',
                        color: '#fff', fontSize: '12px', padding: '4px 8px',
                      }}
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '10px', color: '#999' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => deleteUser(user)}
                      disabled={busyId === user.id}
                      style={{ background: 'transparent', border: 'none', color: '#f66', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                    >
                      Delete
                    </button>
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
