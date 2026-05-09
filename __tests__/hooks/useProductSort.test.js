/**
 * @jest-environment jsdom
 */

const { renderHook } = require('@testing-library/react');
const { useProductSort } = require('../../hooks/useProductSort');
import React from 'react';

// Simple mock for React.useMemo since we are in a node environment for Jest
// and we want to test the hook's logic.
// Actually, with @testing-library/react and jsdom it should work if configured correctly.

const products = [
  { id: '1', title: 'A', price: '$10.00' },
  { id: '2', title: 'B', price: '$5.00' },
  { id: '3', title: 'C', price: '$20.00' },
];

describe('useProductSort', () => {
  it('should return products as is for TOP_RATED', () => {
    const { result } = renderHook(() => useProductSort(products, 'TOP_RATED'));
    expect(result.current).toEqual(products);
  });

  it('should sort products LOW_HIGH', () => {
    const { result } = renderHook(() => useProductSort(products, 'LOW_HIGH'));
    expect(result.current[0].price).toBe('$5.00');
    expect(result.current[1].price).toBe('$10.00');
    expect(result.current[2].price).toBe('$20.00');
  });

  it('should sort products HIGH_LOW', () => {
    const { result } = renderHook(() => useProductSort(products, 'HIGH_LOW'));
    expect(result.current[0].price).toBe('$20.00');
    expect(result.current[1].price).toBe('$10.00');
    expect(result.current[2].price).toBe('$5.00');
  });

  it('should reverse products for BEST_SELLER', () => {
    const { result } = renderHook(() => useProductSort(products, 'BEST_SELLER'));
    expect(result.current[0].id).toBe('3');
    expect(result.current[2].id).toBe('1');
  });
});
