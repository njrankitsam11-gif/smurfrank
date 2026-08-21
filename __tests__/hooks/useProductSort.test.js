/* @jest-environment jsdom */
import { renderHook } from '@testing-library/react';
import { useProductSort } from '../../hooks/useProductSort';
import React from 'react';

const products = [
  { id: '1', title: 'A', price: 10 },
  { id: '2', title: 'B', price: 5 },
  { id: '3', title: 'C', price: 20 },
];

describe('useProductSort', () => {
  it('should return products as is for TOP_RATED', () => {
    const { result } = renderHook(() => useProductSort(products, 'TOP_RATED'));
    expect(result.current).toEqual(products);
  });

  it('should sort products LOW_HIGH', () => {
    const { result } = renderHook(() => useProductSort(products, 'LOW_HIGH'));
    expect(result.current[0].price).toBe(5);
    expect(result.current[1].price).toBe(10);
    expect(result.current[2].price).toBe(20);
  });

  it('should sort products HIGH_LOW', () => {
    const { result } = renderHook(() => useProductSort(products, 'HIGH_LOW'));
    expect(result.current[0].price).toBe(20);
    expect(result.current[1].price).toBe(10);
    expect(result.current[2].price).toBe(5);
  });

  it('should reverse products for BEST_SELLER', () => {
    const { result } = renderHook(() => useProductSort(products, 'BEST_SELLER'));
    expect(result.current[0].id).toBe('3');
    expect(result.current[2].id).toBe('1');
  });
});
