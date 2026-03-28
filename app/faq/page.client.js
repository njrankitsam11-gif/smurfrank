'use client';
import { useState } from 'react';

const faqs = [
  {
    question: "How fast is delivery after I pay?",
    answer: "Delivery is instant! Once your payment is confirmed, the account credentials (username, password, and original email) are instantly displayed on your screen and emailed to you."
  },
  {
    question: "Are the accounts safe from bans?",
    answer: "Yes. All our accounts are hand-leveled or boosted by professionals without the use of third-party cheats or automated bots. We offer a lifetime warranty against bans related to our leveling process."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a full refund if the account credentials do not work upon delivery, or if the account is banned for a reason related to our creation process within 14 days of purchase. We do not offer refunds if you get banned for toxicity or cheating after purchase."
  },
  {
    question: "Can I change the email and password?",
    answer: "Absolutely! Upon purchase, you will receive full access to the account and its original creation email. You are encouraged to change the password and bind it to your own email immediately."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major Credit/Debit Cards, PayPal, and select Cryptocurrencies (BTC, ETH, LTC) via Stripe and our secure payment gateways."
  }
];

export default function FAQPageClient() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
        Frequently Asked <span style={{ color: '#00ff88' }}>Questions</span>
      </h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>
        Everything you need to know about purchasing accounts on SmurfRank.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {faq.question}
              <span style={{
                color: '#00ff88',
                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </span>
            </button>
            <div
              style={{
                padding: openIndex === index ? '0 1.5rem 1.5rem' : '0 1.5rem',
                maxHeight: openIndex === index ? '500px' : '0',
                opacity: openIndex === index ? 1 : 0,
                overflow: 'hidden',
                color: '#888',
                lineHeight: '1.6',
                transition: 'all 0.3s ease'
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>Still have questions?</h3>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>Our support team is available 24/7 on our Discord server.</p>
        <a
          href="https://discord.gg/smurfrank"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#00ff88',
            color: '#000',
            padding: '0.8rem 2rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#00cc6a'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#00ff88'}
        >
          Join Discord Support
        </a>
      </div>
    </div>
  );
}
