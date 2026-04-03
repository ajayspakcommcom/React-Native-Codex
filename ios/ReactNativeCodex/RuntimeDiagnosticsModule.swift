import Foundation
import React
import UIKit

@objc(RuntimeDiagnosticsModule)
class RuntimeDiagnosticsModule: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc(getRuntimeProfile:rejecter:)
  func getRuntimeProfile(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) {
    let processInfo = ProcessInfo.processInfo
    let thermalState = processInfo.thermalState
    let lowPowerModeEnabled = processInfo.isLowPowerModeEnabled

    let performanceTier: String
    switch thermalState {
    case .critical:
      performanceTier = "critical"
    case .serious, .fair:
      performanceTier = "constrained"
    case .nominal:
      performanceTier = lowPowerModeEnabled ? "constrained" : "standard"
    @unknown default:
      performanceTier = lowPowerModeEnabled ? "constrained" : "standard"
    }

    let appVersion =
      Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "unknown"

    resolve([
      "platform": "ios",
      "operatingSystemVersion": UIDevice.current.systemVersion,
      "deviceModel": UIDevice.current.model,
      "appVersion": appVersion,
      "lowPowerModeEnabled": lowPowerModeEnabled,
      "performanceTier": performanceTier,
      "diagnosticsSource": "native-module",
    ])
  }
}
