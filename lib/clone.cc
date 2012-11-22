//#define BUILDING_NODE_EXTENSION
#include <node.h>

using namespace v8;

Handle<Value> Clone(const Arguments& args) {
  HandleScope scope;

  Handle<Object> obj = Handle<Object>::Cast(args[0]);

  return scope.Close(obj->Clone());
}

void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("clone"),
      FunctionTemplate::New(Clone)->GetFunction());
}

NODE_MODULE(clone, Init)