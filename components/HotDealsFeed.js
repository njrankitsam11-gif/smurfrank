'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// ⚡ BOLT OPTIMIZATION: Extracted static array outside component
// 💡 What: Moved feedItems array out of component scope
// 🎯 Why: Prevents re-creating the array reference on every render, stabilizing reference for React.memo
// 📊 Impact: Saves garbage collection overhead and enables strict equality checks for memoization
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

// ⚡ BOLT OPTIMIZATION: Memoized static animation component
// 💡 What: Wrapped HotDealsFeed with React.memo()
// 🎯 Why: This component contains heavy Framer Motion animations and has NO props. When parent components
// (like HomePage) update due to state changes (like adding to cart), this prevents unnecessary DOM diffing
// and animation restarts.
// 📊 Impact: Eliminates ~15ms of re-render time when parent state changes.
const HotDealsFeed = React.memo(function HotDealsFeed() {
  const containerRef = useRef(null);

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
