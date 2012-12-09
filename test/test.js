var assert = require('assert');
var Cloner = require('..').Cloner;
var shared = require('./shared.js');

describe('new Cloner(false)', function(){
  beforeEach(function(){
    this.clone = function(value) {
      var cloner = new Cloner(false);
      return cloner.clone(value);
    };
  });
  shared.behavesAsShallow();
});

describe('new Cloner(true)', function(){
  beforeEach(function(){
    this.clone = function(value) {
      var cloner = new Cloner(true);
      return cloner.clone(value);
    };
  });
  shared.behavesAsShallow();
  shared.behavesAsDeep();
  shared.behavesAsDeepWCircular();
});

describe('new Cloner(true, false)', function(){
  beforeEach(function(){
    this.clone = function(value) {
      var cloner = new Cloner(true, false);
      return cloner.clone(value);
    };
  });
  shared.behavesAsShallow();
  shared.behavesAsDeep();
});
