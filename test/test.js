var assert = require("assert")
var clone = require('..').clone;

describe('clone', function(){
  it('should clone null', function(){
    var a = null;
    var b = clone(a);
    assert.equal(a, null);
    assert.equal(b, null);
  });
  it('should clone undefined', function(){
    var a = null;
    var b = clone(a);
    assert.equal(a, null);
    assert.equal(b, null);
  });
  it('should clone numbers', function(){
    var a = 1;
    var b = clone(a);
    assert.equal(a, 1);
    assert.equal(b, 1);
  });
  it('should clone objects', function(){
    var a = {x : 1, y: 2};
    var b = clone(a);
    assert.equal(a.x, 1);
    assert.equal(a.y, 2);
    assert.equal(b.x, 1);
    assert.equal(b.y, 2);
  });
  it('should clone arrays', function(){
    var a = [1, 2];
    var b = clone(a);
    assert.equal(a[0], 1);
    assert.equal(a[1], 2);
    assert.equal(b[0], 1);
    assert.equal(b[1], 2);
    a[1] = 3;
    assert.equal(a[0], 1);
    assert.equal(a[1], 3);
    assert.equal(b[0], 1);
    assert.equal(b[1], 2);
  });
});
