// The file requires JSX transpilation, so let's mock the component logic instead, just like the bun test does.
function CreateCartProviderLogic(useState, trackCalculations) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulate unmemoized total:
  trackCalculations();
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);

  return { cart, addToCart, removeFromCart, isOpen, setIsOpen, total };
}

function CreateMemoizedCartProviderLogic(useState, useMemo, trackCalculations) {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addToCart = (product) => {
      setCart((prev) => [...prev, product]);
      setIsOpen(true);
    };

    const removeFromCart = (index) => {
      setCart((prev) => prev.filter((_, i) => i !== index));
    };

    // Simulate memoized total:
    const total = useMemo(() => {
        trackCalculations();
        return cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    return { cart, addToCart, removeFromCart, isOpen, setIsOpen, total };
  }

const runBenchmark = (providerFactory, iterations) => {
    let stateIndex = 0;
    const states = [];

    const mockUseState = (initial) => {
      const i = stateIndex++;
      if (states[i] === undefined) states[i] = initial;
      const setVal = (newVal) => {
        if (typeof newVal === 'function') states[i] = newVal(states[i]);
        else states[i] = newVal;
      };
      return [states[i], setVal];
    };

    let memoizedDeps = null;
    let memoizedVal = null;

    const mockUseMemo = (factory, deps) => {
      if (!memoizedDeps || deps.some((dep, i) => dep !== memoizedDeps[i])) {
          memoizedVal = factory();
          memoizedDeps = deps;
      }
      return memoizedVal;
    };

    let calcCount = 0;
    const trackCalc = () => calcCount++;

    const render = () => {
        stateIndex = 0;
        return providerFactory(mockUseState, mockUseMemo, trackCalc);
    }

    const start = performance.now();
    let ctx = render();
    // Simulate some cart items
    for(let i=0; i<100; i++) {
        ctx.addToCart({ id: i, price: "$10.00", title: `Prod ${i}` });
        ctx = render();
    }

    // Now simulate toggling the cart open/close which shouldn't affect total
    for(let i=0; i < iterations; i++) {
        ctx.setIsOpen(i % 2 === 0);
        ctx = render();
    }
    const end = performance.now();

    return { time: end - start, calcCount };
};

const ITERATIONS = 10000;

console.log("Starting Context Performance Benchmark...\n");

const unmemoizedResult = runBenchmark((useState, _, track) => CreateCartProviderLogic(useState, track), ITERATIONS);
console.log(`Unmemoized Provider:`);
console.log(`- Time taken: ${unmemoizedResult.time.toFixed(2)}ms`);
console.log(`- Calculation iterations: ${unmemoizedResult.calcCount}\n`);

const memoizedResult = runBenchmark((useState, useMemo, track) => CreateMemoizedCartProviderLogic(useState, useMemo, track), ITERATIONS);
console.log(`Memoized Provider:`);
console.log(`- Time taken: ${memoizedResult.time.toFixed(2)}ms`);
console.log(`- Calculation iterations: ${memoizedResult.calcCount}\n`);

console.log("\nMemoized Improvement:");
const memoized = runBenchmark((uS, uM, t) => createMemoizedCartProviderLogic(uS, uM, t), iterations);
console.log(`Calculations: ${memoized.calculations}`);
console.log(`Time: ${memoized.time.toFixed(2)}ms`);

// --- Search Query Pagination Benchmark ---

const mockSearchFindManyUnbounded = () => {
    return Array.from({ length: 10000 }, (_, i) => ({ id: i, title: 'Test Account', game: 'Valorant', rank: 'Gold', price: 10 }));
};

const mockSearchFindManyPaginated = () => {
    return Array.from({ length: 12 }, (_, i) => ({ id: i, title: 'Test Account', game: 'Valorant', rank: 'Gold', price: 10 }));
};

const runPaginationBenchmark = () => {
    const trials = 1000;

    let start = performance.now();
    for(let i = 0; i < trials; i++) {
        mockSearchFindManyUnbounded();
    }
    let end = performance.now();
    const unboundedTime = end - start;

    start = performance.now();
    for(let i = 0; i < trials; i++) {
        mockSearchFindManyPaginated();
    }
    end = performance.now();
    const paginatedTime = end - start;

    console.log("\n--- Search Pagination Benchmark ---");
    console.log(`Unbounded array generation (10k items): ${unboundedTime.toFixed(2)}ms`);
    console.log(`Paginated array generation (12 items): ${paginatedTime.toFixed(2)}ms`);
    console.log(`Improvement: ${(((unboundedTime - paginatedTime) / unboundedTime) * 100).toFixed(2)}% faster memory allocation`);
};

runPaginationBenchmark();
