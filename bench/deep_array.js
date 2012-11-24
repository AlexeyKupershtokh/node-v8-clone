var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// deeparr1: 5 string keys and values
deeparr1 = ['a', ['b', 'c', 'd'], 'e'];

// deeparr2: 1000 x 1 x 3 x 3 nested elements with string values
deeparr2 = [];
for (var i = 0; i < 1000; i++) {
  deeparr2[i] = [
    [
      ['c', 'd', 'e'],
      ['g', 'h', 'i'],
      ['k', 'l', 'm']
    ]
  ];
}

// node-v8-clone js
clone = require('..').clone;
assert.deepEqual(deeparr1, clone(deeparr1));

// node-v8-clone
v8_deepclone = require('..').v8_deepclone;
assert.deepEqual(deeparr1, v8_deepclone(deeparr1));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('deeparr1 lodash _.clone          ', '_.clone(deeparr1, true)');
suite.add('deeparr1 node-v8-clone js cloner ', 'clone(deeparr1, true)');
suite.add('deeparr1 node-v8-clone cloner    ', 'v8_deepclone(deeparr1)');

suite.add('deeparr2 lodash _.clone          ', '_.clone(deeparr2, true)');
suite.add('deeparr2 node-v8-clone js cloner ', 'clone(deeparr2, true)');
suite.add('deeparr2 node-v8-clone cloner    ', 'v8_deepclone(deeparr2)');

suite.run({ 'async': true });