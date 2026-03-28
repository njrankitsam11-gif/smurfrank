'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { cart, setIsOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState([0, 0, 0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setUsers([
        Math.floor(Math.random() * 999),
        Math.floor(Math.random() * 999),
        Math.floor(Math.random() * 999),
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={styles.header}>
      {/* MOVING LIVE FEED */}
      <div className={styles.liveFeedContainer}>
        <div className="live-feed-animation">
          {mounted ? (
            <>
              LIVE: USER_{users[0]} PURCHASED GTA V 2BN ACCOUNT — 1m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{users[1]} PURCHASED CS2 GLOBAL ELITE — 3m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{users[2]} PURCHASED VALORANT RADIANT — 5m AGO
            </>
          ) : (
            "LOADING RECENT SALES..."
          )}
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>SMURF<span className={styles.logoHighlight}>RANK</span></Link>
        
        <div className={styles.navLinks}>
          <Link href="/cs2" className={styles.link}>CS2</Link>
          <Link href="/valorant" className={styles.link}>VAL</Link>
          <Link href="/gta-v" className={styles.link}>GTA V</Link>
          <Link href="/boosting" className={styles.linkBoosting}>BOOSTING</Link>
          <Link href="/sell" className={styles.linkSell}>SELL</Link>
          
          <div className={styles.divider} />
          
          <Link href="/login" className={styles.linkSignIn}>SIGN IN</Link>
          
          <button onClick={() => setIsOpen(true)} className={styles.cartButton}>
            CART ({cart.length})
          </button>
        </div>
      </nav>
    </header>
  );
}
