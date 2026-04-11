'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const HotDealsFeed = React.memo(function HotDealsFeed() {
  const containerRef = useRef(null);

  const feedItems = [
    { text: "CS2 GLOBAL ELITE PRIME - JUST SOLD", price: "$45" },
    { text: "VALORANT RADIANT PEAK - 🔥 HOT", price: "$125" },
    { text: "GTA V 2B CASH - INSTANT DELIVERY", price: "$29" },
    { text: "VALORANT IMMORTAL 3 SMURF - PRICE DROP", price: "$75" },
    { text: "CS2 FACEIT LVL 10 - JUST LISTED", price: "$65" },
    { text: "GTA V KINGPIN BUNDLE - BEST SELLER", price: "$55" },
    // Duplicate to ensure seamless scroll
    { text: "CS2 GLOBAL ELITE PRIME - JUST SOLD", price: "$45" },
    { text: "VALORANT RADIANT PEAK - 🔥 HOT", price: "$125" },
    { text: "GTA V 2B CASH - INSTANT DELIVERY", price: "$29" },
    { text: "VALORANT IMMORTAL 3 SMURF - PRICE DROP", price: "$75" },
    { text: "CS2 FACEIT LVL 10 - JUST LISTED", price: "$65" },
    { text: "GTA V KINGPIN BUNDLE - BEST SELLER", price: "$55" },
  ];

  // ⚡ BOLT OPTIMIZATION: Memoized static feed component
  // 💡 What: Wrapped the purely static HotDealsFeed component in React.memo().
  // 🎯 Why: This component sits inside HomePageClient which uses CartContext. Without memo, it unnecessarily re-renders and restarts its Framer Motion animations every time an item is added to the cart.
  // 📊 Impact: Prevents expensive re-renders and animation resets, keeping the UI smooth when the user interacts with the cart on the homepage.
  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', background: '#F0FFF0', borderTop: '1px solid #D1E8D1', borderBottom: '1px solid #D1E8D1', padding: '15px 0', marginBottom: '100px', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: '0 20px', minWidth: '150px', zIndex: 10, background: '#F0FFF0', fontWeight: 900, color: '#5A9B90', borderRight: '1px solid #D1E8D1' }}>
        LIVE FEED:
      </div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          style={{ display: 'flex', gap: '50px', width: 'max-content', paddingLeft: '50px' }}
        >
          {feedItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#1D3631' }}>{item.text}</span>
              <span style={{ color: '#5A9B90', fontWeight: 900 }}>{item.price}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

export default HotDealsFeed;
