'use client';
import { useEffect, useState, useCallback, useRef } from 'react';

const TOPIC_LABELS = {
  sell: 'Wants to Sell',
  buy: 'Buying Question',
  boosting: 'Boosting',
  partnership: 'Partnership',
  other: 'Other',
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const threadEndRef = useRef(null);

  const loadList = useCallback(async () => {
    setError('');
    try {
      const res = await fetch('/api/admin/inquiries');
      if (!res.ok) throw new Error('Failed to load inquiries');
      const data = await res.json();
      setInquiries(data.inquiries);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDetail = useCallback(async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`);
      if (!res.ok) throw new Error('Failed to load inquiry');
      const data = await res.json();
      setDetail(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => { loadList(); }, [loadList]);

  useEffect(() => {
    if (!selectedId) return;
    loadDetail(selectedId);
    const interval = setInterval(() => loadDetail(selectedId), 5000);
    return () => clearInterval(interval);
  }, [selectedId, loadDetail]);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [detail?.messages?.length]);

  async function sendReply(e) {
    e.preventDefault();
    if (!reply.trim() || !selectedId) return;
    setSending(true);
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: reply.trim() }),
      });
      if (!res.ok) throw new Error('Failed to send reply');
      setReply('');
      await loadDetail(selectedId);
      await loadList();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function toggleStatus() {
    if (!detail) return;
    const nextStatus = detail.status === 'closed' ? 'open' : 'closed';
    try {
      const res = await fetch(`/api/admin/inquiries/${selectedId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setDetail((d) => ({ ...d, status: nextStatus }));
      await loadList();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
        Inquiries
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 340px', border: '1px solid #1a1a1a', borderRadius: '10px', overflow: 'hidden' }}>
          {loading ? (
            <p style={{ color: '#999', padding: '16px' }}>Loading inquiries...</p>
          ) : inquiries.length === 0 ? (
            <p style={{ color: '#999', padding: '16px' }}>No inquiries yet.</p>
          ) : (
            inquiries.map((inq) => (
              <button
                key={inq.id}
                onClick={() => setSelectedId(inq.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  borderBottom: '1px solid #161616',
                  background: selectedId === inq.id ? '#171400' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{inq.name}</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: inq.status === 'closed' ? '#666' : '#5f5',
                  }}>
                    {inq.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#FFC531', fontWeight: 700, marginBottom: '4px' }}>
                  {TOPIC_LABELS[inq.topic] || inq.topic}
                </div>
                <div style={{ fontSize: '12px', color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {inq.lastMessage ? `${inq.lastMessage.sender === 'admin' ? 'You: ' : ''}${inq.lastMessage.body}` : ''}
                </div>
              </button>
            ))
          )}
        </div>

        <div style={{ flex: 1, border: '1px solid #1a1a1a', borderRadius: '10px', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
          {!detail ? (
            <p style={{ color: '#999', padding: '16px' }}>Select an inquiry to view the conversation.</p>
          ) : (
            <>
              <div style={{ padding: '16px', borderBottom: '1px solid #161616', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{detail.name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{detail.email} · {TOPIC_LABELS[detail.topic] || detail.topic}</div>
                </div>
                <button
                  onClick={toggleStatus}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: '1px solid #333',
                    background: 'transparent',
                    color: detail.status === 'closed' ? '#FFC531' : '#f88',
                  }}
                >
                  {detail.status === 'closed' ? 'Reopen' : 'Close'}
                </button>
              </div>

              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '400px' }}>
                {detail.messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.sender === 'admin' ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      background: m.sender === 'admin' ? '#FFC531' : '#141414',
                      color: m.sender === 'admin' ? '#050505' : '#eee',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                    }}
                  >
                    {m.body}
                    <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.6 }}>
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div ref={threadEndRef} />
              </div>

              <form onSubmit={sendReply} style={{ display: 'flex', gap: '10px', padding: '16px', borderTop: '1px solid #161616' }}>
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply..."
                  maxLength={2000}
                  style={{
                    flex: 1,
                    background: '#0c0c0c',
                    border: '1px solid #262626',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                />
                <button
                  type="submit"
                  disabled={sending || !reply.trim()}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: '#FFC531',
                    color: '#050505',
                    border: 'none',
                    cursor: sending || !reply.trim() ? 'not-allowed' : 'pointer',
                    opacity: sending || !reply.trim() ? 0.6 : 1,
                  }}
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
