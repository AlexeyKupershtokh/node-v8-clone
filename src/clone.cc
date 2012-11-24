#define BUILDING_NODE_EXTENSION
#include <node.h>

using namespace v8;

Handle<Value> Clone(const Arguments& args) {
  Handle<Value>arg = args[0];
  if (arg->IsObject()) {
    Handle<Object>obj = Handle<Object>::Cast(arg);
    HandleScope scope;
    return scope.Close(obj->Clone());
  }
  return arg;
}

Handle<Value> _DeepClone(Handle<Value> value) {
  if (value->IsObject()) {

    Handle<Object> obj = Handle<Object>::Cast(value);
    Handle<Object> cloned = obj->Clone();
    Local<Array> props = cloned->GetOwnPropertyNames();
    for(unsigned int i = 0; i < props->Length(); i++) {
      Local<Value> key(props->Get(Integer::New(i)));
      Local<Value> v = cloned->Get(key);
      if (v->IsObject()) {
        cloned->Set(key, _DeepClone(v));
      }
    }
    HandleScope scope;
    return scope.Close(cloned);
  }
  return value;
}

Handle<Value> DeepClone(const Arguments& args) {
  return _DeepClone(args[0]);
}

void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("clone"),
      FunctionTemplate::New(Clone)->GetFunction());
  target->Set(String::NewSymbol("deepclone"),
      FunctionTemplate::New(DeepClone)->GetFunction());
}

NODE_MODULE(clone, Init)