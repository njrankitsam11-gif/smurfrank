'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/pipeline', label: 'Pipeline' },
  { href: '/admin/listings', label: 'Listings' },
  { href: '/admin/boosting', label: 'Boosting' },
  { href: '/admin/users', label: 'Users' },
];

export default function AdminNav({ userEmail }) {
  const pathname = usePathname();

  return (
    <nav style={{
      width: '220px',
      borderRight: '1px solid #1a1a1a',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    }}>
      <div>
        <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
          SmurfRank
        </div>
        <div style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>Admin Console</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: active ? '#050505' : '#ccc',
                background: active ? '#D4AF37' : 'transparent',
                fontWeight: active ? 700 : 500,
                fontSize: '14px',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', fontSize: '12px', color: '#666', wordBreak: 'break-all' }}>
        Signed in as<br />
        <span style={{ color: '#999' }}>{userEmail}</span>
      </div>
    </nav>
  );
}
