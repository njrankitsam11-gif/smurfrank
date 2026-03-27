const { performance } = require('perf_hooks');

// Mock data
const cart = Array.from({ length: 100000 }, (_, i) => ({ price: `$${(Math.random() * 100).toFixed(2)}` }));

// Baseline: unmemoized
function calcTotalBaseline(cart) {
  return cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
}

// Optimization: memoized (simulated by not calling it on re-render)
let memoizedTotal = null;
function calcTotalMemoized(cart, cartChanged) {
  if (cartChanged || memoizedTotal === null) {
    memoizedTotal = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
  }
  return memoizedTotal;
}

const iterations = 100;

let start = performance.now();
for (let i = 0; i < iterations; i++) {
  calcTotalBaseline(cart);
}
let end = performance.now();
const baselineTime = end - start;
console.log(`Baseline time (100 renders): ${baselineTime.toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < iterations; i++) {
  // cart has not changed
  calcTotalMemoized(cart, false);
}
end = performance.now();
const optimizedTime = end - start;
console.log(`Optimized time (100 renders without cart change): ${optimizedTime.toFixed(2)}ms`);
console.log(`Improvement: ${((baselineTime - optimizedTime) / baselineTime * 100).toFixed(2)}%`);
