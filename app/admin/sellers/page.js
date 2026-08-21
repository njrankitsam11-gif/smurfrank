'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/sellers');
      if (!res.ok) throw new Error('Failed to load sellers');
      const data = await res.json();
      setSellers(data.sellers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '20px' }}>
        Sellers
      </h1>

      {error && (
        <div style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ color: '#999' }}>Loading sellers...</p>
      ) : sellers.length === 0 ? (
        <p style={{ color: '#999' }}>No one has submitted a listing yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#999', borderBottom: '1px solid #222' }}>
                <th style={{ padding: '10px' }}>Seller</th>
                <th style={{ padding: '10px' }}>Total Listings</th>
                <th style={{ padding: '10px' }}>Active</th>
                <th style={{ padding: '10px' }}>Pending</th>
                <th style={{ padding: '10px' }}>Rejected</th>
                <th style={{ padding: '10px' }}>First Submission</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller.sellerEmail} style={{ borderBottom: '1px solid #161616' }}>
                  <td style={{ padding: '10px' }}>{seller.sellerEmail}</td>
                  <td style={{ padding: '10px' }}>{seller.total}</td>
                  <td style={{ padding: '10px', color: '#5f5' }}>{seller.active}</td>
                  <td style={{ padding: '10px', color: seller.pending > 0 ? '#FFC531' : '#999' }}>{seller.pending}</td>
                  <td style={{ padding: '10px', color: seller.rejected > 0 ? '#f55' : '#999' }}>{seller.rejected}</td>
                  <td style={{ padding: '10px', color: '#999' }}>
                    {new Date(seller.firstSubmission).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <Link href={`/admin/listings?seller=${encodeURIComponent(seller.sellerEmail)}`} style={{ color: '#FFC531', fontSize: '12px' }}>
                      View Listings
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
