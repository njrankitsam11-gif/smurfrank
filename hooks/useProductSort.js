import { useMemo } from 'react';

export function useProductSort(listings, activeSort) {
  return useMemo(() => {
    if (activeSort === 'BEST_SELLER') {
      return [...listings].reverse();
    }

    if (activeSort === 'LOW_HIGH' || activeSort === 'HIGH_LOW') {
      const sorted = [...listings].sort((a, b) =>
        activeSort === 'LOW_HIGH' ? a.price - b.price : b.price - a.price
      );
      return sorted;
    }

    return listings;
  }, [listings, activeSort]);
}
