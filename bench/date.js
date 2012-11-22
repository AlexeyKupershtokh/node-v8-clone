var Benchmark = require('benchmark');
var assert = require('assert');

// Date
date = new Date;

// node-v8-clone
clone = require('..').clone;
assert.deepEqual(date, clone(date));

// date 'new Date(date)' cloner
date_clone = function(date) { return new Date(+date); }
assert.deepEqual(date, date_clone(date));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('date date_clone',           'date_clone(date)');
suite.add('date node-v8-clone cloner', 'clone(date)');

suite.run({ 'async': true });