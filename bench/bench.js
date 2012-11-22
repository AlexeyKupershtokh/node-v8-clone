var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

obj = {a: '1', b: '2', c: '3', x: 1, y: 2, z: 3};

// node-v8-clone
clone = require('..').clone;

// regular for(var i in obj) cloner
regular = function(obj) { var result = {}; for(var i in obj) result[i] = obj[i]; return result; };

// regular cloner with own checks
regular_own = function(obj) { var result = {}; for(var i in obj) if (obj.hasOwnProperty(i)) result[i] = obj[i]; return result; };

// static cloner
var parts = [];
for (var j in obj) if (obj.hasOwnProperty(j)) {
  parts.push('"' + j + '": obj["' + j + '"]');
}
var code = 'return {' + parts.join(',') + '}';
//console.log(code);
var static = new Function('obj', code);

// add tests
suite.add('regular cloner', function() {
  regular(obj);
});
suite.add('regular own cloner', function() {
  regular_own(obj);
});
suite.add('static cloner', function() {
  static(obj);
});
suite.add('node-v8-clone cloner', function() {
  clone(obj);
});
// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
});
suite.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
});
// run async
suite.run({ 'async': true });