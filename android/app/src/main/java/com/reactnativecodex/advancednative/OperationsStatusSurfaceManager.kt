package com.reactnativecodex.advancednative

import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = OperationsStatusSurfaceManager.NAME)
class OperationsStatusSurfaceManager :
  SimpleViewManager<OperationsStatusSurfaceView>() {

  override fun createViewInstance(reactContext: ThemedReactContext): OperationsStatusSurfaceView {
    return OperationsStatusSurfaceView(reactContext)
  }

  override fun getName(): String = NAME

  @ReactProp(name = "title")
  fun setTitle(view: OperationsStatusSurfaceView, value: String?) {
    view.setTitle(value)
  }

  @ReactProp(name = "subtitle")
  fun setSubtitle(view: OperationsStatusSurfaceView, value: String?) {
    view.setSubtitle(value)
  }

  @ReactProp(name = "statusTone")
  fun setStatusTone(view: OperationsStatusSurfaceView, value: String?) {
    view.setStatusTone(value)
  }

  @ReactProp(name = "progressValue", defaultInt = 0)
  fun setProgressValue(view: OperationsStatusSurfaceView, value: Int) {
    view.setProgressValue(value)
  }

  @ReactProp(name = "attentionCount", defaultInt = 0)
  fun setAttentionCount(view: OperationsStatusSurfaceView, value: Int) {
    view.setAttentionCount(value)
  }

  companion object {
    const val NAME = "OperationsStatusSurfaceViewManager"
  }
}
