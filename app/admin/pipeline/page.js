'use client';
import { useEffect, useState } from 'react';

const STAGES = [
  { key: 'paid', label: 'Paid', next: 'delivered' },
  { key: 'delivered', label: 'Delivered', next: 'completed' },
  { key: 'completed', label: 'Completed', next: null },
  { key: 'disputed', label: 'Disputed', next: null },
];

export default function AdminPipelinePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('Failed to load orders');
      const data = await res.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function setStatus(order, status) {
    setBusyId(order.id);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update order');
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
        Order Pipeline
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#999' }}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#999' }}>No orders yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'start' }}>
          {STAGES.map((stage) => {
            const stageOrders = orders.filter((o) => o.status === stage.key);
            return (
              <div key={stage.key} style={{
                background: 'linear-gradient(145deg, #111, #080808)',
                border: '1px solid #222',
                borderRadius: '14px',
                padding: '16px',
                minHeight: '200px',
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: '14px' }}>
                  {stage.label} ({stageOrders.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stageOrders.map((order) => (
                    <div key={order.id} style={{
                      background: '#0a0a0a', border: '1px solid #222', borderRadius: '10px', padding: '12px',
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{order.itemTitle}</div>
                      <div style={{ fontSize: '11px', color: '#999', marginBottom: '10px' }}>
                        ${order.itemPrice.toFixed(2)} × {order.quantity} · {order.buyerEmail || 'guest'}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {stage.next && (
                          <button
                            disabled={busyId === order.id}
                            onClick={() => setStatus(order, stage.next)}
                            style={{
                              background: '#FFC531', color: '#050505', fontWeight: 700, border: 'none',
                              borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px',
                            }}
                          >
                            Mark {STAGES.find((s) => s.key === stage.next)?.label}
                          </button>
                        )}
                        {stage.key !== 'disputed' && (
                          <button
                            disabled={busyId === order.id}
                            onClick={() => setStatus(order, 'disputed')}
                            style={{
                              background: 'transparent', color: '#f66', border: '1px solid #a33',
                              borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px',
                            }}
                          >
                            Dispute
                          </button>
                        )}
                        {stage.key === 'disputed' && (
                          <button
                            disabled={busyId === order.id}
                            onClick={() => setStatus(order, 'paid')}
                            style={{
                              background: 'transparent', color: '#ccc', border: '1px solid #444',
                              borderRadius: '6px', padding: '6px 10px', cursor: 'pointer', fontSize: '11px',
                            }}
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
