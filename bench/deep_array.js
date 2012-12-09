var Benchmark = require('benchmark');
var assert = require('assert');
try { _ = require('lodash'); } catch (e) { console.warn('lodash module is not installed'); };
try { clone = require('clone'); } catch(e) { console.warn('clone module is not installed'); };
try { cloneextend = require('cloneextend'); } catch(e) { console.warn('cloneextend module is not installed'); };

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

// node-v8-clone
var Cloner = require('..').Cloner;
cloner1 = new Cloner(true);
cloner2 = new Cloner(true, true, { 'Array': Cloner.deep_array });
cloner3 = new Cloner(true, false, { 'Array': Cloner.deep_array });

var suite = new Benchmark.Suite;
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});

suite.add('deeparr1 lodash _.clone          ', '_.clone(deeparr1, true)');
suite.add('deeparr1 clone                   ', 'clone(deeparr1)');
suite.add('deeparr1 cloneextend.clone       ', 'cloneextend.clone(deeparr1)');
suite.add('deeparr1 cloner1                 ', 'cloner1.clone(deeparr1)');
suite.add('deeparr1 cloner2                 ', 'cloner2.clone(deeparr1)');
suite.add('deeparr1 cloner3                 ', 'cloner3.clone(deeparr1)');

suite.add('deeparr2 lodash _.clone          ', '_.clone(deeparr2, true)');
suite.add('deeparr2 clone                   ', 'clone(deeparr2)');
suite.add('deeparr2 cloneextend.clone       ', 'cloneextend.clone(deeparr2)');
suite.add('deeparr2 cloner1                 ', 'cloner1.clone(deeparr2)');
suite.add('deeparr2 cloner2                 ', 'cloner2.clone(deeparr2)');
suite.add('deeparr2 cloner3                 ', 'cloner3.clone(deeparr2)');

suite.run({ 'async': true });