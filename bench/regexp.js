var Benchmark = require('benchmark');
var assert = require('assert');

// RegExp
re = new RegExp('a', 'gi');
reFlags = /\w*$/;

// node-v8-clone
clone = require('..').clone;
assert.deepEqual(re, clone(re));

// RegExp 'new RegExp(source, flags)' cloner
re_clone = function(re) { return new RegExp(re.source, reFlags.exec(re)); }
assert.deepEqual(re, re_clone(re));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('RegExp re_clone',             're_clone(re)');
suite.add('RegExp node-v8-clone cloner', 'clone(re)');

suite.run({ 'async': true });