/* @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';

jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, style }) => (
    <a href={href} style={style}>{children}</a>
  ),
}));

describe('Navbar Component', () => {
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useCart.mockReturnValue({
      cart: [],
      setIsOpen: mockSetIsOpen,
    });
  });

  it('renders logo and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('SMURF')).toBeInTheDocument();
    expect(screen.getByText('RANK')).toBeInTheDocument();

    expect(screen.getByText('CS2')).toHaveAttribute('href', '/cs2');
    expect(screen.getByText('VAL')).toHaveAttribute('href', '/valorant');
    expect(screen.getByText('GTA V')).toHaveAttribute('href', '/gta-v');
    expect(screen.getByText('BOOSTING')).toHaveAttribute('href', '/boosting');
    expect(screen.getByText('SELL')).toHaveAttribute('href', '/sell');
    expect(screen.getByText('SIGN IN')).toHaveAttribute('href', '/login');
  });

  it('renders cart button with correct count', () => {
    useCart.mockReturnValue({
      cart: [{ id: 1 }, { id: 2 }, { id: 3 }],
      setIsOpen: mockSetIsOpen,
    });

    render(<Navbar />);

    const cartButton = screen.getByText('CART (3)');
    expect(cartButton).toBeInTheDocument();
  });

  it('calls setIsOpen when cart button is clicked', () => {
    render(<Navbar />);

    const cartButton = screen.getByText('CART (0)');
    fireEvent.click(cartButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
    expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
  });

  it('displays loading state initially', () => {
    jest.useFakeTimers();
    render(<Navbar />);

    expect(screen.getByText('LOADING RECENT SALES...')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('displays live feed after mounting', async () => {
    render(<Navbar />);

    const liveText = await screen.findByText(/LIVE: USER_\d+ PURCHASED/);
    expect(liveText).toBeInTheDocument();
  });
});
