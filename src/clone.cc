#ifndef BUILDING_NODE_EXTENSION
#define BUILDING_NODE_EXTENSION
#endif  // BUILDING_NODE_EXTENSION
#include <node.h>
#include "nan.h"

using namespace v8;

NAN_METHOD(Clone) {
  Nan::HandleScope scope;
  Local<Value> arg = info[0];
  if (arg->IsObject()) {
    Handle<Object>obj = Handle<Object>::Cast(arg);
    Local<Object> cloned = obj->Clone();
    info.GetReturnValue().Set(cloned);
    return;
  }
  info.GetReturnValue().Set(arg);
}

void Init(Handle<Object> target) {
  target->Set(Nan::New<String>("clone").ToLocalChecked(),
      Nan::New<FunctionTemplate>(Clone)->GetFunction());
}

NODE_MODULE(clone, Init)
