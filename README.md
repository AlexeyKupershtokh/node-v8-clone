node-v8-clone
=============
[![Build Status](https://secure.travis-ci.org/AlexeyKupershtokh/node-v8-clone.png?branch=master)](https://travis-ci.org/AlexeyKupershtokh/node-v8-clone)

Expose v8 shallow clone function for node.js.

Benchmark results
=================
Object cloning:
```
obj1 = {a: 'a', b: 'b', c: 'c', d: 'd', e: 'e'}
obj1 for in                x    554,737 ops/sec ±1.35% (80 runs sampled)
obj1 for in hasOwnProperty x    390,519 ops/sec ±1.46% (93 runs sampled)
obj1 node-v8-clone cloner  x  4,818,032 ops/sec ±1.81% (88 runs sampled)

obj2 = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
obj2 for in                x    422,927 ops/sec ±1.21% (90 runs sampled)
obj2 for in hasOwnProperty x    299,434 ops/sec ±0.97% (91 runs sampled)
obj2 node-v8-clone cloner  x  3,922,297 ops/sec ±0.97% (89 runs sampled)

obj3 = {_0: '_0', _1: '_1', ..., _999: '_999' }
obj3 for in                x      1,277 ops/sec ±1.02% (93 runs sampled)
obj3 for in hasOwnProperty x      1,091 ops/sec ±1.25% (89 runs sampled)
obj3 node-v8-clone cloner  x     19,278 ops/sec ±0.77% (86 runs sampled)

obj4 = {0: 0, 1: 1, 2: 2, ..., 998: 998, 999: 999 }
obj4 for in                x      3,493 ops/sec ±0.94% (89 runs sampled)
obj4 for in hasOwnProperty x      1,854 ops/sec ±1.12% (86 runs sampled)
obj4 node-v8-clone cloner  x    175,836 ops/sec ±0.59% (93 runs sampled)
```
Array cloning:
```
arr1 = [1, 2, 3, 4, 5]
arr1 []       for i < l i++ x  4,967,530 ops/sec ±1.20% (88 runs sampled)
arr1 Array(l) for i < l i++ x 14,920,448 ops/sec ±1.66% (84 runs sampled)
arr1 for in                 x    639,140 ops/sec ±1.08% (91 runs sampled)
arr1 for in hasOwnProperty  x    430,562 ops/sec ±1.21% (90 runs sampled)
arr1 node-v8-clone cloner   x  4,905,732 ops/sec ±1.11% (89 runs sampled)

arr2 = [0, 1, 2, ..., 998, 999]
arr2 []       for i < l i++ x     70,299 ops/sec ±1.25% (88 runs sampled)
arr2 Array(l) for i < l i++ x    126,915 ops/sec ±1.05% (82 runs sampled)
arr2 for in                 x      6,528 ops/sec ±1.06% (87 runs sampled)
arr2 for in hasOwnProperty  x      3,103 ops/sec ±0.83% (89 runs sampled)
arr2 node-v8-clone cloner   x    224,291 ops/sec ±0.99% (93 runs sampled)

```
RegExp cloning:
```
RegExp new RegExp(re.source, /w*$/.exec(re))     x   603,999 ops/sec ±0.88% (92 runs sampled)
RegExp new RegExp(re.source, "g"? + "i"? + "m"?) x 2,721,745 ops/sec ±1.04% (92 runs sampled)
RegExp node-v8-clone cloner                      x 4,881,923 ops/sec ±0.90% (85 runs sampled)
```
Date cloning:
```
date new Date(+date) cloner x 3,228,313 ops/sec ±1.18% (91 runs sampled)
date node-v8-clone cloner   x 4,790,220 ops/sec ±0.87% (88 runs sampled)
```