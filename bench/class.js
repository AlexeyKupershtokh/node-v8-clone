var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// clazz
Clazz = function(a, b, c, d) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
};
inst = new Clazz(1, 2, 3, 4);

assert.equal(inst.a, 1);
assert.equal(inst.b, 2);
assert.equal(inst.c, 3);
assert.equal(inst.d, 4);

// node-v8-clone
clone = require('..').clone;
assert.deepEqual(inst, clone(inst));

var inst2 = clone(inst);
inst2.constructor(5, 6, 7 ,8)

assert.equal(inst2.a, 5);
assert.equal(inst2.b, 6);
assert.equal(inst2.c, 7);
assert.equal(inst2.d, 8);

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('Clazz new Clazz(5, 6, 7, 8) ', 'var inst2 = new Clazz(1, 2, 3, 4);');
suite.add('Clazz lodash _.clone        ', 'var inst2 = _.clone(inst, false);');
suite.add('Clazz node-v8-clone cloner  ', 'var inst2 = clone(inst);');

suite.run({ 'async': true });