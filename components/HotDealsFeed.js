'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function HotDealsFeed() {
  const containerRef = useRef(null);

  // Example hot deals data
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

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', background: '#0a0a0b', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '15px 0', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: '0 20px', minWidth: '150px', zIndex: 10, background: '#0a0a0b', fontWeight: 900, color: '#66FCF1', borderRight: '1px solid #333' }}>
        LIVE FEED - GRAB NOW 🔥
      </div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          style={{ display: 'flex', gap: '50px', width: 'max-content', paddingLeft: '50px' }}
        >
          {feedItems.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#fff' }}>{item.text}</span>
              <span style={{ color: '#66FCF1' }}>{item.price}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
