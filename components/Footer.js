import Link from 'next/link';
import { GAME_LIST } from '../lib/gameTheme';

const PAYMENT_ICONS = ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-600 bg-ink-950 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-display mb-3 text-lg font-bold text-ink-50">
            SMURF<span className="text-gold-400">RANK</span>
          </h3>
          <p className="text-sm leading-relaxed text-ink-200">
            We source and verify every account ourselves — premium CS2, Valorant, and GTA V
            accounts with instant delivery and a real money-back guarantee.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-300">Games</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {GAME_LIST.map((g) => (
              <li key={g.slug}>
                <Link href={g.href} className="focus-ring text-ink-200 hover:text-ink-50">
                  {g.label} Accounts
                </Link>
              </li>
            ))}
            <li>
              <Link href="/boosting" className="focus-ring text-ink-200 hover:text-ink-50">
                Boosting Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-300">Support &amp; Trust</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><Link href="/sell" className="focus-ring text-ink-200 hover:text-ink-50">Sell Your Account</Link></li>
            <li><Link href="/#faq" className="focus-ring text-ink-200 hover:text-ink-50">FAQ / Support</Link></li>
            <li><Link href="/#terms" className="focus-ring text-ink-200 hover:text-ink-50">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-300">Socials</h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li><a href="#" target="_blank" rel="noopener noreferrer" className="focus-ring text-gold-400 hover:text-gold-300">Instagram</a></li>
            <li><a href="#" className="focus-ring text-ink-200 hover:text-ink-50">Discord</a></li>
            <li><a href="#" className="focus-ring text-ink-200 hover:text-ink-50">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center gap-4 border-t border-ink-600 pt-8 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {PAYMENT_ICONS.map((p) => (
            <span key={p} className="rounded-md border border-ink-600 bg-ink-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-300">
              {p}
            </span>
          ))}
        </div>
        <div className="text-center text-xs text-ink-300 sm:text-right">
          © {new Date().getFullYear()} SmurfRank. All rights reserved. Not affiliated with Valve, Riot Games, or Rockstar Games.
        </div>
      </div>
    </footer>
  );
}
