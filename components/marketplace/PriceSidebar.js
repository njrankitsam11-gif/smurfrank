import Accordion, { AccordionItem } from '../ui/Accordion';

const CHECKLIST = [
  'Full account access, original email included',
  'Protected by our money-back guarantee',
  'Verified & hand-checked by our team before listing',
];

export default function PriceSidebar({ price, children }) {
  return (
    <div className="sticky top-24 flex flex-col gap-5">
      <div className="rounded-2xl border border-ink-600 bg-ink-800/70 p-7">
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-ink-300">Buy Now For</div>
        <div className="mb-6 font-display text-5xl font-bold text-gold-400">${Number(price).toFixed(2)}</div>

        {children}

        <div className="mt-6 flex flex-col gap-3">
          {CHECKLIST.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-ink-200">
              <span className="mt-0.5 text-gold-400">✔</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <Accordion>
        <AccordionItem title="How we protect your purchase">
          Every account is sourced and verified by our own team, never a third-party seller. If
          anything is wrong with your delivery, our 24/7 support resolves it or refunds you under
          our money-back guarantee.
        </AccordionItem>
        <AccordionItem title="Delivery & access">
          Login details are delivered instantly to your account email after checkout — no waiting
          on a seller to come online.
        </AccordionItem>
      </Accordion>
    </div>
  );
}
