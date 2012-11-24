var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) {};

// obj1: 5 sting keys and values
obj1 = {'a': 'a', 'b': {'c': 'c', 'd': 'd', 'e': 'e'}};

// obj2: 5 integer keys and values
obj2 = {1: 1, 2: {3: 3, 4: 4, 5: 5}};

// obj3: 1000 string keys and values
obj3 = {};
for (var i = 0; i < 1000; i++) {
  obj3['_' + i] = {
    a: {
      b: {
        c: {},
        d: {},
        e: {}
      },
      f: {
        g: {},
        h: {},
        i: {}
      },
      j: {
        k: {},
        l: {},
        m: {}
      }
    },
    n: {
      b: {
        c: {},
        d: {},
        e: {}
      },
      f: {
        g: {},
        h: {},
        i: {}
      },
      j: {
        k: {},
        l: {},
        m: {}
      }
    }
  };
}

// obj4: 1000 integer keys and values
obj4 = {};
for (var i = 0; i < 1000; i++) {
  obj4[i] = obj2;
}

// node-v8-clone js
clone = require('..').clone;
assert.deepEqual(obj1, clone(obj1));

// node-v8-clone
v8_deepclone = require('..').v8_deepclone;
assert.deepEqual(obj1, v8_deepclone(obj1));

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('obj1 lodash _.clone          ', '_.clone(obj1, true)');
suite.add('obj1 node-v8-clone js cloner ', 'clone(obj1, true)');
suite.add('obj1 node-v8-clone cloner    ', 'v8_deepclone(obj1)');

suite.add('obj2 lodash _.clone          ', '_.clone(obj2, true)');
suite.add('obj2 node-v8-clone js cloner ', 'clone(obj2, true)');
suite.add('obj2 node-v8-clone cloner    ', 'v8_deepclone(obj2)');

suite.add('obj3 lodash _.clone          ', '_.clone(obj3, true)');
suite.add('obj3 node-v8-clone js cloner ', 'clone(obj3, true)');
suite.add('obj3 node-v8-clone cloner    ', 'v8_deepclone(obj3)');

suite.add('obj4 lodash _.clone          ', '_.clone(obj4, true)');
suite.add('obj4 node-v8-clone js cloner ', 'clone(obj4, true)');
suite.add('obj4 node-v8-clone cloner    ', 'v8_deepclone(obj4)');


suite.run({ 'async': true });