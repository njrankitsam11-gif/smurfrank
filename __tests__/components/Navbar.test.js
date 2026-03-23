import { render, screen, act } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';

// Mock the useCart hook
jest.mock('../../context/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock react to control useEffect
jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useEffect: jest.fn(),
  };
});

describe('Navbar', () => {
  beforeEach(() => {
    // Default mock implementation
    useCart.mockReturnValue({
      cart: [],
      setIsOpen: jest.fn(),
    });
    // Call the actual useEffect by default
    const actualReact = jest.requireActual('react');
    jest.spyOn(require('react'), 'useEffect').mockImplementation(actualReact.useEffect);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Prevent useEffect from running so we stay in the initial unmounted state
    require('react').useEffect.mockImplementationOnce(() => {});

    render(<Navbar />);
    expect(screen.getByText('LOADING RECENT SALES...')).toBeInTheDocument();
  });

  it('renders live feed after mounting', () => {
    // Allow actual useEffect to run
    render(<Navbar />);

    // The effect runs after initial render, updating the state to mounted
    // We can check if the specific LIVE text is in the document
    expect(screen.getByText(/LIVE: USER_/i)).toBeInTheDocument();

    // The loading text should no longer be present
    expect(screen.queryByText('LOADING RECENT SALES...')).not.toBeInTheDocument();
  });
});
