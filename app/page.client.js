'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import HotDealsFeed from '../components/HotDealsFeed';

export default function HomePage() {
  const { addToCart } = useCart();

  return (
    <main style={{ background: '#0a0a0b', minHeight: '100vh', paddingBottom: '100px', color: '#fff' }}>
      {/* 🪄 HERO */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '100px 20px 80px' }}>
        <h1 style={{ fontSize: 'clamp(50px, 10vw, 100px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-5px', margin: 0, lineHeight: 0.9 }}>
          LEVEL UP <br/> <span style={{ color: '#66FCF1' }}>SMURF RANK</span>
        </h1>
      </motion.section>

      {/* ⚡ HOT DEALS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px' }}>HOT <span style={{ color: '#66FCF1' }}>DEALS</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { id: 'h1', title: 'CS2 GLOBAL ELITE', price: '$45.00', desc: 'Prime • Instant', img: 'https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg' },
            { id: 'h2', title: 'VALORANT RADIANT', price: '$125.00', desc: 'Skins • Peak Rank', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg' },
            { id: 'h3', title: 'GTA V MODDED 2BN', price: '$29.00', desc: 'Level 500 • Unlocks', img: 'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/games/fob/640/V.jpg' }
          ].map((acc) => (
            <motion.div
              key={acc.id}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, boxShadow: '0px 0px 30px rgba(102, 252, 241, 0.4)' }}
              style={{ background: '#111', borderRadius: '15px', border: '1px solid #222', perspective: '1000px', transformStyle: 'preserve-3d', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '180px', backgroundImage: `url(${acc.img})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#0a0a0b', borderBottom: '2px solid #66FCF1' }}></div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontWeight: 900, marginBottom: '8px', fontSize: '20px' }}>{acc.title}</h3>
                <p style={{ color: '#aaa', fontSize: '13px', marginBottom: 'auto', minHeight: '30px' }}>{acc.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontWeight: 900, fontSize: '22px', color: '#66FCF1' }}>{acc.price}</span>
                  <button onClick={() => addToCart(acc)} style={{ background: '#fff', color: '#000', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: 900, cursor: 'pointer', transition: 'background 0.2s' }}>ADD TO CART</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⚡ HOT DEALS LIVE FEED */}
      <div style={{ marginBottom: '100px' }}><HotDealsFeed /></div>

      {/* 🟣 BOOSTING SECTION (RESTORED) */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(45deg, #1a0b2e, #0a0a0b)', border: '1px solid #3d007a', borderRadius: '24px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '40px', fontWeight: 900, marginBottom: '20px' }}>NEED A <span style={{ color: '#9D00FF' }}>RANK BOOST?</span></h2>
            <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '18px' }}>Radiant & Global Elite boosters ready. 100% Win Rate Guaranteed.</p>
            <button
              onClick={() => window.location.href = '/boosting'}
              style={{ background: '#9D00FF', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer' }}>START BOOST →</button>
          </div>
        </div>
      </section>

      {/* 👑 GOLD SELLER SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a1608 0%, #0a0a0b 100%)',
          border: '1px solid #D4AF37',
          borderRadius: '24px',
          padding: '60px',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.1)'
        }}>
          <h2 style={{ fontWeight: 900, fontSize: '35px', marginBottom: '15px', color: '#D4AF37' }}>BECOME A <span style={{ color: '#fff' }}>VERIFIED SELLER</span></h2>
          <p style={{ color: '#888', marginBottom: '35px', maxWidth: '600px', margin: '0 auto 35px' }}>
            Cash out your high-rank accounts. We offer the lowest fees and fastest payouts in the industry.
          </p>
          <button
            onClick={() => window.location.href = '/sell'}
            style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '18px 50px', borderRadius: '5px', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}
          >
            START SELLING NOW
          </button>
        </div>
      </section>

      {/* ⚡ HOT DEALS LIVE FEED */}
      <HotDealsFeed />

      {/* ❓ FAQ SECTION */}
      <section id="faq" style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px', textAlign: 'center' }}>FREQUENTLY ASKED <span style={{ color: '#66FCF1' }}>QUESTIONS</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            { q: "How fast is delivery?", a: "Accounts are delivered instantly to your email upon payment confirmation." },
            { q: "Are the accounts safe?", a: "Yes, all our smurf and modded accounts are hand-leveled and 100% safe from bans." },
            { q: "Do you offer refunds?", a: "We offer a 7-day warranty on all accounts. If an account is banned due to a defect on our end, we'll replace it or refund you." },
            { q: "How does boosting work?", a: "After purchasing a boost, a professional Radiant/Global player will securely log into your account and rank it up to your desired level." },
          ].map((faq, i) => (
            <div key={i} style={{ background: '#111', padding: '25px', borderRadius: '10px', border: '1px solid #222' }}>
              <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '10px', color: '#fff' }}>{faq.q}</h3>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📜 TERMS & CONDITIONS SECTION */}
      <section id="terms" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '40px', textAlign: 'center' }}>TERMS & <span style={{ color: '#66FCF1' }}>CONDITIONS</span></h2>
        <div style={{ background: '#111', padding: '40px', borderRadius: '15px', border: '1px solid #222', color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome to SmurfRank. By accessing our marketplace, purchasing accounts, or utilizing our boosting services, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before completing any transaction.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>1. Account Delivery:</strong> All account details are sent automatically to the provided email address upon successful payment. It is the buyer's responsibility to ensure the email is correct and to change the account passwords immediately after receipt.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>2. Warranty & Refunds:</strong> SmurfRank provides a standard 7-day warranty on all accounts against original owner recalls or pre-existing bans. If an account gets banned due to the buyer's actions (e.g., toxicity, cheating), the warranty is voided. Refunds or replacements are issued at the sole discretion of the support team.
          </p>
          <p style={{ marginBottom: '20px' }}>
            <strong>3. Boosting Policies:</strong> For boosting services, users must not log into the account while a booster is active. Doing so may result in the termination of the service without a refund. We ensure all boosters use VPNs and refrain from using any third-party software.
          </p>
          <p>
            <strong>4. Liability:</strong> SmurfRank is not affiliated with, endorsed, or sponsored by Valve Corporation, Riot Games, or Rockstar Games. We are not liable for any actions taken against your account by game developers post-purchase, outside of the warranty period.
          </p>
        </div>
      </section>
    </main>
  );
}