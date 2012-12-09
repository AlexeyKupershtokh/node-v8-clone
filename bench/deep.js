var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) { console.warn('lodash module is not installed'); };
try { clone = require('clone'); } catch(e) { console.warn('clone module is not installed'); };
try { cloneextend = require('cloneextend'); } catch(e) { console.warn('cloneextend module is not installed'); };

// deep1: 5 sting keys and values
deep1 = {a: 'a', b: {c: 'c', d: 'd', e: 'e'}, f: 'f'};

// deep2: 5 integer keys and values
deep2 = {1: 1, 2: {3: 3, 4: 4, 5: 5}, 6: 6};

// deep3: 1000 x 1 x 3 x 3 objects with string keys and values
deep3 = {};
for (var i = 0; i < 1000; i++) {
  deep3['_' + i] = {
    a: {
      b: {c: 'c', d: 'd', e: 'e'},
      f: {g: 'g', h: 'h', i: 'i'},
      j: {k: 'k', l: 'l', m: 'm'}
    }
  };
}

// deep4: 1000 x 1 x 3 x 3 objects with int keys and values
deep4 = {};
for (var i = 0; i < 1000; i++) {
  deep4[i] = {
    1: {
      2: {3: 3, 4: 4, 5: 5},
      6: {7: 7, 8: 8, 9: 9},
      10: {11: 11, 12: 12, 13: 13}
    }
  };
}

// cloner
var Cloner = require('..').Cloner;
cloner = new Cloner(true);

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('deep1 lodash _.clone          ', '_.clone(deep1, true)');
suite.add('deep1 clone                   ', 'clone(deep1)');
suite.add('deep1 cloneextend.clone       ', 'cloneextend.clone(deep1)');
suite.add('deep1 node-v8-clone cloner    ', 'cloner.clone(deep1)');

suite.add('deep2 lodash _.clone          ', '_.clone(deep2, true)');
suite.add('deep2 clone                   ', 'clone(deep2)');
suite.add('deep2 cloneextend.clone       ', 'cloneextend.clone(deep2)');
suite.add('deep2 node-v8-clone cloner    ', 'cloner.clone(deep2)');

suite.add('deep3 lodash _.clone          ', '_.clone(deep3, true)');
suite.add('deep3 clone                   ', 'clone(deep3)');
suite.add('deep3 cloneextend.clone       ', 'cloneextend.clone(deep3)');
suite.add('deep3 node-v8-clone cloner    ', 'cloner.clone(deep3)');

suite.add('deep4 lodash _.clone          ', '_.clone(deep4, true)');
suite.add('deep4 clone                   ', 'clone(deep4)');
suite.add('deep4 cloneextend.clone       ', 'cloneextend.clone(deep4)');
suite.add('deep4 node-v8-clone cloner    ', 'cloner.clone(deep4)');

suite.run({ 'async': true });