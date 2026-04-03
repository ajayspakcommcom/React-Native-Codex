#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(OperationsStatusSurfaceViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(subtitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(statusTone, NSString)
RCT_EXPORT_VIEW_PROPERTY(progressValue, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(attentionCount, NSNumber)

@end
