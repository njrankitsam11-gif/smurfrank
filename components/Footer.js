import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h3 className={styles.brand}>
            SMURF<span className={styles.highlight}>RANK</span>
          </h3>
          <p className={styles.description}>
            The #1 trusted marketplace for premium gaming accounts, modded accounts, and boosting services.
          </p>
        </div>

        <div>
          <h4 className={styles.heading}>Games</h4>
          <ul className={styles.list}>
            <li><Link href="/cs2" className={styles.link}>CS2 Smurf Accounts</Link></li>
            <li><Link href="/valorant" className={styles.link}>Valorant Accounts</Link></li>
            <li><Link href="/gta-v" className={styles.link}>GTA V Modded Accounts</Link></li>
            <li><Link href="/boosting" className={styles.link}>Boosting Services</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Support & Trust</h4>
          <ul className={styles.list}>
            <li><Link href="/sell" className={styles.link}>Sell Your Account</Link></li>
            <li><Link href="/faq" className={styles.link}>FAQ / Support</Link></li>
            <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Socials</h4>
          <ul className={styles.list}>
            <li>
              <a href="https://instagram.com/smurfrank" target="_blank" rel="noopener noreferrer" className={styles.instagramLink}>
                Follow us on Instagram
              </a>
            </li>
            <li><a href="https://discord.gg/smurfrank" target="_blank" rel="noopener noreferrer" className={styles.link}>Join our Discord</a></li>
            <li><a href="https://twitter.com/smurfrank" target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        © {new Date().getFullYear()} SmurfRank. All rights reserved. Not affiliated with Valve, Riot Games, or Rockstar Games.
      </div>
    </footer>
  );
}
