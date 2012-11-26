var assert = require("assert")
var clone = require('..').clone;
var v8_deepclone = require('..').v8_deepclone;

describe('v8_deepclone()', function(){
  it('should deep clone plain objects', function(){
    var a = {x : 1, y: 2};
    var b = v8_deepclone(a);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
  });
  it('should deep clone nested objects', function(){
    var a = {x : {z : 1}, y: 2};
    var b = v8_deepclone(a);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
    assert.ok(a.x !== b.x);
  });
  it('should deep clone nested arrays', function(){
    var a = [[1], 2];
    var b = v8_deepclone(a);
    assert.deepEqual(a, b);
    assert.ok(b !== a);
    assert.ok(b[0] !== a[0]);
  });
  it('should clone nested objects with internal refs', function() {
    var r = [1];
    var a = [r, r];
    var b = v8_deepclone(a);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
    assert.ok(a[0] === a[1]);
    assert.ok(a[0] !== b[0]);
    assert.ok(b[0] === b[1]);
  });
  it('should deep clone circular arrays', function(){
    var array = [
      [[[]]],
      []
    ];

    array[0][0][0][0] = array;
    array[1][0] = array[0][0];

    var cloned = v8_deepclone(array);
    assert.ok(cloned[1][0] === cloned[0][0] && cloned === cloned[0][0][0][0] && cloned !== array);
  });
  it('should deep clone circular objects (lodash version)', function(){
    var object = {
      'foo': { 'b': { 'foo': { 'c': { } } } },
      'bar': { }
    };

    object.foo.b.foo.c = object;
    object.bar.b = object.foo.b;
    var cloned = v8_deepclone(object);
    assert.ok(cloned.bar.b === cloned.foo.b && cloned === cloned.foo.b.foo.c && cloned !== object);
  });
  it('should deep clone functions with custom properties', function() {
    var a = function() {};
    a.x = {y: 'z'};

    var b = v8_deepclone(a);
    assert.deepEqual(a.x, b.x);
    assert.ok(a !== b);
    assert.ok(a.x !== a.y);
  });
  it('should deep clone closures, but with a shared context', function() {
    var f = function() {
      var i = 0;
      return function() {
        return ++i;
      }
    };

    // closure
    var a = f();

    assert.equal(a(), 1);
    assert.equal(a(), 2);
    var b = v8_deepclone(a);
    assert.ok(a !== b);
    assert.equal(a(), 3);
    assert.equal(b(), 4);
  });
});
describe('clone()', function(){
  it('should deep clone plain objects', function(){
    var a = {x : 1, y: 2};
    var b = clone(a, true);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
  });
  it('should deep clone nested objects', function(){
    var a = {x : {z : 1}, y: 2};
    var b = clone(a, true);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
    assert.ok(a.x !== b.x);
  });
  it('should deep clone nested arrays', function(){
    var a = [[1], 2];
    var b = clone(a, true);
    assert.deepEqual(a, b);
    assert.ok(b !== a);
    assert.ok(b[0] !== a[0]);
  });
  it('should clone nested objects with internal refs', function() {
    var r = [1];
    var a = [r, r];
    var b = clone(a, true);
    assert.deepEqual(a, b);
    assert.ok(a !== b);
    assert.ok(a[0] === a[1]);
    assert.ok(a[0] !== b[0]);
    assert.ok(b[0] === b[1]);
  });
  it('should deep clone circular arrays', function(){
    var array = [
      [[[]]],
      []
    ];

    array[0][0][0][0] = array;
    array[1][0] = array[0][0];

    var cloned = clone(array, true);
    assert.ok(cloned[1][0] === cloned[0][0] && cloned === cloned[0][0][0][0] && cloned !== array);
  });
  it('should deep clone circular objects (lodash version)', function(){
    var object = {
      'foo': { 'b': { 'foo': { 'c': { } } } },
      'bar': { }
    };

    object.foo.b.foo.c = object;
    object.bar.b = object.foo.b;
    var cloned = clone(object, true);
    assert.ok(cloned.bar.b === cloned.foo.b && cloned === cloned.foo.b.foo.c && cloned !== object);
  });
  it('should deep clone functions with custom properties', function() {
    var a = function() {};
    a.x = {y: 'z'};

    var b = clone(a, true);
    assert.deepEqual(a.x, b.x);
    assert.ok(a !== b);
    assert.ok(a.x !== a.y);
  });
  it('should deep clone closures, but with a shared context', function() {
    var f = function() {
      var i = 0;
      return function() {
        return ++i;
      }
    };

    // closure
    var a = f();

    assert.equal(a(), 1);
    assert.equal(a(), 2);
    var b = clone(a, true);
    assert.ok(a !== b);
    assert.equal(a(), 3);
    assert.equal(b(), 4);
  });
});
