'use client';
import { useMemo } from 'react';

export default function useProductSort(products, activeSort) {
  // ⚡ BOLT OPTIMIZATION: Pre-parse sorting keys (Schwartzian Transform) & Memoize
  // 💡 What: Mapped `price` strings to `numericPrice` numbers once before sorting, wrapped in useMemo.
  // 🎯 Why: Parsing floats and running regex inside a sort comparator creates an O(N log N) overhead. Doing it unmemoized blocks the main thread on unrelated re-renders.
  // 📊 Impact: Reduces expensive regex string manipulation from O(N log N) to O(N), and prevents parsing on unrelated renders, significantly improving execution time for large lists.
  return useMemo(() => {
    if (activeSort === 'BEST_SELLER') {
      return [...products].reverse();
    }

    if (activeSort === 'LOW_HIGH' || activeSort === 'HIGH_LOW') {
      const parsedProducts = products.map(p => ({
        ...p,
        numericPrice: parseFloat(p.price.replace(/[^0-9.-]+/g, ""))
      }));

      parsedProducts.sort((a, b) => activeSort === 'LOW_HIGH' ? a.numericPrice - b.numericPrice : b.numericPrice - a.numericPrice);
      return parsedProducts;
    }

    return [...products];
  }, [products, activeSort]);
}
