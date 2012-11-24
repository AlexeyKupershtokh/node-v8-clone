var Benchmark = require('benchmark');
var assert = require('assert');
var util = require('util');
try { _ = require('lodash'); } catch (e) {};

// num
num = 1123;

// node-v8-clone
v8_clone = require('..').v8_clone;
assert.deepEqual(num, v8_clone(num));

// node-v8-clone js
clone = require('..').clone;
assert.deepEqual(num, clone(num));

num_clone = function(num) { return num; };
assert.deepEqual(num, num_clone(num));

num_clone2 = function(num) { return new Number(num); };
assert.deepEqual(num, num_clone(num));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('num return num cloner        ', 'num_clone(num)');
suite.add('num new num(+num) cloner     ', 'num_clone2(num)');
suite.add('num lodash _.clone           ', '_.clone(num, false)');
suite.add('num node-v8-clone js cloner  ', 'clone(num, false)');
suite.add('num node-v8-clone cloner     ', 'v8_clone(num)');

suite.run({ 'async': true });