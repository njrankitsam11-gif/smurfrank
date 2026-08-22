'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TOPICS = [
  { value: 'sell', label: 'I want to sell my account' },
  { value: 'buy', label: 'Question about buying' },
  { value: 'boosting', label: 'Boosting service' },
  { value: 'partnership', label: 'Partnership / business' },
  { value: 'other', label: 'Something else' },
];

const STORAGE_KEY = 'smurfrank_inquiry';

export default function EnquireWidget() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('open');
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  const [topic, setTopic] = useState('sell');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const threadEndRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch {
      // ignore corrupt local storage
    }
  }, []);

  const loadThread = useCallback(async (id, token) => {
    try {
      const res = await fetch(`/api/inquiries/${id}?token=${encodeURIComponent(token)}`);
      if (!res.ok) return;
      const data = await res.json();
      setMessages(data.messages);
      setStatus(data.status);
    } catch {
      // silently ignore poll failures
    }
  }, []);

  useEffect(() => {
    if (!open || !saved) return;
    loadThread(saved.id, saved.token);
    const interval = setInterval(() => loadThread(saved.id, saved.token), 5000);
    return () => clearInterval(interval);
  }, [open, saved, loadThread]);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in every field.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      const record = { id: data.id, token: data.token };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      setSaved(record);
      setMessages([{ id: 'local', sender: 'user', body: message.trim(), createdAt: new Date().toISOString() }]);
      setStatus('open');
      setMessage('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!reply.trim() || !saved) return;
    setSending(true);
    try {
      const res = await fetch(`/api/inquiries/${saved.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: saved.token, body: reply.trim() }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setReply('');
      await loadThread(saved.id, saved.token);
    } catch {
      // best-effort; the poll will pick it up
    } finally {
      setSending(false);
    }
  }

  function startNewInquiry() {
    localStorage.removeItem(STORAGE_KEY);
    setSaved(null);
    setMessages([]);
    setMessage('');
  }

  return (
    <div className="fixed bottom-5 right-5 z-[9000] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="flex w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-800 shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-ink-600 px-4 py-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-gold-400">Enquire</div>
                <div className="text-[11px] text-ink-300">
                  {saved ? 'We usually reply within a few hours' : 'Sellers, buyers, boosters — ask us anything'}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="focus-ring rounded-md p-1 text-ink-300 hover:text-ink-50"
              >
                ✕
              </button>
            </div>

            {!saved ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
                {formError && (
                  <div role="alert" className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-300">
                    {formError}
                  </div>
                )}
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-ink-200">I'm here to...</span>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="focus-ring w-full appearance-none rounded-lg border border-ink-500 bg-ink-700 px-3 py-2 text-sm font-semibold text-ink-50"
                  >
                    {TOPICS.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  maxLength={100}
                  className="focus-ring w-full rounded-lg border border-ink-500 bg-ink-700 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-300"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  maxLength={150}
                  className="focus-ring w-full rounded-lg border border-ink-500 bg-ink-700 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-300"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={topic === 'sell' ? "Tell us about the account you'd like to list..." : 'How can we help?'}
                  maxLength={2000}
                  rows={3}
                  className="focus-ring w-full resize-none rounded-lg border border-ink-500 bg-ink-700 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-300"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="focus-ring w-full rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-gold hover:bg-gold-300 disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            ) : (
              <>
                <div className="flex max-h-80 flex-col gap-2 overflow-y-auto p-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-xs ${
                        m.sender === 'admin'
                          ? 'self-start bg-ink-700 text-ink-50'
                          : 'self-end bg-gold-400 text-ink-950'
                      }`}
                    >
                      {m.body}
                    </div>
                  ))}
                  <div ref={threadEndRef} />
                  {status === 'closed' && (
                    <div className="self-center rounded-full border border-ink-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-300">
                      Conversation closed
                    </div>
                  )}
                </div>
                <form onSubmit={handleReply} className="flex gap-2 border-t border-ink-600 p-3">
                  <input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type a message..."
                    maxLength={2000}
                    className="focus-ring w-full flex-1 rounded-lg border border-ink-500 bg-ink-700 px-3 py-2 text-sm text-ink-50 placeholder:text-ink-300"
                  />
                  <button
                    type="submit"
                    disabled={sending || !reply.trim()}
                    className="focus-ring shrink-0 rounded-lg bg-gold-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-950 disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
                <button
                  onClick={startNewInquiry}
                  className="focus-ring border-t border-ink-600 px-4 py-2 text-center text-[11px] font-semibold text-ink-300 hover:text-ink-50"
                >
                  Start a new enquiry
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex items-center gap-2 rounded-full border border-ink-500 bg-ink-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-50 shadow-glow hover:border-gold-400"
      >
        <span aria-hidden="true">💬</span>
        {open ? 'Close' : 'Enquire'}
      </button>
    </div>
  );
}
