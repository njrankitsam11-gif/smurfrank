import { useMemo } from 'react';

export function useProductSort(products, activeSort) {
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
