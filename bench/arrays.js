var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// array of 5 numeric elements
arr1 = [1, 2, 3, 4, 5];

// array of 1000 numeric elements
arr2 = [];
for (var i = 0; i < 1000; i++) {
  arr2.push(i);
}

// node-v8-clone js
clone = require('..').clone;
assert.deepEqual(arr1, clone(arr1));

// node-v8-clone
v8_clone = require('..').v8_clone;
assert.deepEqual(arr1, v8_clone(arr1));

// array 'for (var i = 0; i < l; i++)' cloner
arr_for = function(arr) { var result = []; for (var i = 0, l = arr.length; i < l; i++) result.push(arr[i]); return result; }
assert.deepEqual(arr1, arr_for(arr1));

// array 'for (var i = 0; i < l; i++)' cloner 2
arr_for2 = function(arr) { var l = arr.length, result = new Array(l); for (var i = 0; i < l; i++) result[i] = arr[i]; return result; }
assert.deepEqual(arr1, arr_for2(arr1));

// array 'for (i in arr)' cloner
arr_for_in = function(arr) { var result = []; for(var i in arr) result.push(arr[i]); return result; }
assert.deepEqual(arr1, arr_for_in(arr1));

// array 'for (i in arr) if (hasOwnProperty)' cloner
arr_for_in_has = function(arr) { var result = []; for(var i in arr) if (arr.hasOwnProperty(i)) result.push(arr[i]); return result; }
assert.deepEqual(arr1, arr_for_in_has(arr1));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('arr1 slice()                ', 'arr1.slice()');
suite.add('arr1 []       for i < l i++ ', 'arr_for(arr1)');
suite.add('arr1 Array(l) for i < l i++ ', 'arr_for2(arr1)');
suite.add('arr1 for in                 ', 'arr_for_in(arr1)');
suite.add('arr1 for in hasOwnProperty  ', 'arr_for_in_has(arr1)');
suite.add('arr1 lodash _.clone         ', '_.clone(arr1, false)');
suite.add('arr1 node-v8-clone js cloner', 'clone(arr1, false)');
suite.add('arr1 node-v8-clone cloner   ', 'v8_clone(arr1)');

suite.add('arr2 slice()                ', 'arr2.slice()');
suite.add('arr2 []       for i < l i++ ', 'arr_for(arr2)');
suite.add('arr2 Array(l) for i < l i++ ', 'arr_for2(arr2)');
suite.add('arr2 for in                 ', 'arr_for_in(arr2)');
suite.add('arr2 for in hasOwnProperty  ', 'arr_for_in_has(arr2)');
suite.add('arr2 lodash _.clone         ', '_.clone(arr2, false)');
suite.add('arr2 node-v8-clone js cloner', 'clone(arr2, false)');
suite.add('arr2 node-v8-clone cloner   ', 'v8_clone(arr2)');

suite.run({ 'async': true });