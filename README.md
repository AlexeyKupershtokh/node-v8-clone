node-v8-clone
=============
[![Build Status](https://secure.travis-ci.org/AlexeyKupershtokh/node-v8-clone.png?branch=master)](https://travis-ci.org/AlexeyKupershtokh/node-v8-clone)

It's a c++ addon for node.js that does the most accurate cloning for node.js.
It's also very fast in some cases (benchmarks inside).

Installation:
=============
Tested on node.js versions 0.4, 0.6. 0.8 and 0.9.
You may be asked to install `make` and `g++` as well.
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
obj1 for in                   x   828,849 ops/sec ±0.45% (97 runs sampled)
obj1 for in hasOwnProperty    x   584,575 ops/sec ±1.12% (92 runs sampled)
obj1 for Object.keys          x 1,074,931 ops/sec ±0.46% (100 runs sampled)
obj1 lodash _.clone           x   383,463 ops/sec ±0.68% (94 runs sampled)
obj1 node-v8-clone cloner     x 5,503,537 ops/sec ±0.61% (93 runs sampled)


obj2 = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
obj2 for in                   x   553,909 ops/sec ±0.63% (90 runs sampled)
obj2 for in hasOwnProperty    x   404,802 ops/sec ±0.42% (97 runs sampled)
obj2 for Object.keys          x 1,031,865 ops/sec ±0.67% (90 runs sampled)
obj2 lodash _.clone           x   419,223 ops/sec ±0.50% (95 runs sampled)
obj2 node-v8-clone cloner     x 4,560,158 ops/sec ±0.93% (92 runs sampled)

obj3 = {_0: '_0', _1: '_1', ..., _999: '_999' }
obj3 for in                   x     1,701 ops/sec ±0.59% (98 runs sampled)
obj3 for in hasOwnProperty    x     1,428 ops/sec ±0.62% (94 runs sampled)
obj3 for Object.keys          x     4,863 ops/sec ±0.59% (93 runs sampled)
obj3 lodash _.clone           x     2,136 ops/sec ±0.65% (97 runs sampled)
obj3 node-v8-clone cloner     x    40,657 ops/sec ±1.16% (92 runs sampled)

obj4 = {0: 0, 1: 1, 2: 2, ..., 998: 998, 999: 999 }
obj4 for in                   x     4,332 ops/sec ±0.53% (100 runs sampled)
obj4 for in hasOwnProperty    x     2,477 ops/sec ±0.58% (93 runs sampled)
obj4 for Object.keys          x    13,546 ops/sec ±0.61% (92 runs sampled)
obj4 lodash _.clone           x     5,905 ops/sec ±0.61% (98 runs sampled)
obj4 node-v8-clone cloner     x   372,176 ops/sec ±0.74% (93 runs sampled)
```
Array shallow cloning:
```
arr1 = [1, 2, 3, 4, 5]
arr1 slice()                 x  9,171,117 ops/sec ±0.71% (89 runs sampled)
arr1 []       for i < l i++  x  7,521,757 ops/sec ±0.79% (93 runs sampled)
arr1 Array(l) for i < l i++  x 19,521,981 ops/sec ±1.65% (81 runs sampled)
arr1 for in                  x    843,917 ops/sec ±0.61% (96 runs sampled)
arr1 for in hasOwnProperty   x    553,712 ops/sec ±0.47% (99 runs sampled)
arr1 lodash _.clone          x  1,826,144 ops/sec ±0.72% (96 runs sampled)
arr1 node-v8-clone cloner    x  5,541,714 ops/sec ±0.54% (91 runs sampled)

arr2 = [0, 1, 2, ..., 998, 999]
arr2 slice()                 x    534,954 ops/sec ±0.39% (91 runs sampled)
arr2 []       for i < l i++  x     88,164 ops/sec ±0.59% (85 runs sampled)
arr2 Array(l) for i < l i++  x    201,974 ops/sec ±0.76% (95 runs sampled)
arr2 for in                  x      8,666 ops/sec ±0.61% (95 runs sampled)
arr2 for in hasOwnProperty   x      4,123 ops/sec ±0.47% (101 runs sampled)
arr2 lodash _.clone          x    157,718 ops/sec ±0.55% (83 runs sampled)
arr2 node-v8-clone cloner    x    552,515 ops/sec ±0.24% (81 runs sampled)
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