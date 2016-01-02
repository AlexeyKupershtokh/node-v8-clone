#ifndef BUILDING_NODE_EXTENSION
#define BUILDING_NODE_EXTENSION
#endif  // BUILDING_NODE_EXTENSION
#include <node.h>
#include "nan.h"

using namespace v8;

NAN_METHOD(Clone) {
  Handle<Value>arg = info[0];
  if (arg->IsObject()) {
    Handle<Object>obj = Handle<Object>::Cast(arg);
    info.GetReturnValue().Set(obj->Clone());
  }
  info.GetReturnValue().Set(arg);
}

NAN_MODULE_INIT(Init) {
  Nan::Set(
    target,
    Nan::New<v8::String>("clone").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(Clone)).ToLocalChecked()
  );
}

NODE_MODULE(clone, Init)
