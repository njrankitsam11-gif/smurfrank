const fs = require('fs');
const file = 'context/CartContext.bun.test.js';
let content = fs.readFileSync(file, 'utf8');
const search = `  const total = useMemo(() => cart.reduce((sum, item) => sum + parseFloat(item.price.replace('`;
const replace = `  const total = useMemo(() => cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * (item.quantity || 1), 0), [cart]);`;
content = content.replace(search, replace);
fs.writeFileSync(file, content);
