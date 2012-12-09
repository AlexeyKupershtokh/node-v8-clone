var assert = require('assert');
var lodash = require('lodash');
var shared = require('./shared.js');
var cloneextend = require('cloneextend');
var clone = require('clone');

describe('lodash.clone(value)', function(){
  beforeEach(function(){
    this.clone = function(value) {
      return lodash.clone(value);
    };
  });
  shared.behavesAsShallow();
});

describe('lodash.clone(value, true)', function(){
  beforeEach(function(){
    this.clone = function(value) {
      return lodash.clone(value, true);
    };
  });
  shared.behavesAsShallow();
  shared.behavesAsDeep();
  shared.behavesAsDeepWCircular();
});

describe('cloneextend.clone()', function(){
  beforeEach(function(){
    this.clone = function(value) {
      return cloneextend.clone(value);
    };
  });
  shared.behavesAsShallow();
  shared.behavesAsDeep();
  shared.behavesAsDeepWCircular();
});

describe('clone()', function(){
  beforeEach(function(){
    this.clone = function(value) {
      return clone(value);
    };
  });
  shared.behavesAsShallow();
  shared.behavesAsDeep();
  shared.behavesAsDeepWCircular();
});
