import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | SmurfRank',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center text-ink-50">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,197,49,0.08), transparent 55%)' }}
      />
      <div className="relative">
        <p className="font-display text-8xl font-bold text-gold-400">404</p>
        <h1 className="font-display mt-4 text-2xl font-bold">This account went missing.</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink-300">
          The page you're looking for doesn't exist or has been moved. Let's get you back to browsing.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="focus-ring rounded-lg bg-gold-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-gold transition-colors hover:bg-gold-300"
          >
            Back to Home
          </Link>
          <Link
            href="/search"
            className="focus-ring rounded-lg border border-ink-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-50 transition-colors hover:border-gold-400"
          >
            Search Accounts
          </Link>
        </div>
      </div>
    </main>
  );
}
