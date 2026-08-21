export const metadata = {
  title: 'Order Successful | SmurfRank',
  robots: { index: false, follow: false }, // A++ SEO: Tell Google NOT to show this page in search
};

import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-6 text-ink-50">
      <div className="max-w-md rounded-2xl border border-ink-600 bg-ink-800/60 p-10 text-center">
        <div className="mb-5 text-6xl" aria-hidden="true">✅</div>
        <h1 className="font-display text-3xl font-bold">
          Order <span className="text-gold-400">Confirmed</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-200">
          Thank you for your purchase! Your payment is protected by our money-back guarantee.
          Account credentials have been sent to your registered email address.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="focus-ring rounded-lg bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-wide text-ink-950 shadow-gold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
