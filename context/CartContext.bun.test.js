import { mock, expect, test, describe } from "bun:test";

let states = [];
let stateIndex = 0;
let memoizedDeps = null;
let memoizedVal = null;

const mockUseState = (initial) => {
  const i = stateIndex++;
  if (states[i] === undefined) states[i] = initial;
  const setVal = (newVal) => {
    if (typeof newVal === 'function') states[i] = newVal(states[i]);
    else states[i] = newVal;
  };
  return [states[i], setVal];
};

const mockUseMemo = (factory, deps) => {
  if (!memoizedDeps || deps.some((dep, i) => dep !== memoizedDeps[i])) {
      memoizedVal = factory();
      memoizedDeps = deps;
  }
  return memoizedVal;
};

mock.module("react", () => ({
  createContext: () => ({ Provider: ({ value, children }) => ({ type: 'Provider', props: { value, children } }) }),
  useContext: () => ({}),
  useState: mockUseState,
  useMemo: mockUseMemo
}));

mock.module("react/jsx-dev-runtime", () => ({
    jsxDEV: (type, props, key, isStaticChildren, source, self) => ({ type, props })
}));

describe("CartContext Logic", () => {
  test("full cart lifecycle with quantities", async () => {
    const { CartProvider } = await import("./CartContext.js");

    states = [];
    stateIndex = 0;
    memoizedDeps = null;
    memoizedVal = null;

    const render = () => {
      stateIndex = 0;
      return CartProvider({children: null}).props.value;
    };

    let contextValue = render();

    // 1. Initial State
    expect(contextValue.cart).toEqual([]);
    expect(contextValue.isOpen).toBe(false);
    expect(contextValue.total).toBe(0);

    // 2. Add to Cart (New item)
    contextValue.addToCart({ id: 1, price: "$10.00", title: "Product 1" });
    contextValue = render();

    expect(contextValue.cart).toEqual([{ id: 1, price: "$10.00", title: "Product 1", quantity: 1 }]);
    expect(contextValue.isOpen).toBe(true);
    expect(contextValue.total).toBe(10);

    // 3. Add to Cart (Existing item - increment quantity)
    contextValue.addToCart({ id: 1, price: "$10.00", title: "Product 1" });
    contextValue = render();
    expect(contextValue.cart).toEqual([{ id: 1, price: "$10.00", title: "Product 1", quantity: 2 }]);
    expect(contextValue.total).toBe(20);

    // 4. Add another item
    contextValue.addToCart({ id: 2, price: "$15.50", title: "Product 2" });
    contextValue = render();
    expect(contextValue.cart.length).toBe(2);
    expect(contextValue.total).toBe(35.5);

    // 5. Increase Quantity
    contextValue.increaseQuantity(1); // Increase Product 2
    contextValue = render();
    expect(contextValue.cart[1].quantity).toBe(2);
    expect(contextValue.total).toBe(51.0); // 20 + 31

    // 6. Decrease Quantity
    contextValue.decreaseQuantity(1); // Decrease Product 2
    contextValue = render();
    expect(contextValue.cart[1].quantity).toBe(1);
    expect(contextValue.total).toBe(35.5);

    // 7. Decrease Quantity to 0 (Removes item)
    contextValue.decreaseQuantity(1); // Decrease Product 2 again
    contextValue = render();
    expect(contextValue.cart.length).toBe(1);
    expect(contextValue.cart[0].title).toBe("Product 1");
    expect(contextValue.total).toBe(20);

    // 8. Remove item explicitly
    contextValue.removeFromCart(0);
    contextValue = render();
    expect(contextValue.cart).toEqual([]);
    expect(contextValue.total).toBe(0);

    // 9. Toggling
    contextValue.setIsOpen(false);
    contextValue = render();
    expect(contextValue.isOpen).toBe(false);
  });
});
