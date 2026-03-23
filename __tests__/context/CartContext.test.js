import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';

describe('CartContext Total Calculation', () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

  it('should calculate total as 0 for an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.total).toBe(0);
  });

  it('should calculate total correctly for a single item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ price: '$10.00' });
    });

    expect(result.current.total).toBe(10);
  });

  it('should calculate total correctly for multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ price: '$10.00' });
      result.current.addToCart({ price: '$20.50' });
      result.current.addToCart({ price: '$5.00' });
    });

    expect(result.current.total).toBe(35.50);
  });

  it('should calculate total correctly after removing an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ price: '$10.00' });
      result.current.addToCart({ price: '$20.50' });
      result.current.addToCart({ price: '$5.00' });
    });

    expect(result.current.total).toBe(35.50);

    act(() => {
      result.current.removeFromCart(1); // Remove the '$20.50' item
    });

    expect(result.current.total).toBe(15.00);
  });

  it('should handle prices without the dollar sign correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ price: '15.00' });
      result.current.addToCart({ price: '25.50' });
    });

    expect(result.current.total).toBe(40.50);
  });
});
