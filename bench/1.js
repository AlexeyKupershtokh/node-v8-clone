var clone = require('..').clone;

var obj = {a: '1', b: '2', c: '3', x: 1, y: 2, z: 3};

// v8 clone
var t = Date.now();
for (var i = 0; i < 1000000; i++) {
  clone(obj);
}
var t = Date.now() - t;
console.log(clone(obj), t);

// simple cloner
var simple = function(obj) { var result = {}; for(var i in obj) result[i] = obj[i]; return result; };

// benchmark simple cloner
var t = Date.now();
for (var i = 0; i < 1000000; i++) {
  simple(obj);
}
var t = Date.now() - t;
console.log(simple(obj), t);

// create static cloner
var parts = [];
for (var j in obj) if (obj.hasOwnProperty(j)) {
  parts.push('"' + j + '": obj["' + j + '"]');
}
var code = 'return {' + parts.join(',') + '}';
console.log(code);
var cloner = new Function('obj', code);

// benchmark static cloner
var t = Date.now();
for (var i = 0; i < 1000000; i++) {
  cloner(obj);
}
var t = Date.now() - t;
console.log(cloner(obj), t);
