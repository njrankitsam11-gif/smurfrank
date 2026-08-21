'use client';
import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center text-ink-50">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(255,70,85,0.08), transparent 55%)' }}
      />
      <div className="relative">
        <p className="text-5xl" aria-hidden="true">⚠️</p>
        <h1 className="font-display mt-4 text-2xl font-bold">Something went wrong.</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-ink-300">
          Our team has been notified. Try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="focus-ring rounded-lg bg-gold-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-gold transition-colors hover:bg-gold-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="focus-ring rounded-lg border border-ink-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink-50 transition-colors hover:border-gold-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
