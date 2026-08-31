/* @jest-environment jsdom */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slideshow from './Slideshow';

const IMAGES = [
  { src: '/images/cs2/one.webp', alt: 'First image', accent: '#F5A623' },
  { src: '/images/cs2/two.webp', alt: 'Second image', accent: '#F5A623' },
  { src: '/images/cs2/three.webp', alt: 'Third image', accent: '#F5A623' },
];

function mockMatchMedia(matches) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

describe('Slideshow', () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders one dot per image and marks the first as current', () => {
    render(<Slideshow images={IMAGES} ariaLabel="Test art" />);

    const dots = screen.getAllByRole('button', { name: /Go to slide/ });
    expect(dots).toHaveLength(3);
    expect(dots[0]).toHaveAttribute('aria-current', 'true');
    expect(dots[1]).toHaveAttribute('aria-current', 'false');
  });

  it('clicking a dot jumps to that slide', () => {
    render(<Slideshow images={IMAGES} ariaLabel="Test art" />);

    fireEvent.click(screen.getByRole('button', { name: 'Go to slide 3' }));

    expect(screen.getByText(/Showing 3 of 3/)).toBeInTheDocument();
  });

  it('next/prev arrows advance and reverse the slide', () => {
    render(<Slideshow images={IMAGES} ariaLabel="Test art" />);

    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByText(/Showing 2 of 3/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByText(/Showing 1 of 3/)).toBeInTheDocument();
  });

  it('auto-advances on an interval', () => {
    jest.useFakeTimers();
    render(<Slideshow images={IMAGES} intervalMs={1000} ariaLabel="Test art" />);

    expect(screen.getByText(/Showing 1 of 3/)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Showing 2 of 3/)).toBeInTheDocument();
  });

  it('does not auto-advance when prefers-reduced-motion is set', () => {
    mockMatchMedia(true);
    jest.useFakeTimers();
    render(<Slideshow images={IMAGES} intervalMs={1000} ariaLabel="Test art" />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText(/Showing 1 of 3/)).toBeInTheDocument();
  });

  it('pauses auto-advance while hovered', () => {
    jest.useFakeTimers();
    render(<Slideshow images={IMAGES} intervalMs={1000} ariaLabel="Test art" />);

    fireEvent.mouseEnter(screen.getByRole('region', { name: 'Test art' }));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/Showing 1 of 3/)).toBeInTheDocument();
  });

  it('renders nothing when given no images', () => {
    const { container } = render(<Slideshow images={[]} ariaLabel="Test art" />);
    expect(container).toBeEmptyDOMElement();
  });
});
