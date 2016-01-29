//  BarcodeViewManager.m

#import "RefreshControlViewManager.h"
#import "RCTUIManager.h"
#import "UIView+React.h"
#import "RCTScrollView.h"

@implementation RefreshControlViewManager
@synthesize bridge = _bridge;
- (dispatch_queue_t)methodQueue {
    return self.bridge.uiManager.methodQueue;
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(create:(nonnull NSNumber *)reactTag
                  options:(nonnull NSDictionary *)options
                  callback:(RCTResponseSenderBlock)callback) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view) {
            RCTLogError(@"Cannot find view with tag #%@", reactTag);
            return;
        }

        UIScrollView *scrollView = ((RCTScrollView *)view).scrollView;
        UIRefreshControl *refreshControl = [[UIRefreshControl alloc] init];
        [refreshControl
            addTarget:self action:@selector(didBeginRefreshing:)
            forControlEvents:UIControlEventValueChanged];
        refreshControl.tag = [reactTag integerValue];
        [scrollView insertSubview:refreshControl atIndex:0];
        callback(@[[NSNull null], reactTag]);
    }];
}

RCT_EXPORT_METHOD(endRefreshing:(nonnull NSNumber *)reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary *viewRegistry) {

        UIView *view = viewRegistry[reactTag];
        if (!view) {
            RCTLogError(@"Cannot find view with tag #%@", reactTag);
            return;
        }

        UIScrollView *scrollView = ((RCTScrollView *)view).scrollView;
        UIRefreshControl *refreshControl =
            (UIRefreshControl *)[scrollView viewWithTag:[reactTag integerValue]];
        dispatch_async(dispatch_get_main_queue(), ^{
            [refreshControl endRefreshing];
        });
    }];
}

- (void)didBeginRefreshing:(UIRefreshControl *)refreshControl {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"didBeginRefreshing"
                                                    body:@(refreshControl.tag)];
}

@end
