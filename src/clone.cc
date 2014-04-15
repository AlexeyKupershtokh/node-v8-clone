#ifndef BUILDING_NODE_EXTENSION
#define BUILDING_NODE_EXTENSION
#endif  // BUILDING_NODE_EXTENSION
#include <node.h>
#include "nan.h"

using namespace v8;

NAN_METHOD(Clone) {
  Handle<Value>arg = args[0];
  if (arg->IsObject()) {
    Handle<Object>obj = Handle<Object>::Cast(arg);
    NanScope();
    return scope.Close(obj->Clone());
  }
  return arg;
}

Handle<Value> _DeepClone(Handle<Value> value, Local<Object> stackMapA, Local<Object> stackMapB) {
  if (value->IsObject()) {
    NanScope();
    Handle<Object> obj = Handle<Object>::Cast(value);

    // handle repeated items
    unsigned int hash = obj->GetIdentityHash();
    Local<Value> stackMapAValue = stackMapA->Get(hash);
    Local<Array> stackMapAArr;
    Local<Array> stackMapBArr;
    if (stackMapAValue->IsArray()) {
      stackMapAArr = stackMapAValue.As<Array>();
      stackMapBArr = stackMapA->Get(hash).As<Array>();
      for (unsigned int j = 0; j < stackMapAArr->Length(); j++) {
        Local<Value> stack = stackMapAArr->Get(j);
        if (stack->StrictEquals(value)) {
          return stackMapB->Get(hash).As<Array>()->Get(j);
        }
      }
    } else {
      stackMapAArr = Array::New();
      stackMapBArr = Array::New();
      stackMapA->Set(hash, stackMapAArr);
      stackMapB->Set(hash, stackMapBArr);
    }
    stackMapAArr->Set(stackMapAArr->Length(), value);

    // clone arrays
    if (value->IsArray()) {
      Handle<Array> cloned = Handle<Array>::Cast(obj->Clone());
      stackMapBArr->Set(stackMapBArr->Length(), cloned);
      for (unsigned int i = 0; i < cloned->Length(); i++) {
        Local<Value> v = cloned->Get(i);
        if (v->IsObject()) {
          cloned->Set(i, _DeepClone(v, stackMapA, stackMapB));
        }
      }
      return scope.Close(cloned);
    }

    // clone other objects
    Handle<Object> cloned = obj->Clone();
    stackMapBArr->Set(stackMapBArr->Length(), cloned);
    Local<Array> props = cloned->GetOwnPropertyNames();
    for(unsigned int i = 0; i < props->Length(); i++) {
      Local<Value> key(props->Get(Integer::New(i)));
      Local<Value> v = cloned->Get(key);
      if (v->IsObject()) {
        cloned->Set(key, _DeepClone(v, stackMapA, stackMapB));
      }
    }
    return scope.Close(cloned);
  }
  return value;
}

NAN_METHOD(DeepClone) {
  return _DeepClone(args[0], Object::New(), Object::New());
}

void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("clone"),
      FunctionTemplate::New(Clone)->GetFunction());
  target->Set(String::NewSymbol("deepclone"),
      FunctionTemplate::New(DeepClone)->GetFunction());
}

NODE_MODULE(clone, Init)