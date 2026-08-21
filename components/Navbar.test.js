/* @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import { useCart } from '../context/CartContext';
import { useSession } from 'next-auth/react';

jest.mock('../context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, style, className }) => (
    <a href={href} style={style} className={className}>{children}</a>
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

    useSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
  });

  it('renders logo and navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('SMURF')).toBeInTheDocument();
    expect(screen.getByText('RANK')).toBeInTheDocument();

    expect(screen.getAllByText('CS2')[0]).toHaveAttribute('href', '/cs2');
    expect(screen.getAllByText('Valorant')[0]).toHaveAttribute('href', '/valorant');
    expect(screen.getAllByText('GTA V')[0]).toHaveAttribute('href', '/gta-v');
    expect(screen.getAllByText('Boosting')[0]).toHaveAttribute('href', '/boosting');
    expect(screen.getAllByText('Sell')[0]).toHaveAttribute('href', '/sell');
    expect(screen.getAllByText('Sign In')[0]).toHaveAttribute('href', '/login');
  });

  it('shows a cart badge with the item count when the cart has items', () => {
    useCart.mockReturnValue({
      cart: [{ id: 1 }, { id: 2 }, { id: 3 }],
      setIsOpen: mockSetIsOpen,
    });

    render(<Navbar />);

    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
  });

  it('renders no cart badge when the cart is empty', () => {
    render(<Navbar />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('calls setIsOpen when the cart button is clicked', () => {
    render(<Navbar />);

    const cartButtons = screen.getAllByText('Cart');
    fireEvent.click(cartButtons[0]);

    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
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

  it('shows sign out and hides sign in when authenticated', () => {
    useSession.mockReturnValue({
      data: { user: { email: 'gamer@example.com' } },
      status: 'authenticated',
    });

    render(<Navbar />);

    expect(screen.getByText('gamer@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});
