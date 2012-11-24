var assert = require("assert")
var clone = require('..').clone;
var v8_clone = require('..').v8_clone;
var v8_deepclone = require('..').v8_deepclone;

describe('v8_deepclone', function(){
  it('should deep clone plain objects', function(){
    var a = {x : 1, y: 2};
    var b = v8_deepclone(a);
    assert.equal(a.x, 1);
    assert.equal(a.y, 2);
    assert.equal(b.x, 1);
    assert.equal(b.y, 2);
    a.x = 3;
    assert.equal(a.x, 3);
    assert.equal(a.y, 2);
    assert.equal(b.x, 1);
    assert.equal(b.y, 2);
  });
  it('should deep clone nested objects', function(){
    var a = {x : {z : 1}, y: 2};
    var b = v8_deepclone(a);
    assert.equal(a.x.z, 1);
    assert.equal(a.y, 2);
    assert.equal(b.x.z, 1);
    assert.equal(b.y, 2);
    a.x.z = 3;
    assert.equal(a.x.z, 3);
    assert.equal(a.y, 2);
    assert.equal(b.x.z, 1);
    assert.equal(b.y, 2);
  });
  it('should deep clone nested arrays', function(){
    var a = [[1], 2];
    var b = v8_deepclone(a);
    assert.deepEqual(a, [[1], 2]);
    assert.deepEqual(b, [[1], 2]);
    a[0][0] = 3;
    assert.deepEqual(a, [[3], 2]);
    assert.deepEqual(b, [[1], 2]);
  });
  it('should clone nested objects with internal refs', function() {
    var r = [1];
    var a = [r, r];
    var b = v8_deepclone(a);
    assert.ok(a !== b);
    assert.ok(a[0] === a[1]);
    assert.ok(a[0] !== b[0]);
    assert.ok(b[0] === b[1]);
  });
  it('should deep clone circular objects', function(){
    var a = {x: {y: 1}, z: null};
    a.z = a;
    var b = v8_deepclone(a);
    assert.equal(a.x.y, 1);
    assert.equal(a.z.x.y, 1);
    assert.equal(b.x.y, 1);
    assert.equal(b.z.x.y, 1);
    a.z.z.z.x.y = 2;
    assert.equal(a.x.y, 2);
    assert.equal(a.z.x.y, 2);
    assert.equal(b.x.y, 1);
    assert.equal(b.z.x.y, 1);
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
});
describe('clone()', function(){
  it('should deep clone plain objects', function(){
    var a = {x : 1, y: 2};
    var b = clone(a, true);
    assert.equal(a.x, 1);
    assert.equal(a.y, 2);
    assert.equal(b.x, 1);
    assert.equal(b.y, 2);
    a.x = 3;
    assert.equal(a.x, 3);
    assert.equal(a.y, 2);
    assert.equal(b.x, 1);
    assert.equal(b.y, 2);
  });
  it('should deep clone nested objects', function(){
    var a = {x : {z : 1}, y: 2};
    var b = clone(a, true);
    assert.equal(a.x.z, 1);
    assert.equal(a.y, 2);
    assert.equal(b.x.z, 1);
    assert.equal(b.y, 2);
    a.x.z = 3;
    assert.equal(a.x.z, 3);
    assert.equal(a.y, 2);
    assert.equal(b.x.z, 1);
    assert.equal(b.y, 2);
  });
  it('should deep clone nested arrays', function(){
    var a = [[1], 2];
    var b = clone(a, true);
    assert.deepEqual(a, [[1], 2]);
    assert.deepEqual(b, [[1], 2]);
    a[0][0] = 3;
    assert.deepEqual(a, [[3], 2]);
    assert.deepEqual(b, [[1], 2]);
  });
  it('should clone nested objects with internal refs', function() {
    var r = [1];
    var a = [r, r];
    var b = clone(a, true);
    assert.ok(a !== b);
    assert.ok(a[0] === a[1]);
    assert.ok(a[0] !== b[0]);
    assert.ok(b[0] === b[1]);
  });
  it('should deep clone circular arrays', function(){
    var a = [[1], 2];
    a.push(a);
    var b = clone(a, true);
    assert.equal(a[0][0], 1);
    assert.equal(a[1], 2);
    assert.equal(a[2][0][0], 1);
    assert.equal(b[0][0], 1);
    assert.equal(b[1], 2);
    assert.equal(b[2][0][0], 1);
    a[0][0] = 3;
    assert.equal(a[0][0], 3);
    assert.equal(a[1], 2);
    assert.equal(a[2][0][0], 3);
    assert.equal(b[0][0], 1);
    assert.equal(b[1], 2);
    assert.equal(b[2][0][0], 1);
  });
  it('should deep clone circular objects', function(){
    var a = {x: {y: 1}, z: null};
    a.z = a;
    var b = clone(a, true);
    assert.equal(a.x.y, 1);
    assert.equal(a.z.x.y, 1);
    assert.equal(b.x.y, 1);
    assert.equal(b.z.x.y, 1);
    a.z.z.z.x.y = 2;
    assert.equal(a.x.y, 2);
    assert.equal(a.z.x.y, 2);
    assert.equal(b.x.y, 1);
    assert.equal(b.z.x.y, 1);
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
});
