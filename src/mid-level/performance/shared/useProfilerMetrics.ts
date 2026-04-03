import { useCallback, useMemo, useState, type ProfilerOnRenderCallback } from 'react'

interface ProfilerSample {
  actualDuration: number
  baseDuration: number
  commitTime: number
  id: string
  phase: 'mount' | 'nested-update' | 'update'
}

interface ProfilerSummary {
  averageActualDuration: number
  averageBaseDuration: number
  sampleCount: number
}

function roundMetric(value: number): number {
  return Math.round(value * 100) / 100
}

export function useProfilerMetrics(maxSamples = 8): {
  onRender: ProfilerOnRenderCallback
  recentSamples: ProfilerSample[]
  summary: ProfilerSummary
} {
  const [recentSamples, setRecentSamples] = useState<ProfilerSample[]>([])

  const onRender = useCallback<ProfilerOnRenderCallback>(
    (
      id: string,
      phase,
      actualDuration: number,
      baseDuration: number,
      _startTime: number,
      commitTime: number,
    ) => {
      setRecentSamples(current => [
        {
          actualDuration: roundMetric(actualDuration),
          baseDuration: roundMetric(baseDuration),
          commitTime: roundMetric(commitTime),
          id,
          phase,
        },
        ...current,
      ].slice(0, maxSamples))
    },
    [maxSamples],
  )

  const summary = useMemo<ProfilerSummary>(() => {
    if (recentSamples.length === 0) {
      return {
        averageActualDuration: 0,
        averageBaseDuration: 0,
        sampleCount: 0,
      }
    }

    const totalActualDuration = recentSamples.reduce(
      (sum, sample) => sum + sample.actualDuration,
      0,
    )
    const totalBaseDuration = recentSamples.reduce(
      (sum, sample) => sum + sample.baseDuration,
      0,
    )

    return {
      averageActualDuration: roundMetric(
        totalActualDuration / recentSamples.length,
      ),
      averageBaseDuration: roundMetric(totalBaseDuration / recentSamples.length),
      sampleCount: recentSamples.length,
    }
  }, [recentSamples])

  return {
    onRender,
    recentSamples,
    summary,
  }
}
