import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CS2Page from '../../../app/cs2/page';
import { useCart } from '../../../context/CartContext';

// Mock the useCart hook
jest.mock('../../../context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('CS2Page', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockAddToCart.mockClear();

    // Provide the mock implementation for useCart
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
    });
  });

  it('renders the page and product listings', () => {
    render(<CS2Page />);

    // Verify specific content on the page
    expect(screen.getByText('CS2')).toBeInTheDocument();
    expect(screen.getByText('GLOBAL ELITE PRIME')).toBeInTheDocument();
    expect(screen.getByText('SUPREME MASTER FIRST CLASS')).toBeInTheDocument();
    expect(screen.getByText('FACEIT LEVEL 10 READY')).toBeInTheDocument();
    expect(screen.getByText('2024 SERVICE MEDAL')).toBeInTheDocument();
  });

  it('calls addToCart with correct product when "ADD TO CART" button is clicked', () => {
    render(<CS2Page />);

    // Find all 'ADD TO CART' buttons
    const addToCartButtons = screen.getAllByRole('button', { name: /ADD TO CART/i });

    // Click the first button (which corresponds to 'GLOBAL ELITE PRIME')
    fireEvent.click(addToCartButtons[0]);

    // Verify that addToCart was called exactly once with the correct product object
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 'cs1',
      title: 'GLOBAL ELITE PRIME',
      price: '$45.00',
      desc: '10 Year Coin • Full Access',
      game: 'CS2'
    });
  });

  it('calls addToCart with correct product for another item', () => {
    render(<CS2Page />);

    const addToCartButtons = screen.getAllByRole('button', { name: /ADD TO CART/i });

    // Click the third button ('FACEIT LEVEL 10 READY')
    fireEvent.click(addToCartButtons[2]);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 'cs3',
      title: 'FACEIT LEVEL 10 READY',
      price: '$65.00',
      desc: 'Low Matches • High Elo',
      game: 'CS2'
    });
  });
});
