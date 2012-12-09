var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// Date
date = new Date;

// node-v8-clone
var Cloner = require('..').Cloner;
cloner = new Cloner(false);
assert.deepEqual(date, cloner.clone(date));

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

suite.add('date new Date(+date) cloner', 'date_clone(date)');
suite.add('date lodash _.clone        ', '_.clone(date, false)');
suite.add('date node-v8-clone cloner  ', 'cloner.clone(date)');

suite.run({ 'async': true });