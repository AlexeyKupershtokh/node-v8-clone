var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// RegExp
re = new RegExp('a', 'gi');
reFlags = /\w*$/;

// node-v8-clone js
clone = require('..').clone;
assert.deepEqual(re, clone(re));

// node-v8-clone
v8_clone = require('..').v8_clone;
assert.deepEqual(re, v8_clone(re));

// RegExp 'new RegExp(re.source, /\w*$/.exec(re))' cloner
re_clone = function(re) { return new RegExp(re.source, reFlags.exec(re)); }
assert.deepEqual(re, re_clone(re));

// RegExp 'new RegExp(source, flags)' cloner
re_clone2 = function(re) {
  var flags = (re.global ? 'g' : '') + (re.ignoreCase ? 'i' : '') + (re.multiline ? 'm' : '');
  return new RegExp(re.source, flags);
}
assert.deepEqual(re, re_clone2(re));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('RegExp new RegExp(re.source, /\\w*$/.exec(re))   ', 're_clone(re)');
suite.add('RegExp new RegExp(re.source, "g"? + "i"? + "m"?)', 're_clone2(re)');
suite.add('RegExp lodash _.clone                           ', '_.clone(re, false)');
suite.add('RegExp node-v8-clone js cloner                  ', 'clone(re, false)');
suite.add('RegExp node-v8-clone cloner                     ', 'v8_clone(re)');

suite.run({ 'async': true });