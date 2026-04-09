
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

import { expect, test, describe, mock, beforeEach } from "bun:test";
import CartDrawer from "./CartDrawer";

// Mock the dependency before importing component
mock.module("../context/CartContext", () => {
    return {
        useCart: mock()
    };
});

const { useCart } = await import("../context/CartContext");

describe("CartDrawer Component", () => {
    beforeEach(() => {
        useCart.mockReset();
    });

    test("returns null when isOpen is false", () => {
        useCart.mockReturnValue({
            isOpen: false,
            cart: [],
            total: 0,
            setIsOpen: () => {},
            removeFromCart: () => {}
        });

        const result = CartDrawer();
        expect(result).toBeNull();
    });

    test("renders correctly when isOpen is true and cart is empty", () => {
        useCart.mockReturnValue({
            isOpen: true,
            cart: [],
            total: 0,
            setIsOpen: () => {},
            removeFromCart: () => {}
        });

        const result = CartDrawer();
        expect(result).not.toBeNull();
        expect(result.type).toBe('div');

        const treeStr = JSON.stringify(result, getCircularReplacer());
        expect(treeStr).toContain("YOUR ");
        expect(treeStr).toContain("CART");
        expect(treeStr).toContain("Empty.");
        expect(treeStr).toContain("0.00"); // It renders as ["$", "0.00"]
    });

    test("renders items and handles interactions when cart has items", () => {
        const mockRemoveFromCart = mock();
        const mockSetIsOpen = mock();

        useCart.mockReturnValue({
            isOpen: true,
            cart: [{
                title: "Test Product",
                price: "$10.00"
            }],
            total: 10,
            setIsOpen: mockSetIsOpen,
            removeFromCart: mockRemoveFromCart
        });

        const result = CartDrawer();
        const treeStr = JSON.stringify(result, getCircularReplacer());

        expect(treeStr).toContain("Test Product");
        expect(treeStr).toContain("10.00"); // formatted item price 10.00 * 1
        expect(treeStr).toContain("LOYALTY REWARD ACTIVATED"); // Magnet hook is visible

        // Find click handlers from JSON to test them without complex testing-library DOM mounts
        // We know the structure has "aria-label": "Close cart" and "Remove Test Product from cart"

        let removeButtonOnClick;
        let closeButtonOnClick;

        const traverseNodes = (node) => {
            if (!node || typeof node !== 'object') return;

            if (node.type === 'button') {
                const ariaLabel = node.props && node.props['aria-label'];
                if (ariaLabel === 'Remove Test Product from cart') {
                    removeButtonOnClick = node.props.onClick;
                } else if (ariaLabel === 'Close cart') {
                    closeButtonOnClick = node.props.onClick;
                }
            }

            if (node.props && node.props.children) {
                if (Array.isArray(node.props.children)) {
                    node.props.children.forEach(traverseNodes);
                } else {
                    traverseNodes(node.props.children);
                }
            }
        };

        traverseNodes(result);

        expect(removeButtonOnClick).toBeDefined();
        expect(closeButtonOnClick).toBeDefined();

        // Trigger the onClick handlers manually to verify they call context functions
        if (removeButtonOnClick) removeButtonOnClick();
        expect(mockRemoveFromCart).toHaveBeenCalledWith(0);

        if (closeButtonOnClick) closeButtonOnClick();
        expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    });
});
