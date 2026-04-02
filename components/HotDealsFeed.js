'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HotDealsFeed() {
  const containerRef = useRef(null);

  // Example hot deals data
  const feedItems = [
    { text: "CS2 GLOBAL ELITE PRIME - JUST SOLD", price: "$45", href: "/cs2" },
    { text: "VALORANT RADIANT PEAK - 🔥 HOT", price: "$125", href: "/valorant" },
    { text: "GTA V 2B CASH - INSTANT DELIVERY", price: "$29", href: "/gta-v" },
    { text: "VALORANT IMMORTAL 3 SMURF - PRICE DROP", price: "$75", href: "/valorant" },
    { text: "CS2 FACEIT LVL 10 - JUST LISTED", price: "$65", href: "/cs2" },
    { text: "GTA V KINGPIN BUNDLE - BEST SELLER", price: "$55", href: "/gta-v" },
    // Duplicate to ensure seamless scroll
    { text: "CS2 GLOBAL ELITE PRIME - JUST SOLD", price: "$45", href: "/cs2" },
    { text: "VALORANT RADIANT PEAK - 🔥 HOT", price: "$125", href: "/valorant" },
    { text: "GTA V 2B CASH - INSTANT DELIVERY", price: "$29", href: "/gta-v" },
    { text: "VALORANT IMMORTAL 3 SMURF - PRICE DROP", price: "$75", href: "/valorant" },
    { text: "CS2 FACEIT LVL 10 - JUST LISTED", price: "$65", href: "/cs2" },
    { text: "GTA V KINGPIN BUNDLE - BEST SELLER", price: "$55", href: "/gta-v" },
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
            <Link key={idx} href={item.href} style={{ textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              <span style={{ color: '#fff', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#66FCF1'} onMouseLeave={(e) => e.target.style.color = '#fff'}>
                {item.text}
              </span>
              <span style={{ color: '#66FCF1' }}>{item.price}</span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
