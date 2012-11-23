#define BUILDING_NODE_EXTENSION
#include <node.h>

using namespace v8;

Handle<Value> Clone(const Arguments& args) {
  Handle<Value>arg = args[0];
  if (arg->IsObject()/* && !arg->IsBooleanObject() && !arg->IsStringObject() && !arg->IsNumberObject() */) {
    Handle<Object>obj = Handle<Object>::Cast(arg);
    HandleScope scope;
    return scope.Close(obj->Clone());
  }
  return arg;
}

void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("clone"),
      FunctionTemplate::New(Clone)->GetFunction());
}

NODE_MODULE(clone, Init)