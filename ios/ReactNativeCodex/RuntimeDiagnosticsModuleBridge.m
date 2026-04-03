#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RuntimeDiagnosticsModule, NSObject)

RCT_EXTERN_METHOD(getRuntimeProfile:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
