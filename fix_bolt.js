const fs = require('fs');
let content = fs.readFileSync('.jules/bolt.md', 'utf8');

const entry = `## 2025-05-14 - Pre-parsing sorting keys to optimize sort performance
**Learning:** Performing expensive operations like regex matching and string parsing inside a sort comparator function results in O(N log N) overhead, which can be significant for larger datasets. Pre-calculating these values once (O(N)) before sorting reduces the comparator to simple numeric subtraction.
**Action:** Always pre-calculate or memoize complex sort keys before invoking .sort() to ensure the comparator remains O(1) and the overall sort operation stays efficient.`;

// Replace all occurrences of the duplicated entry with a single one at the end
let newContent = content;
while(newContent.indexOf(entry) !== newContent.lastIndexOf(entry)) {
    newContent = newContent.replace(entry, '');
}

// Clean up any stray newlines left by the replacement
newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('.jules/bolt.md', newContent);
