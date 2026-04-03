import Foundation
import React

@objc(OperationsStatusSurfaceViewManager)
final class OperationsStatusSurfaceViewManager: RCTViewManager {
  override func view() -> UIView! {
    return OperationsStatusSurfaceView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    true
  }
}
