node-v8-clone
=============
[![Build Status](https://secure.travis-ci.org/AlexeyKupershtokh/node-v8-clone.png?branch=master)](https://travis-ci.org/AlexeyKupershtokh/node-v8-clone)

It's a c++ addon for node.js that does the most accurate cloning for node.js.
It's also very fast in some cases (benchmarks inside).

Installation:
=============
Tested on node.js versions 0.4, 0.6. 0.8 and 0.9.
```
npm install node-v8-clone
```

Usage:
======
```javascript
var clone = require('node-v8-clone').clone;
var a = { x: { y: {} } };

// deep clone
var b = clone(a, true);
a === b // false
a.x === b.x // false
a.x.y === b.x.y // false

// shallow clone
var c = clone(a, false);
a === c // false
a.x === c.x // true
a.x.y === c.x.y // true
```

Benchmark results
=================
Object shallow cloning:
```
obj1 = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'}
obj1 for in                   x    810,922 ops/sec ±1.31% (88 runs sampled)
obj1 for in hasOwnProperty    x    572,086 ops/sec ±0.94% (91 runs sampled)
obj1 lodash _.clone           x    364,218 ops/sec ±0.91% (89 runs sampled)
obj1 node-v8-clone js cloner  x  5,230,347 ops/sec ±2.01% (91 runs sampled)

obj2 = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
obj2 for in                   x   493,469 ops/sec ±1.79% (86 runs sampled)
obj2 for in hasOwnProperty    x   385,693 ops/sec ±1.53% (86 runs sampled)
obj2 lodash _.clone           x   400,466 ops/sec ±2.88% (92 runs sampled)
obj2 node-v8-clone js cloner  x 3,676,889 ops/sec ±2.58% (88 runs sampled)

obj3 = {_0: '_0', _1: '_1', ..., _999: '_999' }
obj3 for in                   x     1,542 ops/sec ±2.34% (84 runs sampled)
obj3 for in hasOwnProperty    x       940 ops/sec ±1.26% (91 runs sampled)
obj3 lodash _.clone           x     2,112 ops/sec ±1.12% (93 runs sampled)
obj3 node-v8-clone js cloner  x    40,405 ops/sec ±2.58% (94 runs sampled)

obj4 = {0: 0, 1: 1, 2: 2, ..., 998: 998, 999: 999 }
obj4 for in                   x     4,431 ops/sec ±2.43% (86 runs sampled)
obj4 for in hasOwnProperty    x     2,544 ops/sec ±1.62% (91 runs sampled)
obj4 lodash _.clone           x     5,407 ops/sec ±2.49% (82 runs sampled)
obj4 node-v8-clone js cloner  x   359,146 ops/sec ±2.70% (87 runs sampled)
```
Array shallow cloning:
```
arr1 = [1, 2, 3, 4, 5]
arr1 slice()                 x  8,230,013 ops/sec ±2.86% (91 runs sampled)
arr1 []       for i < l i++  x  7,816,764 ops/sec ±2.50% (82 runs sampled)
arr1 Array(l) for i < l i++  x 22,090,328 ops/sec ±1.36% (88 runs sampled)
arr1 for in                  x    816,995 ops/sec ±1.50% (91 runs sampled)
arr1 for in hasOwnProperty   x    499,472 ops/sec ±2.83% (87 runs sampled)
arr1 lodash _.clone          x  1,520,163 ops/sec ±1.76% (84 runs sampled)
arr1 node-v8-clone js cloner x  5,105,788 ops/sec ±2.07% (90 runs sampled)

arr2 = [0, 1, 2, ..., 998, 999]
arr2 slice()                 x    522,115 ops/sec ±0.93% (95 runs sampled)
arr2 []       for i < l i++  x    120,464 ops/sec ±1.55% (90 runs sampled)
arr2 Array(l) for i < l i++  x    269,733 ops/sec ±1.39% (91 runs sampled)
arr2 for in                  x      7,908 ops/sec ±1.91% (93 runs sampled)
arr2 for in hasOwnProperty   x      3,967 ops/sec ±0.92% (93 runs sampled)
arr2 lodash _.clone          x    413,365 ops/sec ±1.09% (93 runs sampled)
arr2 node-v8-clone js cloner x    493,603 ops/sec ±0.59% (94 runs sampled)
```
RegExp shallow cloning:
```
RegExp new RegExp(re.source, /\w*$/.exec(re))    x 1,004,526 ops/sec ±2.53% (91 runs sampled)
RegExp new RegExp(re.source, "g"? + "i"? + "m"?) x 3,550,976 ops/sec ±3.00% (90 runs sampled)
RegExp lodash _.clone                            x 1,119,311 ops/sec ±1.79% (85 runs sampled)
RegExp node-v8-clone js cloner                   x 5,000,977 ops/sec ±1.33% (94 runs sampled)
```
Date shallow cloning:
```
date new Date(+date) cloner x 2,657,488 ops/sec ±2.52% (87 runs sampled)
date lodash _.clone         x 1,185,187 ops/sec ±1.63% (93 runs sampled)
date node-v8-clone cloner   x 5,147,363 ops/sec ±0.98% (93 runs sampled)
```