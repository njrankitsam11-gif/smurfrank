'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, total, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink-600 bg-ink-900 p-8 shadow-glow"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-ink-50">
                YOUR <span className="text-gold-400">CART</span>
              </h2>
              <button
                aria-label="Close cart"
                onClick={() => setIsOpen(false)}
                className="focus-ring text-2xl text-ink-200 hover:text-ink-50"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="mt-16 text-center text-sm text-ink-300">Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 border-b border-ink-700 py-5">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-ink-50">{item.title}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-md border border-ink-600 bg-ink-800 px-2 py-1">
                          <button
                            aria-label={`Decrease quantity of ${item.title}`}
                            onClick={() => decreaseQuantity(i)}
                            className="focus-ring px-1 text-sm text-gold-400"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-ink-100">{item.quantity}</span>
                          <button
                            aria-label={`Increase quantity of ${item.title}`}
                            onClick={() => increaseQuantity(i)}
                            className="focus-ring px-1 text-sm text-gold-400"
                          >
                            +
                          </button>
                        </div>
                        <button
                          aria-label={`Remove ${item.title} from cart`}
                          onClick={() => removeFromCart(i)}
                          className="focus-ring text-[10px] font-bold uppercase tracking-wide text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-ink-50">
                      ${(parseFloat(String(item.price).replace('$', '')) * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mb-6 rounded-xl border border-dashed border-gold-600/50 bg-gold-900/10 p-4">
                <p className="mb-1 text-xs font-bold text-gold-300">🔥 LOYALTY REWARD ACTIVATED</p>
                <p className="text-xs leading-relaxed text-ink-200">
                  Complete this order and get an <b>11% off coupon</b> for your next purchase, sent instantly by email.
                </p>
              </div>
            )}

            <div className="border-t border-ink-700 pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase tracking-wide text-ink-200">Subtotal</span>
                <span className="font-display text-2xl font-bold text-ink-50">${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="focus-ring block w-full rounded-lg bg-gold-400 py-4 text-center text-sm font-bold uppercase tracking-wide text-ink-950 shadow-gold transition-colors hover:bg-gold-300"
              >
                Proceed to Checkout →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
