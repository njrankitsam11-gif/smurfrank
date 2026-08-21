import Link from 'next/link';
import { prisma } from '../../lib/prisma';

const cardStyle = {
  background: 'linear-gradient(145deg, #111, #080808)',
  border: '1px solid #222',
  borderRadius: '16px',
  padding: '24px',
};

export default async function AdminDashboardPage() {
  const [listingCount, activeListingCount, pendingListingCount, userCount, adminCount, openOrderCount, boostingCount] = await Promise.all([
    prisma.listing.count(),
    prisma.listing.count({ where: { active: true } }),
    prisma.listing.count({ where: { status: 'pending' } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: 'admin' } }),
    prisma.order.count({ where: { status: { in: ['paid', 'delivered'] } } }),
    prisma.boostingService.count({ where: { active: true } }),
  ]);

  const stats = [
    { label: 'Total Listings', value: listingCount },
    { label: 'Active Listings', value: activeListingCount },
    { label: 'Pending Approval', value: pendingListingCount, href: '/admin/listings' },
    { label: 'Open Orders', value: openOrderCount, href: '/admin/pipeline' },
    { label: 'Active Boosting Services', value: boostingCount, href: '/admin/boosting' },
    { label: 'Total Users', value: userCount },
    { label: 'Admins', value: adminCount },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '30px' }}>
        Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {stats.map((stat) => {
          const content = (
            <>
              <div style={{ fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#FFC531' }}>
                {stat.value}
              </div>
            </>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} style={{ ...cardStyle, textDecoration: 'none', display: 'block' }}>
              {content}
            </Link>
          ) : (
            <div key={stat.label} style={cardStyle}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
