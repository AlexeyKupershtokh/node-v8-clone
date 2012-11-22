#define BUILDING_NODE_EXTENSION
#include <node.h>

using namespace v8;

Handle<Value> Clone(const Arguments& args) {
  HandleScope scope;

  if (args[0]->IsObject()) {
    Handle<Object>obj = Handle<Object>::Cast(args[0]);
    return scope.Close(obj->Clone());
  } else {
    return args[0];
  }
}

void Init(Handle<Object> target) {
  target->Set(String::NewSymbol("clone"),
      FunctionTemplate::New(Clone)->GetFunction());
}

NODE_MODULE(clone, Init)