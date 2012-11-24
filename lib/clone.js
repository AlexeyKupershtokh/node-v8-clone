"use strict";

var v8_clone_mod = require('../build/Release/clone');
var v8_clone = v8_clone_mod.clone;
var v8_deepclone = v8_clone_mod.deepclone;

var lodash = require('lodash');
var forOwn = lodash.forOwn;
var forEach = lodash.forEach;

module.exports.v8_clone = v8_clone;
module.exports.v8_deepclone = v8_deepclone;

module.exports.clone = function clone(value, deep, guard, stackA, stackB) {
  // based on type
  if ((value === null) || (typeof value !== 'object')) {
    return value;
  }

  if (guard) {
    deep = false;
  }

  // shallow clone
  if (!deep) {
    return v8_clone(value);
  }

  // check for circular references and return corresponding clone
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }

  // init cloned object
  var result = v8_clone(value);

  // add the source value to the stack of traversed objects
  // and associate it with its clone
  stackA.push(value);
  stackB.push(result);

  var isArr = (value.constructor === Array);
  // recursively populate clone (susceptible to call stack limits)
  (isArr ? forEach : forOwn)(result, function (objValue, key) {
    result[key] = clone(objValue, deep, null, stackA, stackB);
  });

  return result;
};