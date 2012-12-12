var assert = require('assert');
try { lodash = require('lodash'); } catch (e) {};
try { _ = require('underscore'); } catch (e) {};

shared = require('./shared.js');
arr1 = shared.arr1;
arr2 = shared.arr2;
arr3 = shared.arr3;
arr4 = shared.arr4;
arr5 = shared.arr5;
arr6 = shared.arr6;

// node-v8-clone js
var Cloner = require('..').Cloner;
cloner = new Cloner(false);

// slice
slice = function(a) { return a.slice(); };

// array 'for (var i = 0; i < l; i++)' cloner
arr_for1 = function(a) { var b = []; for (var i = 0, l = a.length; i < l; i++) b.push(a[i]); return b; }
assert.deepEqual(arr1, arr_for1(arr1));

// array 'for (var i = 0; i < l; i++)' cloner
arr_for2 = function(a) { var b = []; for (var i = 0, l = a.length; i < l; i++) b[i] = a[i]; return b; }
assert.deepEqual(arr1, arr_for2(arr1));

// array 'for (var i = 0; i < l; i++)' cloner 2
arr_for3 = function(a) { var l = a.length, b = new Array(l); for (var i = 0; i < l; i++) b[i] = a[i]; return b; }
assert.deepEqual(arr1, arr_for3(arr1));

// array 'for (var i = 0; i < l; i++)' cloner 3
arr_for4 = function(a) { var l = a.length, b = new Array(); for (var i = 0; i < l; i++) b[i] = a[i]; return b; }
assert.deepEqual(arr1, arr_for4(arr1));

// array 'for (i in arr)' cloner
arr_for_in = function(a) { var b = []; for(var i in a) b.push(a[i]); return b; }
assert.deepEqual(arr1, arr_for_in(arr1));

// array 'for (i in arr) if (hasOwnProperty)' cloner
arr_for_in_has = function(a) { var b = []; for(var i in a) if (a.hasOwnProperty(i)) b.push(a[i]); return b; }
assert.deepEqual(arr1, arr_for_in_has(arr1));

// hybrid
hybrid = function(a) { return (a.length > 100) ? a.slice() : arr_for3(a); };

['arr1', 'arr2', 'arr3', 'arr4', 'arr5', 'arr6'].forEach(function(obj) {
  shared.benchmark(obj, [
    ['slice()',       'slice(' + obj + ')'],
    ['[] ++ push',    'arr_for1(' + obj + ')'],
    ['[] ++ [i]',     'arr_for2(' + obj + ')'],
    ['Array(l) ++',   'arr_for3(' + obj + ')'],
    ['Array() ++',    'arr_for4(' + obj + ')'],
    ['hybrid',        'hybrid(' + obj + ')'],
    ['for in',        'arr_for_in(' + obj + ')'],
    ['for in has',    'arr_for_in_has(' + obj + ')'],
    ['lodash.clone',  'lodash.clone(' + obj + ', false)'],
    ['_.clone',       '_.clone(' + obj + ')'],
    ['node-v8-clone', 'cloner.clone(' + obj + ')']
  ]);
});
