package com.reactnativecodex.nativeintegration

import android.app.ActivityManager
import android.content.Context
import android.os.Build
import android.os.PowerManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class RuntimeDiagnosticsModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "RuntimeDiagnosticsModule"

  @ReactMethod
  fun getRuntimeProfile(promise: Promise) {
    try {
      val activityManager =
        reactContext.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
      val powerManager =
        reactContext.getSystemService(Context.POWER_SERVICE) as PowerManager

      val memoryClass = activityManager.memoryClass
      val lowRamDevice = activityManager.isLowRamDevice
      val lowPowerMode = powerManager.isPowerSaveMode

      val performanceTier =
        when {
          lowRamDevice && lowPowerMode -> "critical"
          lowRamDevice || lowPowerMode || memoryClass <= 192 -> "constrained"
          else -> "standard"
        }

      val packageInfo =
        reactContext.packageManager.getPackageInfo(reactContext.packageName, 0)
      val appVersion = packageInfo.versionName ?: "unknown"

      val payload =
        Arguments.createMap().apply {
          putString("platform", "android")
          putString("operatingSystemVersion", "${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})")
          putString("deviceModel", "${Build.MANUFACTURER} ${Build.MODEL}")
          putString("appVersion", appVersion)
          putBoolean("lowPowerModeEnabled", lowPowerMode)
          putString("performanceTier", performanceTier)
          putString("diagnosticsSource", "native-module")
        }

      promise.resolve(payload)
    } catch (error: Exception) {
      promise.reject("RUNTIME_PROFILE_ERROR", error.message, error)
    }
  }
}
