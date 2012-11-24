var assert = require("assert")
var clone = require('..').clone;

describe('clone', function(){
  it('should clone null', function(){
    var a = null;
    var b = clone(a);
    assert.equal(a, null);
    assert.equal(b, null);
    a = true;
    assert.equal(a, true);
    assert.equal(b, null);
  });
  it('should clone undefined', function(){
    var a = undefined;
    var b = clone(a);
    assert.equal(a, undefined);
    assert.equal(b, undefined);
  });
  it('should clone numbers', function(){
    var a = 1;
    var b = clone(a);
    assert.equal(a, 1);
    assert.equal(b, 1);
    a += 1;
    assert.equal(a, 2);
    assert.equal(b, 1);
  });
  it('should clone number objects', function(){
    var a = new Number(1);
    var b = clone(a);
    assert.equal(a, 1);
    assert.equal(b, 1);
    assert.equal(a, 1);
    assert.equal(b, 1);

    a.myprop = 2;
    assert.equal(a.myprop, 2);
    assert.equal(b.myprop, undefined);
  });
  it('should clone strings', function(){
    var a = 'aaa';
    var b = clone(a);
    assert.equal(a, 'aaa');
    assert.equal(b, 'aaa');
    a += 'bbb';
    assert.equal(a, 'aaabbb');
    assert.equal(b, 'aaa');
  });
  it('should clone strings objects', function(){
    var a = new String('aaa');
    var b = clone(a);
    assert.equal(a, 'aaa');
    assert.equal(b, 'aaa');
    assert.equal(a, 'aaa');
    assert.equal(b, 'aaa');

    a.myprop = 2;
    assert.equal(a.myprop, 2);
    assert.equal(b.myprop, undefined);
  });
  it('should clone objects', function(){
    var a = {x : 1, y: 2};
    var b = clone(a);
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
  it('should clone instances', function(){
    function clazz (c) { this.c = c; this.d = 2 };
    clazz.prototype.getC = function() { return this.c; };
    var a = new clazz(1);
    var b = clone(a);
    assert.equal(a.c, 1);
    assert.equal(a.getC(), 1);
    assert.equal(a.d, 2);
    assert.equal(b.c, 1);
    assert.equal(b.getC(), 1);
    assert.equal(b.d, 2);
    a.c = 3;
    assert.equal(a.c, 3);
    assert.equal(a.getC(), 3);
    assert.equal(a.d, 2);
    assert.equal(b.c, 1);
    assert.equal(b.getC(), 1);
    assert.equal(b.d, 2);
  });
  it('should clone Date instances', function(){
    var a = new Date(1980,2,3,4,5,6);
    var b = clone(a);
    assert.equal(a.getFullYear(), 1980);
    assert.equal(b.getFullYear(), 1980);
    a.setFullYear(1981);
    assert.equal(a.getFullYear(), 1981);
    assert.equal(b.getFullYear(), 1980);

    a.myprop = 2;
    assert.equal(a.myprop, 2);
    assert.equal(b.myprop, undefined);
  });
  it('should clone RegExp instances', function(){
    var a = new RegExp('a+', 'g');
    var b = clone(a);
    assert.ok(a instanceof RegExp);
    assert.ok(b instanceof RegExp);
    assert.equal(a.lastIndex, 0);
    assert.equal(b.lastIndex, 0);
    a.exec('bba');
    assert.equal(a.lastIndex, 3);
    assert.equal(b.lastIndex, 0);

    a.myprop = 2;
    assert.equal(a.myprop, 2);
    assert.equal(b.myprop, undefined);
  });
  it('should clone Arguments', function(){
    function getargs() { return arguments; };
    var a = getargs(1, 2, 3);
    var b = clone(a);
    assert.deepEqual(a, getargs(1, 2, 3));
    assert.deepEqual(b, getargs(1, 2, 3));
    a[0] = 4;
    assert.deepEqual(a, getargs(4, 2, 3));
    assert.deepEqual(b, getargs(1, 2, 3));
  });
  it('should clone Functions', function(){
    var a = function(a, b, c) {};
    var b = clone(a);
    assert.equal(a.toString(), b.toString());
  });
  it('should clone closures', function(){
    var generator = function () { var i = 0; return function() { return ++i; }; };
    var a = generator();
    assert.equal(a(), 1);
    assert.equal(a(), 2);
    var b = clone(a);
    assert.equal(a(), 3);
    assert.equal(a(), 4);
    assert.equal(b(), 5);
    assert.equal(b(), 6);
  });
});
