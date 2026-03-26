import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartDrawer from '../../components/CartDrawer';
import { useCart } from '../../context/CartContext';

// Mock the useCart hook
jest.mock('../../context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CartDrawer', () => {
  const mockSetIsOpen = jest.fn();
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    useCart.mockReturnValue({
      cart: [],
      isOpen: false,
      setIsOpen: mockSetIsOpen,
      total: 0,
      removeFromCart: mockRemoveFromCart,
    });

    const { container } = render(<CartDrawer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders empty state when cart is empty and isOpen is true', () => {
    useCart.mockReturnValue({
      cart: [],
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 0,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartDrawer />);
    expect(screen.getByText('YOUR')).toBeInTheDocument();
    expect(screen.getByText('CART')).toBeInTheDocument();
    expect(screen.getByText('Empty.')).toBeInTheDocument();
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.queryByText('🔥 LOYALTY REWARD ACTIVATED')).not.toBeInTheDocument();
  });

  it('renders cart items correctly when cart has items', () => {
    const mockCart = [
      { title: 'Product 1', price: '$10.00' },
      { title: 'Product 2', price: '$20.00' },
    ];
    useCart.mockReturnValue({
      cart: mockCart,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 30,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartDrawer />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });

  it('displays loyalty reward text only when cart has items', () => {
    useCart.mockReturnValue({
      cart: [{ title: 'Product 1', price: '$10.00' }],
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 10,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartDrawer />);
    expect(screen.getByText('🔥 LOYALTY REWARD ACTIVATED')).toBeInTheDocument();
    expect(screen.getByText(/11% OFF coupon/)).toBeInTheDocument();
  });

  it('calls setIsOpen(false) when close button is clicked', () => {
    useCart.mockReturnValue({
      cart: [],
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 0,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartDrawer />);
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsOpen(false) when backdrop is clicked', () => {
    useCart.mockReturnValue({
      cart: [],
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 0,
      removeFromCart: mockRemoveFromCart,
    });

    // We can target the backdrop by grabbing the first child of the fixed container
    const { container } = render(<CartDrawer />);
    const backdrop = container.firstChild.firstChild; // The first child is the backdrop div
    fireEvent.click(backdrop);
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls removeFromCart when a remove button is clicked', () => {
    const mockCart = [
      { title: 'Product 1', price: '$10.00' },
      { title: 'Product 2', price: '$20.00' },
    ];
    useCart.mockReturnValue({
      cart: mockCart,
      isOpen: true,
      setIsOpen: mockSetIsOpen,
      total: 30,
      removeFromCart: mockRemoveFromCart,
    });

    render(<CartDrawer />);
    const removeButtons = screen.getAllByText('REMOVE');
    expect(removeButtons).toHaveLength(2);

    // Click remove on the second item (index 1)
    fireEvent.click(removeButtons[1]);
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });
});
