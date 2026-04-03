package com.reactnativecodex.advancednative

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.util.TypedValue
import android.view.Gravity
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.TextView

class OperationsStatusSurfaceView(context: Context) : FrameLayout(context) {

  private val titleView = TextView(context)
  private val badgeView = TextView(context)
  private val subtitleView = TextView(context)
  private val progressView = ProgressBar(
    context,
    null,
    android.R.attr.progressBarStyleHorizontal,
  )
  private val metaView = TextView(context)

  init {
    setPadding(dp(18), dp(18), dp(18), dp(18))
    setBackgroundColor(Color.parseColor("#0F172A"))

    val root = LinearLayout(context).apply {
      orientation = LinearLayout.VERTICAL
      layoutParams =
        LayoutParams(
          LayoutParams.MATCH_PARENT,
          LayoutParams.WRAP_CONTENT,
        )
    }

    val headerRow = LinearLayout(context).apply {
      orientation = LinearLayout.HORIZONTAL
      gravity = Gravity.CENTER_VERTICAL
      layoutParams =
        LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          LinearLayout.LayoutParams.WRAP_CONTENT,
        )
    }

    titleView.apply {
      setTextColor(Color.parseColor("#F8FAFC"))
      setTextSize(TypedValue.COMPLEX_UNIT_SP, 18f)
      typeface = Typeface.DEFAULT_BOLD
      layoutParams =
        LinearLayout.LayoutParams(
          0,
          LinearLayout.LayoutParams.WRAP_CONTENT,
          1f,
        )
    }

    badgeView.apply {
      setPadding(dp(10), dp(6), dp(10), dp(6))
      setTextColor(Color.parseColor("#EFF6FF"))
      setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
      typeface = Typeface.DEFAULT_BOLD
    }

    subtitleView.apply {
      setTextColor(Color.parseColor("#CBD5E1"))
      setTextSize(TypedValue.COMPLEX_UNIT_SP, 14f)
      setLineSpacing(dp(4).toFloat(), 1f)
    }

    progressView.apply {
      max = 100
      progressDrawable?.setTint(Color.parseColor("#22C55E"))
      progressBackgroundTintList = android.content.res.ColorStateList.valueOf(
        Color.parseColor("#1E293B"),
      )
      layoutParams =
        LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          dp(10),
        )
    }

    metaView.apply {
      setTextColor(Color.parseColor("#94A3B8"))
      setTextSize(TypedValue.COMPLEX_UNIT_SP, 12f)
      typeface = Typeface.DEFAULT_BOLD
    }

    headerRow.addView(titleView)
    headerRow.addView(badgeView)

    root.addView(headerRow)
    root.addView(spacer())
    root.addView(subtitleView)
    root.addView(spacer(12))
    root.addView(progressView)
    root.addView(spacer())
    root.addView(metaView)

    addView(root)
  }

  fun setTitle(value: String?) {
    titleView.text = value.orEmpty()
  }

  fun setSubtitle(value: String?) {
    subtitleView.text = value.orEmpty()
  }

  fun setProgressValue(value: Int) {
    progressView.progress = value.coerceIn(0, 100)
  }

  fun setAttentionCount(value: Int) {
    metaView.text = "Attention items: $value"
  }

  fun setStatusTone(value: String?) {
    val tone = value ?: "nominal"
    badgeView.text = tone.replaceFirstChar { character -> character.uppercase() }

    val tint =
      when (tone) {
        "critical" -> "#DC2626"
        "warning" -> "#D97706"
        "maintenance" -> "#7C3AED"
        else -> "#1D4ED8"
      }

    badgeView.setBackgroundColor(Color.parseColor(tint))
  }

  private fun spacer(heightDp: Int = 10): TextView {
    return TextView(context).apply {
      layoutParams =
        LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          dp(heightDp),
        )
    }
  }

  private fun dp(value: Int): Int {
    return TypedValue.applyDimension(
      TypedValue.COMPLEX_UNIT_DIP,
      value.toFloat(),
      resources.displayMetrics,
    ).toInt()
  }
}
