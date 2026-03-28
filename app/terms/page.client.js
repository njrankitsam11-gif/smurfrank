'use client';

export default function TermsPageClient() {
  return (
    <div style={{ padding: '6rem 2rem 4rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh', color: '#888', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#fff' }}>
        Terms of <span style={{ color: '#00ff88' }}>Service</span>
      </h1>

      <div style={{ padding: '2rem', backgroundColor: '#111', borderRadius: '8px', border: '1px solid #222' }}>
        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <em>Last Updated: {new Date().toLocaleDateString()}</em>
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>1. Introduction</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Welcome to SmurfRank ("we", "our", "us"). By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>2. Digital Goods</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          SmurfRank acts as a marketplace for the sale and purchase of digital gaming accounts ("Digital Goods"). Upon successful payment, all relevant credentials for the Digital Good will be instantly delivered. You understand that these goods are intangible and non-physical.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>3. Refunds and Warranty</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          We provide a lifetime warranty covering bans related explicitly to the account creation or leveling process prior to your purchase.
          <ul>
            <li style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>We offer a 14-day refund window if the account credentials provided do not work upon initial delivery.</li>
            <li style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>We <strong>do not</strong> provide refunds for accounts that are banned due to user actions after the purchase, including but not limited to: toxicity, cheating, hacking, or using unauthorized third-party software.</li>
          </ul>
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>4. Intellectual Property</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          SmurfRank is an independent marketplace and is not affiliated, endorsed, or partnered with Valve Corporation, Riot Games, Rockstar Games, or any other game developer. All game titles, trademarks, and registered trademarks belong to their respective owners.
        </p>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '1rem', marginTop: '2rem' }}>5. User Responsibilities</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          You agree to use our services only for lawful purposes. After purchasing an account, it is solely your responsibility to secure it by changing passwords and linking your own email address. We are not liable for account loss resulting from poor security practices post-purchase.
        </p>
      </div>
    </div>
  );
}
