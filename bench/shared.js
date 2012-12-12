var plot = require('benchmark.js-plot').plot;
var Benchmark = require('benchmark');

var range = function(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
   result.push(i);
  }
  return result;
};

var date = module.exports.date = new Date();

// obj1: 5 sting keys and values
var obj1 = module.exports.obj1 = {'a': 'a', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'e'};

// obj2: 5 integer keys and values
var obj2 = module.exports.obj2 = {1: 1, 2: 2, 3: 3, 4: 4, 5: 5};

// obj3: 100 string keys and values
var obj3 = module.exports.obj3 = {};
for (var i = 0; i < 100; i++) {
  obj3['_' + i] = '_' + i;
}

// obj4: 100 integer keys and values
var obj4 = module.exports.obj4 = {};
for (var i = 0; i < 100; i++) {
  obj4[i] = i;
}

// obj5: 10000 string keys and values
var obj5 = module.exports.obj5 = {};
for (var i = 0; i < 10000; i++) {
  obj5['_' + i] = '_' + i;
}

// obj6: 10000 integer keys and values
var obj6 = module.exports.obj6 = {};
for (var i = 0; i < 10000; i++) {
  obj6[i] = i;
}

// deepobj1: 5 sting keys and values
var deepobj1 = module.exports.deepobj1 = {a: 'a', b: {c: 'c', d: 'd', e: 'e'}, f: 'f'};

// deepobj2: 5 integer keys and values
var deepobj2 = module.exports.deepobj2 = {1: 1, 2: {3: 3, 4: 4, 5: 5}, 6: 6};

// deepobj3: 100 x 1 x 3 x 3 objects with string keys and values
var deepobj3 = module.exports.deepobj3 = {};
for (var i = 0; i < 100; i++) {
  deepobj3['_' + i] = {
    a: {
      b: {c: 'c', d: 'd', e: 'e'},
      f: {g: 'g', h: 'h', i: 'i'},
      j: {k: 'k', l: 'l', m: 'm'}
    }
  };
}

// deepobj4: 100 x 1 x 3 x 3 objects with int keys and values
var deepobj4 = module.exports.deepobj4 = {};
for (var i = 0; i < 100; i++) {
  deepobj4[i] = {
    1: {
      2: {3: 3, 4: 4, 5: 5},
      6: {7: 7, 8: 8, 9: 9},
      10: {11: 11, 12: 12, 13: 13}
    }
  };
}

// array of 1 numeric elements
var arr1 = module.exports.arr1 = range(1);

// array of 10 numeric elements
var arr2 = module.exports.arr2 = range(10);

// array of 100 numeric elements
var arr3 = module.exports.arr3 = range(100);

// array of 1000 numeric elements
var arr4 = module.exports.arr4 = range(1000);

// array of 10000 numeric elements
var arr5 = module.exports.arr5 = range(10000);

// array of 100000 numeric elements
//var arr6 = module.exports.arr6 = range(100000);

var arr6 = module.exports.arr6 = [];
for (var i = 0; i < 100000; i++) {
  switch(i % 6) {
    case 0:
      arr6.push(i);
      break;
    case 1:
      arr6.push(i + 0.5);
      break;
    case 2:
      arr6.push(Math.random() > 0.5);
      break;
    case 3:
      arr6.push(new Date());
      break;
    case 4:
      arr6.push(new RegExp('' + i));
      break;
    case 5:
      arr6.push(new Function(' return ' + i));
      break;
  }
}

// deeparr1: 5 string keys and values
var deeparr1 = module.exports.deeparr1 = ['a', ['b', 'c', 'd'], 'e'];

// deeparr2: 100 x 1 x 3 x 3 nested elements with string values
var deeparr2 = module.exports.deeparr2 = [];
for (var i = 0; i < 100; i++) {
  deeparr2[i] = [
    [
      ['c', 'd', 'e'],
      ['g', 'h', 'i'],
      ['k', 'l', 'm']
    ]
  ];
}


var f = module.exports.f = function (code) {
  return new Function('next', 'count', 'while (count--) {' + code + '}; next();');
};

var benchmark = module.exports.benchmark = function(suite_name, benchmarks) {
  var suite = new Benchmark.Suite;
  suite.on('cycle', function(event) {
    if (typeof gc == 'function') gc();
    console.log(String(event.target));
  });
  suite.on('complete', function() {
    plot(this, { path: 'results/' + suite_name + '.png' });
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  });

  var options = { maxTime: 1 };

  benchmarks.forEach(function(tuple) {
    var benchmark_name = tuple[0];
    var code = tuple[1];
    suite.add(benchmark_name, code, options);
  });

  suite.run();
};